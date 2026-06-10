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

const getTruncatedExcerpt = (text?: string) => {
  if (!text) return ''
  if (text.length <= 200) return text
  return text.substring(0, 200).trim() + '...'
}

const getActiveSubcategories = (cs: any) => {
  if (!cs) return []
  return Array.isArray(cs.subcategories) ? cs.subcategories : []
}
</script>

<template>
  <div class="case-study-row flex flex-col gap-5 py-6 transition-opacity duration-300">
    <!-- Title -->
    <div class="pl-1">
      <NuxtLink 
        :to="caseStudy.path"
        class="title-link text-xl font-medium text-black leading-tight pl-0 hover:pl-1 transition-all duration-300 block"
      >
        {{ caseStudy.title }}
      </NuxtLink>
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-500 pr-4">
      {{ getTruncatedExcerpt(caseStudy.excerpt || caseStudy.description) }}
    </p>

    <!-- Subcategories Tags -->
    <div class="flex flex-wrap gap-2 mt-1">
      <span 
        v-for="sub in getActiveSubcategories(caseStudy)" 
        :key="sub"
        class="text-[13px] text-gray-500 font-light px-3.5 py-1 border border-gray-400 rounded-full w-fit bg-white/30"
      >
        {{ sub }}
      </span>
    </div>
  </div>
</template>
