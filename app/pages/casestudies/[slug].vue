<script setup lang="ts">
const route = useRoute()

// Fetch the case study from the 'casestudies' collection by its path
const { data: caseStudy } = await useAsyncData('casestudy-' + route.params.slug, () => {
  let q = queryCollection('casestudies').path(route.path)
  if (!import.meta.dev) {
    q = q.where('draft', '=', false)
  }
  return q.first()
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

// Dynamically load font family for all case studies
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
  // 1. Try to find actual H2 heading elements first
  let headingElements = Array.from(document.querySelectorAll('.prose-casestudy h2'))
  
  // 2. If no H2 elements exist, look for bold-paragraphs acting as section titles
  const usingBoldParas = headingElements.length === 0
  if (usingBoldParas) {
    headingElements = Array.from(document.querySelectorAll('.prose-casestudy p')).filter(p => {
      const child = p.firstElementChild
      return child && (child.tagName === 'STRONG' || child.tagName === 'B') && p.textContent?.trim() === child.textContent?.trim()
    })
  }

  // 3. Build a dynamic links map and assign anchor IDs to paragraphs
  const links = headingElements.map((el, idx) => {
    // Clone the element to safely inspect text content without step-number
    const clone = el.cloneNode(true) as HTMLElement
    const stepEl = clone.querySelector('.step-number')
    let stepPrefix = ''
    if (stepEl) {
      stepPrefix = stepEl.textContent?.trim() ? `${stepEl.textContent.trim()}. ` : ''
      stepEl.remove()
    }
    const cleanText = clone.textContent?.trim() || ''
    const text = stepPrefix + cleanText

    let id = el.getAttribute('id')
    if (!id) {
      id = cleanText.toLowerCase()
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
  <div class="theme-casestudy min-h-screen pb-24 transition-colors duration-500">
    <HeaderChild />

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
              :class="activeSection === link.id ? 'nav-active-casestudy font-semibold' : 'nav-hover-casestudy'"
            >
              <!-- Content Navigation -->
              <span 
                class="h-[1.5px] bg-[var(--brass)] transition-all duration-300 mt-[9px] shrink-0"
                :class="activeSection === link.id ? 'w-6' : 'w-0 group-hover:w-3'"
              ></span>
              <span class="whitespace-normal break-words">{{ link.text }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Right Column: Case Study content -->
      <div class="col-span-1 md:col-span-4 md:col-start-3">
        <header class="flex flex-col gap-4 mb-8 hero-casestudy">
          <!-- Eyebrow -->
          <span v-if="caseStudy.category" class="eyebrow"><span class="dial"></span>{{ caseStudy.category }}</span>
          <!-- Title -->
          <h1 class="title">
            {{ caseStudy.title }}
          </h1>
          <!-- Subtitle -->
          <p class="subtitle" v-if="caseStudy.description">
            {{ caseStudy.description }}
          </p>

          <!-- Lede -->
          <p v-if="caseStudy.excerpt" class="lede" v-html="caseStudy.excerpt"></p>

          <!-- Spec Grid -->
          <div v-if="caseStudy.role || caseStudy.timeline || caseStudy.platform || caseStudy.focus" class="spec-grid">
            <div class="spec-cell" v-if="caseStudy.role">
              <div class="spec-label">Role</div>
              <div class="spec-value">{{ caseStudy.role }}</div>
            </div>
            <div class="spec-cell" v-if="caseStudy.timeline">
              <div class="spec-label">Timeline</div>
              <div class="spec-value">{{ caseStudy.timeline }}</div>
            </div>
            <div class="spec-cell" v-if="caseStudy.platform">
              <div class="spec-label">Platform</div>
              <div class="spec-value">{{ caseStudy.platform }}</div>
            </div>
            <div class="spec-cell" v-if="caseStudy.focus">
              <div class="spec-label">Focus</div>
              <div class="spec-value">{{ caseStudy.focus }}</div>
            </div>
          </div>
        </header>

        <!-- Markdown Prose Content -->
        <article class="prose-casestudy">
          <ContentRenderer :value="caseStudy" />
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* High-end custom typography style overrides for markdown rendering */
.prose-casestudy :deep(h1) {
  font-size: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.25;
  color: var(--ink);
}

.prose-casestudy :deep(h2) {
  font-size: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--ink);
}

.prose-casestudy :deep(h3) {
  font-size: 1.55rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--ink);
}

.prose-casestudy :deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.prose-casestudy :deep(ul) {
  list-style-type: disc;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose-casestudy :deep(ol) {
  list-style-type: decimal;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

.prose-casestudy :deep(li) {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #222222;
  font-weight: 400;
}

/* Custom Case Study styles */
.theme-casestudy {
  --paper: #FAF8F4;
  --paper-raised: #FFFFFF;
  --ink: #1A1A18;
  --ink-soft: #54514A;
  --brass: #8A6F4D;
  --brass-soft: #D9CBB3;
  --red: #C44830;
  --red-soft: #F3E0DA;
  --green: #5C7A6E;
  --green-soft: #E2E9E2;
  --hair: #E8E2D6;
  --measure: 680px;

  background-color: var(--paper) !important;
  background-image: radial-gradient(circle at 1px 1px, rgba(138, 111, 77, 0.07) 1px, transparent 0) !important;
  background-size: 28px 28px !important;
  color: var(--ink) !important;
  font-family: var(--font-sans), sans-serif !important;
  min-height: 100vh;
}

.theme-casestudy ::selection {
  background: var(--brass-soft) !important;
  color: var(--ink) !important;
}

.theme-casestudy h1,
.theme-casestudy h2,
.theme-casestudy h3,
.theme-casestudy .title,
.theme-casestudy .subtitle,
.prose-casestudy :deep(h1),
.prose-casestudy :deep(h2),
.prose-casestudy :deep(h3),
.prose-casestudy :deep(blockquote),
.prose-casestudy :deep(.thesis p) {
  font-family: 'Fraunces', serif !important;
}

/* Eyebrow & Dial */
.theme-casestudy .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brass);
  margin-bottom: 22px;
}

.theme-casestudy .eyebrow .dial {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--brass);
  position: relative;
  flex-shrink: 0;
}

.theme-casestudy .eyebrow .dial::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 6px;
  width: 1.5px;
  height: 5px;
  background: var(--brass);
  transform-origin: bottom center;
  transform: rotate(35deg);
}

/* Hero elements */
.theme-casestudy .title {
  font-weight: 600;
  font-size: clamp(32px, 5.4vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.015em;
  margin: 0 0 16px;
  color: var(--ink);
}

.theme-casestudy .subtitle {
  font-style: italic;
  font-weight: 500;
  font-size: clamp(17px, 2.4vw, 21px);
  color: var(--ink-soft);
  margin: 0 0 28px;
  max-width: 620px;
  line-height: 1.4;
}

.theme-casestudy .lede {
  font-size: 18px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 620px;
}

/* Spec Grid */
.theme-casestudy .spec-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin: 36px 0 0;
  border: 1px solid var(--hair);
  border-radius: 4px;
  overflow: hidden;
}

.theme-casestudy .spec-cell {
  padding: 14px 16px;
  border-right: 1px solid var(--hair);
  background: var(--paper-raised);
}

.theme-casestudy .spec-cell:last-child {
  border-right: none;
}

.theme-casestudy .spec-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brass);
  margin-bottom: 5px;
}

