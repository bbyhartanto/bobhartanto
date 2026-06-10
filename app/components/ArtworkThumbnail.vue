<template>
  <div class="flex flex-col">
    <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
      <img :src="image" class="w-full h-full object-cover pointer-events-none select-none" />
    </div>
    <p class="mt-4 text-[10px] scale-[0.6] origin-top-left tracking-wide inline-block">
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
