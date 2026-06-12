<template>
  <a href="https://www.figma.com/deck/8LXMGbShPpvOWI7us1iUIu" target="_blank" class="bg-black rounded-lg text-white py-2 px-3 w-fit flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity duration-200">
    <div>
      Portfolio<br/><span class="text-[12px] opacity-70">Deck</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-arrow">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  </a>
</template>

<style scoped>
@keyframes moveRight {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

.animate-arrow {
  animation: moveRight 1.5s ease-in-out infinite;
}
</style>
