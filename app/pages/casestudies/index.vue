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
    <HeaderChild title="Case Studies" />

    <!-- Main Grid Layout -->
    <div class="w-full px-5 pt-16 md:pt-24 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-[15px]">
        <!-- Column 3 to 8 on desktop (starts at column 3, spans 6) -->
        <div class="col-span-1 md:col-span-4 lg:col-start-3 lg:col-span-6 flex flex-col gap-8">
          <!-- Title & Description -->
          <div class="flex flex-col gap-4 mb-6">
            <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Archive</span>
            <h1 class="text-4xl md:text-5xl font-medium text-black tracking-tight leading-none">
              All Case studies
            </h1>
            <p class="text-base text-gray-700 leading-relaxed font-light mt-2">
              A comprehensive showcase of design systems, user experience strategy, products, and interactive directions.
            </p>
          </div>

          <!-- Case Studies List -->
          <div class="case-studies-list grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-black/10 pt-6">
            <template v-if="caseStudies && caseStudies.length > 0">
              <ThumbnailPortrait
                v-for="caseStudy in caseStudies"
                :key="caseStudy.path"
                :case-study="caseStudy"
              />
            </template>
            <template v-else>
              <div class="col-span-2 md:col-span-4 py-16 text-left">
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