.theme-casestudy .spec-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--ink);
}

@media (max-width: 640px) {
  .theme-casestudy .spec-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .theme-casestudy .spec-cell:nth-child(2) {
    border-right: none;
  }
  .theme-casestudy .spec-cell:nth-child(1),
  .theme-casestudy .spec-cell:nth-child(2) {
    border-bottom: 1px solid var(--hair);
  }
}

/* TOC active states override */
.theme-casestudy .nav-active-casestudy {
  color: var(--ink) !important;
  font-weight: 600 !important;
}

.theme-casestudy .nav-hover-casestudy {
  color: var(--ink-soft) !important;
}

.theme-casestudy .nav-hover-casestudy:hover {
  color: var(--ink) !important;
}

/* Prose Casestudy layout & overrides */
.prose-casestudy :deep(p) {
  font-family: var(--font-sans), sans-serif;
  font-size: 17px;
  line-height: 1.78;
  color: var(--ink);
  margin-bottom: 22px;
}

.prose-casestudy :deep(h2) {
  font-weight: 600;
  font-size: clamp(24px, 3.4vw, 30px);
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin: 56px 0 22px;
  padding-top: 28px;
  border-top: 1px solid var(--hair);
  color: var(--ink);
  scroll-margin-top: 24px;
}

.prose-casestudy :deep(h2:first-child) {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

/* Step number */
.prose-casestudy :deep(.step-number) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1.5px solid var(--brass);
  border-radius: 50%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--brass);
  margin-right: 12px;
  vertical-align: middle;
  flex-shrink: 0;
}

.prose-casestudy :deep(.h2-inner) {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* Thesis callouts */
.prose-casestudy :deep(.thesis) {
  background: var(--paper-raised);
  border: 1px solid var(--hair);
  border-left: 3px solid var(--brass);
  border-radius: 2px;
  padding: 22px 24px;
  margin: 28px 0;
  position: relative;
}

.prose-casestudy :deep(.thesis .tag) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brass);
  display: block;
  margin-bottom: 10px;
}

.prose-casestudy :deep(.thesis p) {
  font-style: italic;
  font-weight: 500;
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0;
}

