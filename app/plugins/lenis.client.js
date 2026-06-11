import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  // Automatically disable Lenis during local development (npm run dev)
  // so you can edit content in Nuxt Studio without any scroll bugs.
  // It will automatically turn back on when you deploy the site!
  if (import.meta.dev) {
    return {
      provide: { lenis: null }
    }
  }

  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Ensure anchor links work properly in production
  const scrollToHash = (hash, immediate = false) => {
    if (hash) {
      try {
        const id = decodeURIComponent(hash)
        const element = document.querySelector(id)
        if (element) {
          lenis.scrollTo(element, { immediate })
        }
      } catch (e) {
        console.error('Invalid hash selector:', hash)
      }
    }
  }

  if (window.location.hash) {
    setTimeout(() => {
      scrollToHash(window.location.hash, true)
    }, 500)
  }

  window.addEventListener('hashchange', () => {
    scrollToHash(window.location.hash)
  })

  nuxtApp.hook('page:finish', () => {
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash)
      }, 100)
    }
  })

  return {
    provide: { lenis }
  }
})
