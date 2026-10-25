<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    caption?: string
    layout?: 'standard' | 'wide' | 'full'
  }>(),
  {
    layout: 'standard'
  }
)

const gallery = useArticleGallery()
const imgContainer = ref<HTMLElement | null>(null)
const isRevealed = ref(false)
let observer: IntersectionObserver | null = null

const uniqueId = `portfolio-img-${Math.random().toString(36).substring(2, 9)}`

onMounted(() => {
  if (props.src) {
    gallery.registerImage({
      id: uniqueId,
      src: props.src,
      alt: props.alt || props.caption,
      caption: props.caption || props.alt
    })
  }

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
    class="portfolio-image-wrapper my-10 group cursor-zoom-in"
    :class="[
      `layout-${layout}`,
      { 'is-revealed': isRevealed }
    ]"
    @click="handleImageClick"
  >
    <div class="relative overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-black/20">
      <img
        :src="props.src"
        :alt="props.alt || props.caption || 'Portfolio image'"
        loading="lazy"
        class="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
      />
      <!-- Focus Badge -->
      <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-sm shadow-md">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
        <span>Focus view</span>
      </div>
    </div>

    <figcaption v-if="props.caption || props.alt" class="mt-3 text-xs text-gray-500 font-mono tracking-wide text-left pl-1">
      {{ props.caption || props.alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
.portfolio-image-wrapper {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.portfolio-image-wrapper.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.layout-standard {
  width: 100%;
}

.layout-wide {
  width: 100%;
}

@media (min-width: 1024px) {
  .layout-wide {
    width: 115%;
    margin-left: -7.5%;
  }

  .layout-full {
    width: 130%;
    margin-left: -15%;
  }
}
</style>
