<script setup lang="ts">
// Fetch categories
const { data: categoriesDoc } = await useAsyncData('categories', () => {
  return queryCollection('categories').first()
})

const categoriesList = computed(() => {
  return categoriesDoc.value?.items || []
})

// Future-proof matching: match "Design" or fallback to "Visual Direction"
const category = computed(() => {
  return categoriesList.value.find(c => c.name === 'Design' || c.name === 'Visual Direction')
})

const selectedQuotes = useState<Record<string, string>>('random-quotes')

// Fetch case studies
const { data: caseStudies } = await useAsyncData('casestudies', () => {
  return queryCollection('casestudies').all()
})

const getCaseStudiesForCategory = (categoryName: string) => {
  if (!caseStudies.value) return []
  const norm = (str: string) => {
    if (!str) return ''
    return str.toLowerCase()
      .replace(/problems/g, 'problem')
      .replace(/s\b/g, '')
      .replace(/[^a-z0-9]/g, '')
  }
  return caseStudies.value.filter(cs => norm(cs.category) === norm(categoryName))
}

const getActiveSubcategories = (cs: any) => {
  if (!cs) return []
  return Array.isArray(cs.subcategories) ? cs.subcategories : []
}

const getSubcategoryCount = (categoryName: string, tag: string) => {
  const studies = getCaseStudiesForCategory(categoryName)
  const normalizedTag = tag.toLowerCase().trim()
  return studies.filter(cs =>
    getActiveSubcategories(cs).some(s => s.toLowerCase().trim() === normalizedTag)
  ).length
}

const slugify = (str: string) => {
  if (!str) return ''
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
</script>

<template>
  <!-- Category Section 2: Visual Direction / Design -->
  <section 
    v-if="category"
    class=" bg-black/70 grid grid-cols-1 md:grid-cols-6 gap-x-[30px] gap-y-[40px] items-start relative"
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
          <h2 class="text-3xl md:text-[28px] pl-4 font-normal leading-[1.15] tracking-tight text-black">
            {{ selectedQuotes[category.name] }}
          </h2>
        </div>
        
        <!-- Bottom-Left Gray Box -->
        <div class="col-span-1 bg-box-grey h-[120px] w-full hidden md:block mt-4 rounded-sm"></div>
        
        <!-- Bottom-Middle Gray Box -->
        <div class="col-span-1 bg-box-grey h-[280px] w-full hidden md:block mt-4 rounded-sm"></div>
      </div>
    </div>

    <!-- Center Content -->
     <div class="ml-8 md:ml-0 col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-[30px] bg-white p-8">
      <!-- Content -->
      <div class="col-span-1 md:col-span-3 flex flex-col gap-16 md:gap-24">
        <div class="flex flex-col">
          <!-- Number & Category Title-->
           <div class="flex gap-12">
            <span class="-ml-23 text-4xl font-normal text-gray-500 mb-2 block font-mono">02</span>
            <!-- Category Title -->
            <h3 class="text-2xl md:text-[34px] font-medium leading-[1.2] tracking-tight text-black mb-6">
              <NuxtLink :to="'/categories/' + slugify(category.name)" class="hover:underline hover:opacity-85 transition-all">
                {{ category.name }}
              </NuxtLink>
            </h3>
           </div>
          
          <!-- Categories Tags-->
          <div class="flex flex-wrap gap-2.5 mb-8">
            <!-- Dynamic count pill — auto-updates when you add content in Nuxt Studio -->
            <NuxtLink 
              :to="'/categories/' + slugify(category.name)" 
              class="px-4 py-1.5 border border-black rounded-full text-xs font-mono text-black tracking-tight bg-white hover:bg-black hover:text-white transition-colors duration-200"
            >
              {{ getCaseStudiesForCategory(category.name).length }} Case {{ getCaseStudiesForCategory(category.name).length === 1 ? 'Study' : 'Studies' }}
            </NuxtLink>
            <span 
              v-for="tag in category.subcategories" 
              :key="tag" 
              class="px-4 py-1.5 border border-black/45 rounded-full text-xs font-light text-gray-800 tracking-tight bg-white"
            >
              {{ tag }}
              <span v-if="getSubcategoryCount(category.name, tag) > 0" class="ml-1 font-mono text-black/50">({{ getSubcategoryCount(category.name, tag) }})</span>
            </span>
          </div>

          <div class="case-studies-list flex flex-col border-t border-black">
            <ThumbnailCasestudy
              v-for="caseStudy in getCaseStudiesForCategory(category.name).slice(0, 4)" 
              :key="caseStudy.path"
              :case-study="caseStudy"
            />
          </div>

          <!-- View All Button -->
          <div v-if="getCaseStudiesForCategory(category.name).length > 4" class="mt-8 flex justify-start">
            <NuxtLink 
              :to="'/categories/' + slugify(category.name)" 
              class="inline-flex items-center gap-2.5 px-6 py-2.5 border border-black rounded-full text-xs font-mono text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              View all {{ getCaseStudiesForCategory(category.name).length }} case studies
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Top-Right Gray Box -->
      <div class="col-span-1 md:col-span-1 hidden md:block">
        <div class="bg-box-grey h-[180px] w-full rounded-sm"></div>
      </div>
    </div>
  </section>
</template>
