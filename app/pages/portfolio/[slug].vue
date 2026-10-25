<script setup lang="ts">
const route = useRoute()

// Fetch the portfolio item from the 'portfolio' collection by its path
const { data: portfolioItem } = await useAsyncData('portfolio-' + route.params.slug, () => {
  let q = queryCollection('portfolio').path(route.path)
  if (!import.meta.dev) {
    q = q.where('draft', '=', false)
  }
  return q.first()
})

if (!portfolioItem.value) {
  throw createError({ statusCode: 404, statusMessage: 'Portfolio item not found', fatal: true })
}

// Compute active subcategories
const activeSubcategories = computed(() => {
  if (!portfolioItem.value) return []
  return Array.isArray(portfolioItem.value.subcategories) ? portfolioItem.value.subcategories : []
})

// Dynamically load font families
useHead(() => {
  return {
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
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
      }
    ]
  }
})

// Hybrid adaptive Table of Contents (TOC)
const customLinks = ref<{ id: string; text: string }[]>([])
const activeSection = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  let headingElements = Array.from(document.querySelectorAll('.prose-portfolio h2'))
  
  const usingBoldParas = headingElements.length === 0
  if (usingBoldParas) {
    headingElements = Array.from(document.querySelectorAll('.prose-portfolio p')).filter(p => {
      const child = p.firstElementChild
      return child && (child.tagName === 'STRONG' || child.tagName === 'B') && p.textContent?.trim() === child.textContent?.trim()
    })
  }

  const links = headingElements.map((el, idx) => {
    const clone = el.cloneNode(true) as HTMLElement
    const cleanText = clone.textContent?.trim() || ''

    let id = el.getAttribute('id')
    if (!id) {
      id = cleanText.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `section-${idx}`
      el.setAttribute('id', id)
    }
    el.classList.add('scroll-mt-32')
    return { id, text: cleanText }
  })

  customLinks.value = links

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

const gallery = useArticleGallery()

onUnmounted(() => {
  observer?.disconnect()
  gallery.clearGallery()
})
</script>

<template>
  <div class="theme-portfolio min-h-screen pb-24 transition-colors duration-500">
    <HeaderChild label="Portfolio" />
    <ImageModal />

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
              :class="activeSection === link.id ? 'nav-active-portfolio font-semibold text-[var(--ink)]' : 'nav-hover-portfolio text-[var(--ink-soft)] hover:text-[var(--ink)]'"
            >
              <span 
                class="h-[1.5px] bg-[var(--brass)] transition-all duration-300 mt-[9px] shrink-0"
                :class="activeSection === link.id ? 'w-6' : 'w-0 group-hover:w-3'"
              ></span>
              <span class="whitespace-normal break-words">{{ link.text }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Right Column: Portfolio content -->
      <div class="col-span-1 md:col-span-4 md:col-start-3">
        <header class="flex flex-col gap-4 mb-8 hero-portfolio">
          <!-- Eyebrow -->
          <span v-if="portfolioItem.category" class="eyebrow flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--brass)]">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--brass)] inline-block"></span>
            {{ portfolioItem.category }}
          </span>

          <!-- Title -->
          <h1 class="title text-4xl sm:text-5xl font-normal tracking-tight text-[var(--ink)] leading-tight">
            {{ portfolioItem.title }}
          </h1>

          <!-- Subtitle -->
          <p class="subtitle text-lg sm:text-xl text-[var(--ink-soft)] leading-relaxed font-light" v-if="portfolioItem.description">
            {{ portfolioItem.description }}
          </p>

          <!-- Spec Grid -->
          <div v-if="portfolioItem.role || portfolioItem.timeline || portfolioItem.platform || portfolioItem.focus" class="spec-grid grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 my-4 border-y border-[var(--hair)]">
            <div class="spec-cell" v-if="portfolioItem.role">
              <div class="spec-label text-xs uppercase font-mono tracking-wider text-[var(--ink-soft)]/70">Role</div>
              <div class="spec-value text-sm font-medium text-[var(--ink)] mt-1">{{ portfolioItem.role }}</div>
            </div>
            <div class="spec-cell" v-if="portfolioItem.timeline">
              <div class="spec-label text-xs uppercase font-mono tracking-wider text-[var(--ink-soft)]/70">Timeline</div>
              <div class="spec-value text-sm font-medium text-[var(--ink)] mt-1">{{ portfolioItem.timeline }}</div>
            </div>
            <div class="spec-cell" v-if="portfolioItem.platform">
              <div class="spec-label text-xs uppercase font-mono tracking-wider text-[var(--ink-soft)]/70">Platform</div>
              <div class="spec-value text-sm font-medium text-[var(--ink)] mt-1">{{ portfolioItem.platform }}</div>
            </div>
            <div class="spec-cell" v-if="portfolioItem.focus">
              <div class="spec-label text-xs uppercase font-mono tracking-wider text-[var(--ink-soft)]/70">Focus</div>
              <div class="spec-value text-sm font-medium text-[var(--ink)] mt-1">{{ portfolioItem.focus }}</div>
            </div>
          </div>
        </header>

        <!-- Markdown Prose Content -->
        <article class="prose-portfolio">
          <ContentRenderer :value="portfolioItem" />
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-portfolio {
  --paper: #FAF8F4;
  --paper-raised: #FFFFFF;
  --ink: #1A1A18;
  --ink-soft: #54514A;
  --brass: #8A6F4D;
  --brass-soft: #D9CBB3;
  --hair: #E8E2D6;

  background-color: var(--paper) !important;
  background-image: radial-gradient(circle at 1px 1px, rgba(138, 111, 77, 0.07) 1px, transparent 0) !important;
  background-size: 28px 28px !important;
  color: var(--ink) !important;
  min-height: 100vh;
}

.theme-portfolio ::selection {
  background: var(--brass-soft) !important;
  color: var(--ink) !important;
}

/* Prose Typography */
.prose-portfolio :deep(h2) {
  font-size: 1.75rem;
  margin-top: 2.75rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--ink);
}

.prose-portfolio :deep(h3) {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.35;
  color: var(--ink);
}

.prose-portfolio :deep(p) {
  font-size: 1.125rem;
  line-height: 1.85;
  color: #2a2a28;
  margin-bottom: 1.6rem;
  font-weight: 400;
}

.prose-portfolio :deep(ul) {
  list-style-type: disc;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose-portfolio :deep(ol) {
  list-style-type: decimal;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose-portfolio :deep(li) {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.65;
  color: #2a2a28;
}

.prose-portfolio :deep(blockquote) {
  border-left: 2px solid var(--brass);
  padding-left: 1.25rem;
  font-style: italic;
  color: var(--ink-soft);
  margin: 1.75rem 0;
}
</style>
