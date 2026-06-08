<template>
  <div class="flex flex-col">
    <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
      <img :src="image" class="w-full h-full object-cover pointer-events-none select-none" />
    </div>
    <p class="mt-4 text-[10px] font-medium tracking-wide">
      Fig.02 Experience display
    </p>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>
