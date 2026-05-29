<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <!-- Header -->
  <div class="w-full sticky top-0 z-10 border-b border-black bg-[#F1F1F3]/80 backdrop-blur-md">
    <div class="p-5">
      <header class="flex justify-between items-center text-sm">
        <NuxtLink to="/" class="hover:underline font-medium leading-tight block text-left">
          Bobby<br>Hartanto
        </NuxtLink>
        <div class="flex bg-black py-3 px-5 rounded-full text-[#ffffff]">
          <p class="hidden md:block pr-5">Reach me out</p>
          <a href="mailto:work.bobbyhartanto@gmail.com" class="underline">work.bobbyhartanto@gmail.com</a>  
        </div>
      </header>
    </div>
  </div>

  <!-- Main Grid Section -->
  <div class="w-full px-5 pt-10 pb-[100px]">
    <section class="grid grid-cols-1 md:grid-cols-6 gap-[15px]">
      <!-- Column 3 to 4 (col-start-3 and span-2 for 6-column layout on desktop) -->
      <div class="col-span-1 md:col-start-3 md:col-span-2 flex flex-col">
        <ContentRenderer
          v-if="page"
          :value="page"
          class="prose prose-neutral max-w-none"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* High-end custom typography style overrides for markdown rendering */
:deep(h1) {
  font-size: 2.25rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: #000000;
}

:deep(h2) {
  font-size: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: #000000;
}

:deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

:deep(ul) {
  list-style-type: disc;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

:deep(ol) {
  list-style-type: decimal;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  font-weight: 300;
}

:deep(a) {
  color: #000000;
  text-decoration: underline;
  text-underline-offset: 4px;
}

:deep(a:hover) {
  color: #FF5A5A;
}
</style>
