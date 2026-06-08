<template>
<<<<<<< Updated upstream
  <HeaderParent />
  <div class="w-full ">

    <section class="grid grid-cols-1 md:grid-cols-6 gap-[15px] my-8 px-8">
=======
  <div class="w-full relative overflow-hidden">
    <div
      ref="draggableDiv"
      class="absolute z-0 cursor-grab active:cursor-grabbing flex flex-col gap-[80px] md:gap-[120px] w-max p-8"
      :style="{ 
        left: position.x + 'px', 
        top: position.y + 'px', 
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <!-- Loop through grouped rows -->
      <div v-for="(row, rowIdx) in groupedRows" :key="rowIdx" class="flex justify-center gap-[80px] md:gap-[80px]">
        
        <!-- Left Group -->
        <div class="flex gap-[70px] md:gap-[80px]">
          <ArtworkThumbnail v-for="(img, idx) in row.leftGroup" :key="'l'+idx" :image="img" class="w-[100px] shrink-0" />
        </div>
        
        <!-- Center Gap -->
        <div :class="row.type === 'six' ? 'w-[640px] shrink-0' : 'w-[810px] md:w-[820px] shrink-0'"></div> 
        
        <!-- Right Group -->
        <div class="flex gap-[70px] md:gap-[80px]">
          <ArtworkThumbnail v-for="(img, idx) in row.rightGroup" :key="'r'+idx" :image="img" class="w-[100px] shrink-0" />
        </div>

      </div>
    </div>

    <!-- Top Grid Section -->
    <div 
      class="grid grid-cols-2 md:grid-cols-6 gap-[15px] my-8 px-8 pointer-events-none relative z-10"
      :style="{ 
        transform: `translate(${-parallax.x}px, ${-parallax.y}px)`,
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      }"
    >
>>>>>>> Stashed changes
      <!-- Column 1 -->
            <div class="col-span-1 md:col-span-2">
              <img src="/images-/bobby.svg" alt="bublibu image" class="md:w-[80%] h-auto py-5" />
            </div>
            
            <div class="col-span-1 md:col-span-2 md:col-start-3">
              <img src="/images-/bobby-hartanto.png" alt="Bobby Hartanto Portrait" class="w-[30%] h-auto pt-4"/>
              
            </div> 
          </div>

<<<<<<< Updated upstream
    <section class="grid grid-cols-2 md:grid-cols-6 gap-[15px] px-4 my-8">
      <div class="col-span-2 md:col-span-1 flex-col md:col-start-3 md:col-span-2 flex">
        <h2 class=" text-2xl md:text-4xl leading-[1.15] my-16 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
=======
    <div class="grid grid-cols-2 md:grid-cols-6 gap-[15px] my-8 pointer-events-none relative z-10">
      <div class="col-span-2 flex-col md:col-start-3 md:col-span-4 lg:col-start-3 lg:col-span-2 flex p-9">
        <h2 class=" text-2xl md:text-4xl leading-[1.15] my-8 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
>>>>>>> Stashed changes
              </h2>
        <p class="my-[16px]">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.
          </p>
      </div>
    </div>
    <!-- Category Section 1: Problem to Product -->
    <SectionProblemToProduct />

    <!-- Category Section 2: Visual Direction / Design -->
    <SectionDesign />


  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
// Force HMR reload for new artwork images

const artworkGlob = import.meta.glob('../../content/artwork/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })
const artworkImages = Object.values(artworkGlob)
// Duplicate the array several times to create a large gallery that stacks downward
const repeatedImages = Array(8).fill(artworkImages).flat()

const groupedRows = computed(() => {
  const rows = []
  let index = 0
  let isSixColumnRow = true

  while (index < repeatedImages.length) {
    const itemsNeeded = isSixColumnRow ? 4 : 2
    const half = itemsNeeded / 2
    
    const leftGroup = repeatedImages.slice(index, index + half)
    const rightGroup = repeatedImages.slice(index + half, index + itemsNeeded)
    
    if (leftGroup.length > 0) {
      rows.push({
        type: isSixColumnRow ? 'six' : 'four',
        leftGroup,
        rightGroup
      })
    }
    
    index += itemsNeeded
    isSixColumnRow = !isSixColumnRow
  }
  
  return rows
})

const draggableDiv = ref(null)
const position = ref({ x: 50, y: 50 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const parallax = ref({ x: 0, y: 0 })
const parallaxFactor = -0.015 // smaller distance

const onGlobalMouseMove = (event) => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  parallax.value = {
    x: (event.clientX - centerX) * parallaxFactor,
    y: (event.clientY - centerY) * parallaxFactor
  }
}

const enableDrag = false // Paused drag functionality as requested

const startDrag = (event) => {
  if (!enableDrag) return
  isDragging.value = true
  const clientX = event.clientX || (event.touches && event.touches[0].clientX)
  const clientY = event.clientY || (event.touches && event.touches[0].clientY)
  if (clientX !== undefined && clientY !== undefined) {
    dragOffset.value = {
      x: clientX - position.value.x,
      y: clientY - position.value.y
    }
  }
}

const onDrag = (event) => {
  if (!isDragging.value) return
  const clientX = event.clientX || (event.touches && event.touches[0].clientX)
  const clientY = event.clientY || (event.touches && event.touches[0].clientY)
  if (clientX !== undefined && clientY !== undefined) {
    let newX = clientX - dragOffset.value.x
    let newY = clientY - dragOffset.value.y

    if (draggableDiv.value && draggableDiv.value.parentElement) {
      const parent = draggableDiv.value.parentElement
      const rect = draggableDiv.value.getBoundingClientRect()
      
      const minX = Math.min(0, parent.clientWidth - rect.width)
      const maxX = 0
      
      const minY = Math.min(0, parent.clientHeight - rect.height)
      const maxY = 0

      newX = Math.max(minX, Math.min(maxX, newX))
      newY = Math.max(minY, Math.min(maxY, newY))
    }

    position.value = {
      x: newX,
      y: newY
    }
  }
}

const stopDrag = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onGlobalMouseMove)
  window.addEventListener('mousemove', onDrag, { passive: false })
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onGlobalMouseMove)
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
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
