import arkenv, { type } from "arkenv";

export const env = arkenv({
  PORT: type("number"),
});
