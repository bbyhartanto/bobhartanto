<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    maxWidthClass?: string
  }>(),
  {
    title: 'Category Archive',
    maxWidthClass: 'max-w-6xl'
  }
)
</script>

<template>
  <!-- Top Nav / Back Button -->
  <div class="w-full bg-[#fafafa] border-b border-black/10">
    <div :class="[maxWidthClass, 'mx-auto px-6 py-5 flex justify-between items-center']">
      <NuxtLink to="/" class="group flex items-center gap-2 text-sm font-medium text-black/75 hover:text-black transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </NuxtLink>
      <span class="text-xs uppercase tracking-wider font-mono text-black/45">{{ title }}</span>
    </div>
  </div>
</template>
