<template>
  <HeaderParent :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading, 'transition-opacity duration-1000': true }" />
  <div class="w-full relative overflow-hidden">
    <!-- Top Grid Section -->
     <div class="flex flex-col md:grid md:grid-cols-6 gap-2 my-8 px-4 pointer-events-none relative z-10 h-[70vh]">
      <div class="col-span-2 col-start-3 flex items-center justify-center h-full w-full">
        <img src="/images-/bobby.svg" alt="bublibu image" class="animate-intro w-[60%] md:w-[90%] h-auto py-4" /> 
      </div>  
      
     </div>
    <div :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading, 'transition-opacity duration-1000': true }" class="flex flex-col md:grid md:grid-cols-6 gap-2 my-8 px-4 pointer-events-none relative z-10">
      <!-- Column 1 -->
       
            <div class="col-span-2 md:col-span-3 md:col-start-3">
                <div class="flex flex-col gap-4 my-4 ">
                  <h2 class=" text-2xl md:text-4xl leading-[1.15]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
                  </h2>
                  <p class="">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.
                  </p>
                </div>
                <div class="mt-6 pointer-events-auto border-y border-black/10">
                  <button @click="isAccordionOpen = !isAccordionOpen" class="w-full flex justify-between items-center py-4 text-left hover:opacity-70 transition-opacity">
                    <span class="font-medium text-lg">What services do you offer?</span>
                    <span class="text-2xl font-light">{{ isAccordionOpen ? '−' : '+' }}</span>
                  </button>
                  <div v-show="isAccordionOpen" class="pb-4 text-black/70">
                    I do design product for mobile and desktop app and website
                  </div>
                </div>
            </div> 
    </div>

    <!-- profile section -->

    


  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isAccordionOpen = ref(false)
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500) // 1.5s loading delay
})

const { data: categoriesDoc } = await useAsyncData('categories', () => {
  return queryCollection('categories').first()
})

const categoriesList = computed(() => {
  return categoriesDoc.value?.items || []
})

const selectedQuotes = useState('random-quotes', () => {
  const quotesMap = {}
  categoriesList.value.forEach(category => {
    if (category.Quotes && category.Quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * category.Quotes.length)
      quotesMap[category.name] = category.Quotes[randomIndex]
    } else {
      quotesMap[category.name] = "Thing’s that i do with passion in my daily basis"
    }
  })
  return quotesMap
})


useSeoMeta({
  title: 'Bobby Hartanto - UI/UX Designer Blog',
  ogTitle: 'Bobby Hartanto - UI/UX Designer Blog',
  description: 'Product & Design Lead with over 11+ years of experience, Ex Moka POS, EX IBM',
  ogDescription: 'Product & Design Lead with over 11+ years of experience, Ex Moka POS, EX IBM',
  ogImage: 'https://bobhartanto.com/og-image.jpg',
  ogUrl: 'https://bobhartanto.com/'
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DotGothic16&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
    }
  ]
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-intro {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes reveal {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-reveal {
  opacity: 0;
}

.animate-reveal.in-view {
  animation: reveal 0.8s ease-out 0.5s both;
}
</style>
