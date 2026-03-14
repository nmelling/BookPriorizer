<script setup lang="ts">
// Your script logic here
</script>

<template>
  <div class="Layout">
    <UHeader>HEADER LAYOUT</UHeader>
    <UMain>
      <aside>
        SIDE BAR
      </aside>
      <section class="content">
        <slot />
      </section>
    </UMain>
    <UFooter>FOOTER LAYOUT</UFooter>
  </div>
</template>

<style>

</style>
