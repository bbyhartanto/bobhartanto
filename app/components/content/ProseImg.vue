<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const gallery = useArticleGallery()
const imgContainer = ref<HTMLElement | null>(null)
const isRevealed = ref(false)
let observer: IntersectionObserver | null = null

const uniqueId = `img-${Math.random().toString(36).substring(2, 9)}`

onMounted(() => {
  // Register image with the article gallery
  if (props.src) {
    gallery.registerImage({
      id: uniqueId,
      src: props.src,
      alt: props.alt,
      caption: props.alt
    })
  }

  // Scroll reveal animation matching homepage reveal
  if (imgContainer.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isRevealed.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
      }
    )
    observer.observe(imgContainer.value)
  } else {
    isRevealed.value = true
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (props.src) {
    gallery.unregisterImage(uniqueId)
  }
})

const handleImageClick = () => {
  if (props.src) {
    gallery.openModal(props.src)
  }
}
</script>

<template>
  <figure 
    ref="imgContainer"
    class="article-image-figure my-8 w-full group cursor-zoom-in"
    :class="{ 'is-revealed': isRevealed }"
    @click="handleImageClick"
  >
    <div class="relative overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] shadow-sm transition-all duration-300 hover:shadow-lg hover:border-black/20">
      <img
        :src="props.src"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
        loading="lazy"
        class="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
      />
      <!-- Subtle Focus Badge on Hover -->
      <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 text-white text-xs font-mono backdrop-blur-sm shadow-md">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
        <span>Focus view</span>
      </div>
    </div>

    <figcaption v-if="props.alt" class="mt-2.5 text-xs text-gray-500 font-mono tracking-wide text-left pl-1">
      {{ props.alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
.article-image-figure {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.article-image-figure.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
