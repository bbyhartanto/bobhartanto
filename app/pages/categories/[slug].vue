<script setup lang="ts">
const route = useRoute()

// Fetch the categories data
const { data: categoriesDoc } = await useAsyncData('categories', () => {
  return queryCollection('categories').first()
})

// Fetch all case studies
const { data: caseStudies } = await useAsyncData('casestudies', () => {
  return queryCollection('casestudies').all()
})

// Helper to slugify a category name to match route param
const slugify = (str: string) => {
  if (!str) return ''
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Active category computed based on the URL slug
const activeCategory = computed(() => {
  if (!categoriesDoc.value) return null
  const slug = route.params.slug as string
  return categoriesDoc.value.items.find(cat => slugify(cat.name) === slug) || null
})

// Throw 404 if category not found
if (!activeCategory.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

// Filter case studies belonging to the active category
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

const filteredCaseStudies = computed(() => {
  if (!activeCategory.value) return []
  return getCaseStudiesForCategory(activeCategory.value.name)
})

const getActiveSubcategories = (cs: any) => {
  if (!cs) return []
  return Array.isArray(cs.subcategories) ? cs.subcategories : []
}

// Count how many case studies under this category have a given subcategory tag selected
const getSubcategoryCount = (tag: string) => {
  if (!activeCategory.value) return 0
  const normalizedTag = tag.toLowerCase().trim()
  return filteredCaseStudies.value.filter(cs =>
    getActiveSubcategories(cs).some(s => s.toLowerCase().trim() === normalizedTag)
  ).length
}

useSeoMeta({
  title: `${activeCategory.value?.name || 'Category'} Case Studies - Bobby Hartanto`,
  description: `Case studies and design work related to ${activeCategory.value?.name || 'the category'}.`
})
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-black selection:text-white pb-24">
    <HeaderChild />

    <!-- Main Content Container -->
    <main class="max-w-6xl mx-auto px-6 pt-16 md:pt-24 animate-fade-in">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-x-[40px] gap-y-[40px] items-start">
        
        <!-- Left Sidebar / Info (Spans 2 columns on desktop) -->
        <div class="lg:col-span-2 lg:sticky lg:top-28 flex flex-col gap-6">
          <span class="text-sm font-mono text-gray-500 uppercase tracking-widest">Collection</span>
          
          <h1 class="text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-black">
            {{ activeCategory?.name }}
          </h1>

          <p class="text-base text-gray-600 mt-2 leading-relaxed">
            A curated showcase of design challenges, solutions, and products categorized under <strong>{{ activeCategory?.name }}</strong>.
          </p>

          <!-- Category Tags Sidebar -->
          <div class="flex flex-col gap-4 mt-6 border-t border-black/10 pt-6">
            <span class="text-xs font-mono text-gray-400 uppercase">Tags in this category</span>
            <div class="flex flex-wrap gap-2">
              <span class="px-3.5 py-1.5 border border-black rounded-full text-xs font-mono bg-white text-black">
                Total: {{ filteredCaseStudies.length }}
              </span>
              <span 
                v-for="tag in activeCategory?.subcategories" 
                :key="tag" 
                class="px-3.5 py-1.5 border border-black/25 rounded-full text-xs font-light text-gray-700 bg-white"
              >
                {{ tag }}
                <span v-if="getSubcategoryCount(tag) > 0" class="ml-1 font-mono text-black/50">({{ getSubcategoryCount(tag) }})</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Right Side: Case Studies List (Spans 4 columns on desktop) -->
        <div class="lg:col-span-4 flex flex-col">
          <div class="border-t border-black">
            
            <template v-if="filteredCaseStudies.length > 0">
              <NuxtLink 
                v-for="caseStudy in filteredCaseStudies" 
                :key="caseStudy.path"
                :to="caseStudy.path"
                class="border-b border-black py-8 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4 items-start hover:opacity-75 transition-opacity duration-200"
              >
                <!-- Title & Subcategories -->
                <div class="col-span-1 md:col-span-3 flex flex-col gap-3">
                  <span class="text-2xl font-medium text-black leading-snug">
                    {{ caseStudy.title }}
                  </span>

                  <div class="flex flex-wrap gap-1.5">
                    <span 
                      v-for="sub in getActiveSubcategories(caseStudy)" 
                      :key="sub"
                      class="text-[10px] uppercase tracking-wider font-mono px-2.5 py-0.5 border border-black/15 rounded-full text-black/60 bg-white/30"
                    >
                      {{ sub }}
                    </span>
                  </div>
                </div>

                <!-- Description / Excerpt -->
                <p class="col-span-1 md:col-span-3 text-sm text-gray-700 leading-relaxed md:pt-1">
                  {{ caseStudy.excerpt || caseStudy.description }}
                </p>
              </NuxtLink>
            </template>
            
            <template v-else>
              <div class="py-16 text-center">
                <p class="text-gray-500 font-mono">No case studies found for this category yet.</p>
              </div>
            </template>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
