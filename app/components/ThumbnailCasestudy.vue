<script setup lang="ts">
interface CaseStudy {
  path: string
  title: string
  subcategories?: string[]
  excerpt?: string
  description?: string
}

defineProps<{
  caseStudy: CaseStudy
}>()

const getActiveSubcategories = (cs: any) => {
  if (!cs) return []
  return Array.isArray(cs.subcategories) ? cs.subcategories : []
}
</script>

<template>
  <div class="case-study-row border-b border-black py-6 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4 items-start transition-opacity duration-300">
    <!-- Column 1 & 2: Title and Subcategories wrapped in flex-col -->
    <div class="col-span-1 md:col-span-3 flex flex-col gap-2 pl-1">
      <NuxtLink 
        :to="caseStudy.path"
        class="title-link text-xl font-medium text-black leading-snug pl-0 hover:pl-1 transition-all duration-300"
      >
        {{ caseStudy.title }}
      </NuxtLink>

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
    <p class="col-span-1 md:col-span-3 text-sm text-gray-700">
      {{ caseStudy.excerpt || caseStudy.description }}
    </p>
  </div>
</template>
