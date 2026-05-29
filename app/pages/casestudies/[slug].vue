<script setup lang="ts">
const route = useRoute()

// Fetch the case study from the 'casestudies' collection by its path
const { data: caseStudy } = await useAsyncData('casestudy-' + route.params.slug, () => {
  return queryCollection('casestudies').path(route.path).first()
})

if (!caseStudy.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case Study not found', fatal: true })
}

// Compute active subcategories from checkboxes and backward compatibility
const activeSubcategories = computed(() => {
  if (!caseStudy.value) return []
  const list = []
  if (caseStudy.value.designThinking) list.push('Design Thinking')
  if (caseStudy.value.strategy) list.push('Strategy')
  if (caseStudy.value.uxResearch) list.push('UX Research')
  if (caseStudy.value.prototyping) list.push('Prototyping')
  
  // Backward compatibility support for old markdown files
  if (caseStudy.value.subcategory) {
    const sub = caseStudy.value.subcategory
    if (Array.isArray(sub)) {
      sub.forEach(s => { if (!list.includes(s)) list.push(s) })
    } else if (typeof sub === 'string' && !list.includes(sub)) {
      list.push(sub)
    }
  }
  return list
})

// Hybrid adaptive Table of Contents (TOC)
const customLinks = ref<{ id: string; text: string }[]>([])
const activeSection = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  // 1. Try to find actual H2 heading elements first
  let headingElements = Array.from(document.querySelectorAll('.prose h2'))
  
  // 2. If no H2 elements exist, look for bold-paragraphs acting as section titles
  const usingBoldParas = headingElements.length === 0
  if (usingBoldParas) {
    headingElements = Array.from(document.querySelectorAll('.prose p')).filter(p => {
      const child = p.firstElementChild
      return child && (child.tagName === 'STRONG' || child.tagName === 'B') && p.textContent?.trim() === child.textContent?.trim()
    })
  }

  // 3. Build a dynamic links map and assign anchor IDs to paragraphs
  const links = headingElements.map((el, idx) => {
    const text = el.textContent?.trim() || ''
    let id = el.getAttribute('id')
    if (!id) {
      id = text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `section-${idx}`
      el.setAttribute('id', id)
    }
    // Add scroll margin so scrolling doesn't push the title under the sticky header
    el.classList.add('scroll-mt-32')
    return { id, text }
  })

  customLinks.value = links

  // 4. Observe scroll positions to activate the corresponding navigation link
  observer = new IntersectionObserver((entries) => {
    const visible = entries.find(entry => entry.isIntersecting)
    if (visible) {
      activeSection.value = visible.target.id
    }
  }, {
    rootMargin: '-15% 0px -70% 0px',
    threshold: 0
  })

  headingElements.forEach(el => {
    const id = el.getAttribute('id')
    if (id) {
      observer?.observe(el)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-black selection:text-white pb-24">
    <HeaderChild title="Case Study" />

    <!-- Main Container -->
    <div class="px-6 pt-16 md:pt-8 animate-fade-in grid grid-cols-1 md:grid-cols-8 gap-x-[30px] gap-y-[40px]">
      <!-- Left Column: Table of Contents Sidebar -->
      <aside v-if="customLinks.length > 0" class="hidden md:block md:col-span-2 md:col-start-1 md:sticky md:top-28 flex flex-col h-[calc(100vh-200px)]">
        <div class="flex flex-col gap-6 h-full justify-center items-start">
          <nav class="flex flex-col gap-4 items-start">
            <a 
              v-for="link in customLinks" 
              :key="link.id" 
              :href="`#${link.id}`"
              class="group flex items-start gap-3 text-sm transition-all duration-300 relative py-1"
              :class="activeSection === link.id ? 'text-black font-semibold' : 'text-black/45 hover:text-black'"
            >
              <!-- Content Navigation -->
              <span 
                class="h-[1.5px] bg-black transition-all duration-300 mt-[9px] shrink-0"
                :class="activeSection === link.id ? 'w-6' : 'w-0 group-hover:w-3'"
              ></span>
              <span class="whitespace-normal break-words">{{ link.text }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Right Column: Case Study content -->
      <div class="col-span-1 md:col-span-4 md:col-start-3">
        <header class="flex flex-col gap-4 mb-8">
          <!-- Huge Title -->
          <h1 class="text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight text-black font-sans mt-2">
            {{ caseStudy.title }}
          </h1>
          <!-- Category Badges -->
          <div class="flex flex-wrap gap-2.5 items-center">
            <span class="px-3.5 py-1 border border-black rounded-full text-xs font-medium tracking-tight uppercase bg-white">
              {{ caseStudy.category }}
            </span>
            <template v-if="activeSubcategories.length > 0">
              <span 
                v-for="sub in activeSubcategories" 
                :key="sub"
                class="px-3.5 py-1 border border-black/15 text-black/60 rounded-full text-xs font-normal tracking-tight uppercase bg-white/50"
              >
                {{ sub }}
              </span>
            </template>
          </div>

          <!-- Description -->
          <p class="text-xl md:text-2xl  text-black/75 leading-relaxed max-w-3xl">
            {{ caseStudy.description }}
          </p>

          <!-- Dynamic Metadata Row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 my-4 border-y border-black/10 text-sm">
            <div v-if="caseStudy.role || 'Product Design Lead'">
              <span class="block text-black/45 font-mono text-xs uppercase mb-1">Role</span>
              <span class="font-medium text-black">{{ caseStudy.role || 'Product Design Lead' }}</span>
            </div>
            <div v-if="caseStudy.timeline || '2026'">
              <span class="block text-black/45 font-mono text-xs uppercase mb-1">Timeline</span>
              <span class="font-medium text-black">{{ caseStudy.timeline || '2026' }}</span>
            </div>
            <div v-if="caseStudy.platform || 'Web & Mobile'">
              <span class="block text-black/45 font-mono text-xs uppercase mb-1">Platform</span>
              <span class="font-medium text-black">{{ caseStudy.platform || 'Web & Mobile' }}</span>
            </div>
            <div v-if="caseStudy.focus || 'Strategy & Research'">
              <span class="block text-black/45 font-mono text-xs uppercase mb-1">Focus</span>
              <span class="font-medium text-black">{{ caseStudy.focus || 'Strategy & Research' }}</span>
            </div>
          </div>
        </header>

        <!-- Markdown Prose Content -->
        <article class="prose prose-neutral max-w-none text-black/85">
          <ContentRenderer :value="caseStudy" />
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* High-end custom typography style overrides for markdown rendering */
.prose :deep(h1) {
  font-size: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.25;
  color: #000000;
}

.prose :deep(h2) {
  font-size: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: #000000;
}

.prose :deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.prose :deep(ul) {
  list-style-type: disc;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose :deep(ol) {
  list-style-type: decimal;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  font-weight: 300;
}

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
