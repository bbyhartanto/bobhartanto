<script setup lang="ts">
// Fetch all case studies
const { data: caseStudies } = await useAsyncData('all-casestudies', () => {
  return queryCollection('casestudies').all()
})

useSeoMeta({
  title: 'Works - Bobby Hartanto',
  description: 'A complete collection of case studies, design challenges, and product strategies.'
})
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F3] text-[#1A1A1A] font-sans pb-24">
    <HeaderChild label="Works" max-width="w-full" bg-class="bg-[#F1F1F3]/80" />

    <!-- Main Grid Layout -->
    <div class="w-full px-5 pt-16 md:pt-24 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-[15px]">
        <!-- Column 3 to 4 on desktop (col-start-3 span-2) -->
        <div class="col-span-1 md:col-start-3 md:col-span-2 flex flex-col gap-8">
          <!-- Title & Description -->
          <div class="flex flex-col gap-4 mb-6">
            <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Archive</span>
            <h1 class="text-4xl md:text-5xl font-medium text-black tracking-tight leading-none">
              All Works
            </h1>
            <p class="text-base text-gray-700 leading-relaxed font-light mt-2">
              A comprehensive showcase of design systems, user experience strategy, products, and interactive directions.
            </p>
          </div>

          <!-- Case Studies List -->
          <div class="case-studies-list flex flex-col border-t border-black/10">
            <template v-if="caseStudies && caseStudies.length > 0">
              <ThumbnailPortrait
                v-for="caseStudy in caseStudies"
                :key="caseStudy.path"
                :case-study="caseStudy"
                class="border-b border-black/10"
              />
            </template>
            <template v-else>
              <div class="py-16 text-left">
                <p class="text-gray-500 font-mono">No case studies found.</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
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
