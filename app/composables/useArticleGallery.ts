export interface GalleryImage {
  id: string
  src: string
  alt?: string
  caption?: string
}

export const useArticleGallery = () => {
  const images = useState<GalleryImage[]>('article-gallery-images', () => [])
  const isOpen = useState<boolean>('article-gallery-is-open', () => false)
  const currentIndex = useState<number>('article-gallery-current-index', () => 0)

  const registerImage = (image: GalleryImage) => {
    const existingIndex = images.value.findIndex(img => img.id === image.id || img.src === image.src)
    if (existingIndex >= 0) {
      images.value[existingIndex] = image
    } else {
      images.value.push(image)
    }
  }

  const unregisterImage = (idOrSrc: string) => {
    images.value = images.value.filter(img => img.id !== idOrSrc && img.src !== idOrSrc)
  }

  const clearGallery = () => {
    images.value = []
    isOpen.value = false
    currentIndex.value = 0
  }

  const openModal = (identifier: string | number) => {
    if (typeof identifier === 'number') {
      if (identifier >= 0 && identifier < images.value.length) {
        currentIndex.value = identifier
        isOpen.value = true
      }
    } else {
      const idx = images.value.findIndex(img => img.src === identifier || img.id === identifier)
      if (idx !== -1) {
        currentIndex.value = idx
      } else {
        // If not found in registered images, register it on the fly
        images.value.push({ id: identifier, src: identifier })
        currentIndex.value = images.value.length - 1
      }
      isOpen.value = true
    }
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const next = () => {
    if (images.value.length === 0) return
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }

  const prev = () => {
    if (images.value.length === 0) return
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  }

  const currentImage = computed(() => {
    if (images.value.length === 0) return null
    return images.value[currentIndex.value] || null
  })

  return {
    images,
    isOpen,
    currentIndex,
    currentImage,
    registerImage,
    unregisterImage,
    clearGallery,
    openModal,
    closeModal,
    next,
    prev
  }
}
