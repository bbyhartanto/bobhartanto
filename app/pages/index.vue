<template>
  <HeaderParent />
  <div class="w-full ">

    <!-- Top Grid Section -->
    <section class="grid grid-cols-2 md:grid-cols-6 gap-[15px] my-8 px-8">
      <!-- Column 1 -->
            <div class="col-span-2 flex-col md:col-span-2 flex">
              <img src="/images-/bobby.svg" alt="bublibu image" class="md:w-[80%] w-[100%] h-auto py-5" />
            </div>
            
            <div class="col-span-2 md:col-start-3 px-4">
              <img src="/images-/bobby-hartanto.png" alt="Bobby Hartanto Portrait" class="w-[30%] h-auto pt-4"/>
              
            </div> 
    </section>

    <section class="grid grid-cols-2 md:grid-cols-6 gap-[15px] my-8">
      <div class="col-span-2 flex-col md:col-start-3 md:col-span-4 lg:col-start-3 lg:col-span-2 flex p-9">
        <h2 class=" text-2xl md:text-4xl leading-[1.15] my-8 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
              </h2>
        <p class="my-8">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.
          </p>
      </div>
    </section>
    <!-- Category Section 1: Problem to Product -->
    <SectionProblemToProduct />

    <!-- Category Section 2: Visual Direction / Design -->
    <SectionDesign />


  </div>
</template>

<script setup>
const { data: categoriesDoc } = await useAsyncData('categories', () => {
  return queryCollection('categories').first()
})

const categoriesList = computed(() => {
  return categoriesDoc.value?.items || []
})

const selectedQuotes = useState('random-quotes', () => {
  const quotesMap = {}
  categoriesList.value.forEach(category => {
    if (category.Quotes && category.Quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * category.Quotes.length)
      quotesMap[category.name] = category.Quotes[randomIndex]
    } else {
      quotesMap[category.name] = "Thing’s that i do with passion in my daily basis"
    }
  })
  return quotesMap
})


useSeoMeta({
  title: 'Bobby Hartanto - UI/UX Designer Blog',
  ogTitle: 'Bobby Hartanto - UI/UX Designer Blog',
  description: 'Product & Design Lead with over 11+ years of experience, Ex Moka POS, EX IBM',
  ogDescription: 'Product & Design Lead with over 11+ years of experience, Ex Moka POS, EX IBM',
  ogImage: 'https://bobhartanto.com/og-image.jpg',
  ogUrl: 'https://bobhartanto.com/'
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
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
      href: 'https://fonts.googleapis.com/css2?family=DotGothic16&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
    }
  ]
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes reveal {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-reveal {
  opacity: 0;
}

.animate-reveal.in-view {
  animation: reveal 0.8s ease-out 0.5s both;
}
</style>
