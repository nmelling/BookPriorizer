#!/usr/bin/env bun

import { access, copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { execa } from "execa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function loadEnv(file: string) {
  try {
    await access(file);
    config({ path: file, override: true });
  } catch {}
}

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function run(cmd: string, cwd: string) {
  const [bin, ...args] = cmd.split(" ");
  if (!bin) throw new Error("NO_BIN");
  await execa(bin, args, { cwd, stdio: "inherit" });
}

async function ensureDockerVolume(name: string) {
  try {
    await execa("docker", ["volume", "inspect", name]);
    console.log(`Volume ${name} already exists`);
  } catch {
    console.log(`Creating volume ${name}`);
    await execa("docker", ["volume", "create", name], { stdio: "inherit" });
  }
}

async function clean() {
  await rm(path.join(ROOT, "node_modules"), { recursive: true, force: true });
  await rm(path.join(ROOT, "front/node_modules"), {
    recursive: true,
    force: true,
  });
  await rm(path.join(ROOT, "back/node_modules"), {
    recursive: true,
    force: true,
  });
}

async function rootSetup() {
  await run("bun install", ROOT);

  const zedDir = path.join(ROOT, ".zed");
  const zedSettings = path.join(zedDir, "settings.json");

  if (!(await exists(zedDir))) {
    await mkdir(zedDir);
  }

  if (!(await exists(zedSettings))) {
    await copyFile(
      path.join(__dirname, "assets/zed/settings.json"),
      zedSettings
    );
  }
}

async function frontSetup() {
  const front = path.join(ROOT, "front");
  await run("bun install", front);
}

async function backSetup() {
  const back = path.join(ROOT, "back");
  await run("bun install", back);

  const env = path.join(back, ".env");
  if (!(await exists(env))) {
    await copyFile(path.join(back, ".env.example"), env);
  }

  await loadEnv(path.join(back, ".env"));
  if (!process.env.DOCKER_DB_VOLUME)
    throw new Error("NO DOCKER_DB_VOLUME DEFINED");
  await ensureDockerVolume(process.env.DOCKER_DB_VOLUME);
}

async function main() {
  await clean();
  await rootSetup();
  await frontSetup();
  await backSetup();

  // biome-ignore lint: for user CLI return
  console.log("Setup completed successfully.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