/* Reframe highlight */
.prose-casestudy :deep(mark.reframe) {
  background: linear-gradient(to bottom, transparent 62%, var(--brass-soft) 62%);
  color: var(--ink);
  padding: 0 1px;
  font-weight: 600;
}

/* Notes callouts */
.prose-casestudy :deep(.flag-note) {
  display: flex;
  gap: 14px;
  background: var(--red-soft);
  border-radius: 4px;
  padding: 18px 20px;
  margin: 24px 0;
}

.prose-casestudy :deep(.flag-note .icon) {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 2px;
}

.prose-casestudy :deep(.flag-note .body strong) {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 6px;
}

.prose-casestudy :deep(.flag-note .body p) {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--ink);
}

.prose-casestudy :deep(.check-note) {
  display: flex;
  gap: 14px;
  background: var(--green-soft);
  border-radius: 4px;
  padding: 18px 20px;
  margin: 24px 0;
}

.prose-casestudy :deep(.check-note .icon) {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 2px;
}

.prose-casestudy :deep(.check-note .body strong) {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 6px;
}

.prose-casestudy :deep(.check-note .body p) {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--ink);
}

/* Tag chips */
.prose-casestudy :deep(.tag-row) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 26px;
}

.prose-casestudy :deep(.chip) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  letter-spacing: 0.03em;
  padding: 5px 11px;
  border-radius: 20px;
  border: 1px solid var(--brass-soft);
  color: var(--brass);
  background: var(--paper-raised);
}

/* Chain (cause -> effect chains) */
.prose-casestudy :deep(.chain) {
  margin: 24px 0;
  padding: 20px 22px;
  background: var(--paper-raised);
  border: 1px solid var(--hair);
  border-radius: 4px;
  font-size: 16px;
  line-height: 2;
  color: var(--ink-soft);
}

.prose-casestudy :deep(.chain b) {
  color: var(--ink);
}

.prose-casestudy :deep(.chain .arrow) {
  color: var(--brass);
  margin: 0 6px;
  font-family: 'JetBrains Mono', monospace;
}

/* Blockquote */
.prose-casestudy :deep(blockquote) {
  margin: 28px 0;
  padding: 4px 0 4px 22px;
  border-left: 2px solid var(--brass-soft);
  font-style: italic;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* Gauge quote signature */
.prose-casestudy :deep(.gauge-quote) {
  margin: 40px 0;
  padding: 40px 28px 32px;
  background: var(--ink);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.prose-casestudy :deep(.gauge-quote::before) {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.06) 1px, transparent 0);
  background-size: 22px 22px;
  pointer-events: none;
}

.prose-casestudy :deep(.gauges) {
  display: flex;
  gap: 28px;
  justify-content: center;
  margin-bottom: 28px;
  position: relative;
}

.prose-casestudy :deep(.gauge) {
  text-align: center;
}

.prose-casestudy :deep(.gauge svg) {
  display: block;
  margin: 0 auto 8px;
}

.prose-casestudy :deep(.gauge-label) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9C968A;
}

.prose-casestudy :deep(.gauge-quote p) {
  position: relative;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(18px, 2.6vw, 21px);
  line-height: 1.62;
  color: #F3EFE6;
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
}

.prose-casestudy :deep(.gauge-quote .accent) {
  color: #E0A98C;
  font-style: normal;
  font-weight: 600;
}

.prose-casestudy :deep(.gauge-quote .accent-brake) {
  color: #D88A78;
  font-style: normal;
  font-weight: 600;
}

/* Editor notes, prompt block, hashtags */
.prose-casestudy :deep(.closing-sign) {
  margin: 32px 0 8px;
  font-size: 17px;
  line-height: 1.7;
}

.prose-casestudy :deep(.editor-note) {
  font-size: 14.5px;
  color: var(--ink-soft);
  font-style: italic;
  border-top: 1px dashed var(--hair);
  padding-top: 18px;
  margin-top: 8px;
}

.prose-casestudy :deep(.prompt-block) {
  margin: 32px 0;
  padding: 24px;
  background: var(--paper-raised);
  border: 1px dashed var(--brass-soft);
  border-radius: 6px;
}

.prose-casestudy :deep(.prompt-block p) {
  font-size: 16.5px;
  margin: 0;
  color: var(--ink);
}

.prose-casestudy :deep(.prompt-block .q-mark) {
  font-size: 40px;
  color: var(--brass-soft);
  line-height: 0.5;
  display: block;
  margin-bottom: 6px;
}

.prose-casestudy :deep(.hashtags) {
  margin: 36px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.prose-casestudy :deep(.hashtags span) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--brass);
}

.theme-casestudy :deep(strong),
.theme-casestudy :deep(b) {
  font-weight: 600;
  color: var(--ink);
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
