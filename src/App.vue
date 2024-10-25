<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
   <div class="bg-gray-50 w-screen h-screen">
    <div class="bg-blue-500 text-white h-14 shadow flex justify-between p-4 w-full">
      <span class="font-bold">Petty Cash App</span>
      <div class="flex flex-row gap-2 items-center text-sm capitalize">
        <RouterLink to="/" class="hover:underline"> Home</RouterLink>
        <RouterLink to="/statement" class="hover:underline"> Statement</RouterLink>
      </div>
    </div>

    <div class="container mx-auto bg-white mt-5 rounded shadow">
    <RouterView />
   </div>
   </div>
</template>

<style scoped>

</style>
