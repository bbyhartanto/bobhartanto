<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const { isOpen, currentImage, currentIndex, images, next, prev, closeModal } = useArticleGallery()

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    closeModal()
  } else if (e.key === 'ArrowRight') {
    next()
  } else if (e.key === 'ArrowLeft') {
    prev()
  }
}

// Touch swipe navigation for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  if (e.changedTouches && e.changedTouches[0]) {
    touchStartX.value = e.changedTouches[0].clientX
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (e.changedTouches && e.changedTouches[0]) {
    touchEndX.value = e.changedTouches[0].clientX
    handleSwipeGesture()
  }
}

const handleSwipeGesture = () => {
  const diff = touchEndX.value - touchStartX.value
  const threshold = 45 // min swipe distance in px
  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      // Swiped left -> next
      next()
    } else {
      // Swiped right -> prev
      prev()
    }
  }
}

// Lock body scroll when open
watch(isOpen, (newVal) => {
  if (import.meta.client) {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div 
        v-if="isOpen && currentImage" 
        class="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-black/92 backdrop-blur-md p-4 sm:p-6 select-none overflow-hidden"
        @click.self="closeModal"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <!-- Top Control Bar -->
        <div class="w-full max-w-7xl flex items-center justify-between text-white/80 py-2 px-3 z-20">
          <div class="flex items-center gap-3">
            <span class="text-xs tracking-widest uppercase font-mono px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/90">
              {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}
            </span>
            <span class="hidden sm:inline-block text-xs font-mono text-white/40 tracking-wider">
              USE ← → ARROWS OR SWIPE
            </span>
          </div>

          <button 
            @click="closeModal"
            class="flex items-center gap-2 group px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-sm tracking-wide text-white focus:outline-none cursor-pointer"
            aria-label="Close image viewer"
          >
            <span class="text-xs font-mono text-white/60 group-hover:text-white transition-colors">ESC</span>
            <svg class="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Center Image Stage with Navigation Arrows -->
        <div class="relative w-full flex-1 flex items-center justify-center my-auto min-h-0">
          <!-- Previous Button -->
          <button 
            v-if="images.length > 1"
            @click.stop="prev"
            class="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-black/40 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all focus:outline-none cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Current Image -->
          <Transition name="image-swap" mode="out-in">
            <div :key="currentImage.src" class="relative max-h-full max-w-full flex flex-col items-center justify-center">
              <img 
                :src="currentImage.src" 
                :alt="currentImage.alt || 'Portfolio image'"
                class="max-h-[76vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl transition-transform duration-300"
                loading="eager"
              />
            </div>
          </Transition>

          <!-- Next Button -->
          <button 
            v-if="images.length > 1"
            @click.stop="next"
            class="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-black/40 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all focus:outline-none cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Bottom Caption Bar -->
        <div class="w-full max-w-4xl py-3 px-4 text-center z-20 min-h-[3.5rem] flex items-center justify-center">
          <p v-if="currentImage.caption || currentImage.alt" class="text-sm md:text-base text-white/80 font-sans tracking-wide leading-relaxed">
            {{ currentImage.caption || currentImage.alt }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.image-swap-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.image-swap-leave-active {
  transition: all 0.2s ease-in;
}

.image-swap-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.image-swap-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
