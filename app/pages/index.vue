<template>
  <div class="w-full sticky top-0 z-10 border-b-1 border-black">
    <div class="p-5">
    <header class="flex justify-between text-sm ">
      <span>Bobby<br>Hartanto</span>
      <div class="flex bg-black py-3 px-5 rounded-full text-[#ffffff]">
        <p class="hidden md:block pr-5">Reach me out</p>
        <a href="mailto:work.bobbyhartanto@gmail.com" class=" underline">work.bobbyhartanto@gmail.com</a>  
      </div>
    </header>
    </div>
  </div>
  <div class="w-full px-5 pt-10 pb-[100px]">

    <!-- <section class="mb-[50px]">
      <h1 class="text-[110px] font-medium tracking-tight m-0 leading-none">BOBBY HARTANTO</h1>
      <p class="text-[22px] m-0 font-light text-[#333]">A No fancy lead UI&UX Designer</p>
    </section> -->

    <!-- Top Grid Section -->
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[15px]">
      <!-- Column 1 -->
            <div class="col-span-2 flex-col md:col-span-1 md:col-start-2 lg:col-span-2 lg:col-start-3 flex">
              <img src="/images-/bobby.svg" alt="bublibu image" class="md:w-[40%] w-[60%] h-auto py-5" />
              <h2 class=" text-2xl md:text-4xl leading-[1.15] m-0 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
              </h2>
            </div>
            <div class="flex-1 flex items-center justify-center py-2 md:col-span-1 md:py-10">
      </div>
    </section>
    <section class="grid grid-cols-2 md:grid-cols-6 gap-[15px]">
      <div class="col-span-1 flex-col md:col-start-3 md:col-span-2 flex">
        <p class="mt-[15px]">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.
          </p>
      </div>
    </section>
    <!-- Beautiful Daily Passion / Case Studies Section (Looped per Category) -->
    <section 
      v-for="(category, index) in categoriesList" 
      :key="category.name"
      class="grid grid-cols-1 md:grid-cols-6 gap-x-[30px] gap-y-[40px] mt-24 items-start relative border-t border-black/10 pt-16"
    >
      <!-- Left Column (Sticky on Desktop) -->
      <div class="col-span-1 md:col-span-2 md:sticky md:top-28 flex flex-col gap-6">
        <div class="grid grid-cols-3 gap-[15px]">
          <!-- Top-Left Gray Box -->
          <div class="col-span-1 bg-box-grey h-[220px] w-full hidden md:block rounded-sm"></div>
          <!-- Empty column for layout spacing -->
          <div class="col-span-1 hidden md:block"></div>
          
          <!-- Heading Text -->
          <div class="col-span-2 mt-4 md:mt-6">
            <h2 class="text-3xl md:text-[38px] font-normal leading-[1.15] tracking-tight text-black">
              Thing’s that i do with passion in my daily basis
            </h2>
          </div>
          
          <!-- Bottom-Left Gray Box -->
          <div class="col-span-1 bg-box-grey h-[120px] w-full hidden md:block mt-4 rounded-sm"></div>
          
          <!-- Bottom-Middle Gray Box -->
          <div class="col-span-1 bg-box-grey h-[280px] w-full hidden md:block mt-4 rounded-sm"></div>
        </div>
      </div>

      <!-- Center Content) -->
      <div class="ml-16 md:ml-0 col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-[30px] bg-white p-8">
        <!-- Content -->
        <div class="col-span-1 md:col-span-3 flex flex-col gap-16 md:gap-24">
          <div class="flex flex-col">
            <!-- Number & Category Title-->
             <div class="flex gap-12">
              <span class="-ml-23 text-4xl font-light text-gray-500 mb-2 block font-mono">{{ formatIndex(index) }}</span>
              <!-- Category Title -->
              <h3 class="text-2xl md:text-[34px] font-light leading-[1.2] tracking-tight text-black mb-6">
                {{ category.name }}
              </h3>
             </div>
            
            <!-- Categories Tags-->
            <div class="flex flex-wrap gap-2.5 mb-8">
              <!-- Dynamic count pill — auto-updates when you add content in Nuxt Studio -->
              <span class="px-4 py-1.5 border border-black rounded-full text-xs font-mono text-black tracking-tight bg-white">
                {{ getCaseStudiesForCategory(category.name).length }} Case {{ getCaseStudiesForCategory(category.name).length === 1 ? 'Study' : 'Studies' }}
              </span>
              <span 
                v-for="tag in category.subcategories" 
                :key="tag" 
                class="px-4 py-1.5 border border-black/45 rounded-full text-xs font-light text-gray-800 tracking-tight bg-white"
              >
                {{ tag }}
                <span v-if="getSubcategoryCount(category.name, tag) > 0" class="ml-1 font-mono text-black/50">({{ getSubcategoryCount(category.name, tag) }})</span>
              </span>
            </div>

            <!-- Case Studies Sub-List -->
            <div class="flex flex-col border-t border-black">
              <NuxtLink 
                v-for="caseStudy in getCaseStudiesForCategory(category.name)" 
                :key="caseStudy.path"
                :to="caseStudy.path"
                class="border-b border-black py-6 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4 items-start hover:opacity-75 transition-opacity duration-200"
              >
                <!-- Column 1 & 2: Title and Subcategories wrapped in flex-col -->
                <div class="col-span-1 md:col-span-3 flex flex-col gap-2">
                  <span class="text-2xl font-medium text-black leading-snug">
                    {{ caseStudy.title }}
                  </span>

                  <div class="flex flex-wrap gap-1.5 lg:mr-40">
                    <span 
                      v-for="sub in getActiveSubcategories(caseStudy)" 
                      :key="sub"
                      class="text-[11px] uppercase tracking-wider font-mono px-2.5 py-0.5 border border-black/15 rounded-full text-black/60 w-fit bg-white/30"
                    >
                      {{ sub }}
                    </span>
                  </div>
                </div>

                <!-- Column 3: Description (Spans 3 columns on desktop) -->
                <p class="col-span-1 md:col-span-3 text-sm text-gray-700 leading-relaxed">
                  {{ caseStudy.excerpt || caseStudy.description }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Top-Right Gray Box (Spans Col 4 on Desktop, corresponding to Col 6 of parent section grid) -->
        <div class="col-span-1 md:col-span-1 hidden md:block">
          <div class="bg-box-grey h-[180px] w-full rounded-sm"></div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
const { data: categoriesDoc } = await useAsyncData('categories', () => {
  return queryCollection('categories').first()
})

const categoriesList = computed(() => {
  return categoriesDoc.value?.items || []
})

const formatIndex = (index) => String(index + 1).padStart(2, '0')

const { data: caseStudies } = await useAsyncData('casestudies', () => {
  return queryCollection('casestudies').all()
})

const getCaseStudiesForCategory = (categoryName) => {
  if (!caseStudies.value) return []
  const norm = (str) => {
    if (!str) return ''
    return str.toLowerCase()
      .replace(/problems/g, 'problem')
      .replace(/s\b/g, '')
      .replace(/[^a-z0-9]/g, '')
  }
  return caseStudies.value.filter(cs => norm(cs.category) === norm(categoryName))
}

const getActiveSubcategories = (cs) => {
  if (!cs) return []
  // subcategories is now an array of strings from the enum multi-select in Nuxt Studio
  return Array.isArray(cs.subcategories) ? cs.subcategories : []
}

// Count how many case studies under a category have a given subcategory tag selected
const getSubcategoryCount = (categoryName, tag) => {
  const studies = getCaseStudiesForCategory(categoryName)
  // Normalize both sides to handle any minor casing differences
  const normalizedTag = tag.toLowerCase().trim()
  return studies.filter(cs =>
    getActiveSubcategories(cs).some(s => s.toLowerCase().trim() === normalizedTag)
  ).length
}

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
