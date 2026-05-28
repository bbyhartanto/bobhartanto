<template>
  <div class="w-full sticky top-0 z-10 border-b-1 border-black">
    <div class="p-5">
    <header class="flex justify-between text-sm ">
      <span>Bobby<br>Hartanto</span>
      <div class="flex bg-black py-3 px-5 rounded-full text-[#ffffff]">
        <p class="hidden md:block pr-5">Reach me out</p>
        <a href="mailto:work.bobbyhartanto@gmail.com" class=" underline">work.bobbyhartanto@gmail.com</a>  
      </div>
    </header>
    </div>
  </div>
  <div class="w-full px-5 pt-10 pb-[100px]">

    <!-- <section class="mb-[50px]">
      <h1 class="text-[110px] font-medium tracking-tight m-0 leading-none">BOBBY HARTANTO</h1>
      <p class="text-[22px] m-0 font-light text-[#333]">A No fancy lead UI&UX Designer</p>
    </section> -->

    <!-- Top Grid Section -->
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[15px]">
      <!-- Column 1 -->
            <div class="col-span-2 flex-col md:col-span-1 md:col-start-2 lg:col-span-2 lg:col-start-3 flex">
              <img src="/images-/bobby.svg" alt="bublibu image" class="md:w-[40%] w-[60%] h-auto py-5" />
              <h2 class=" text-2xl md:text-4xl leading-[1.15] m-0 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
              </h2>
            </div>
            <div class="flex-1 flex items-center justify-center py-2 md:col-span-1 md:py-10">
      </div>
    </section>
    <section class="grid grid-cols-2 md:grid-cols-6 gap-[15px]">
      <div class="col-span-1 flex-col md:col-start-3 md:col-span-2 flex">
        <p class="mt-[15px]">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.
          </p>
      </div>
    </section>
    <!-- Beautiful Daily Passion / Case Studies Section -->
    <section class="grid grid-cols-1 md:grid-cols-6 gap-x-[30px] gap-y-[40px] mt-24 items-start relative">
      <!-- Left Column (Sticky on Desktop) -->
      <div class="col-span-1 md:col-span-2 md:sticky md:top-28 flex flex-col gap-6">
        <div class="grid grid-cols-2 gap-[15px]">
          <!-- Top-Left Gray Box -->
          <div class="col-span-1 bg-box-grey h-[220px] w-full hidden md:block rounded-sm"></div>
          <!-- Empty column for layout spacing -->
          <div class="col-span-1 hidden md:block"></div>
          
          <!-- Heading Text -->
          <div class="col-span-2 mt-4 md:mt-6">
            <h2 class="text-3xl md:text-[38px] font-normal leading-[1.15] tracking-tight text-black">
              Thing’s that i do with passion in my daily basis
            </h2>
          </div>
          
          <!-- Bottom-Left Gray Box -->
          <div class="col-span-1 bg-box-grey h-[120px] w-full hidden md:block mt-4 rounded-sm"></div>
          
          <!-- Bottom-Middle Gray Box -->
          <div class="col-span-1 bg-box-grey h-[280px] w-full hidden md:block mt-4 rounded-sm"></div>
        </div>
      </div>

      <!-- Right Column (List of Services/Roles) -->
      <div class="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-[30px]">
        <!-- Main Service Lists (Spans Cols 1-3 on Desktop, corresponding to Cols 3-5 of parent) -->
        <div class="col-span-1 md:col-span-3 flex flex-col gap-16 md:gap-24">
          <div v-for="(service, index) in services" :key="index" class="flex flex-col">
            <!-- Number -->
            <span class="text-lg font-light text-gray-500 mb-2 block font-mono">{{ service.number }}</span>
            <!-- Service Title -->
            <h3 class="text-2xl md:text-[34px] font-normal leading-[1.2] tracking-tight text-black mb-6">
              {{ service.title }}
            </h3>
            
            <!-- Badges/Pills -->
            <div class="flex flex-wrap gap-2.5 mb-8">
              <span 
                v-for="tag in service.tags" 
                :key="tag" 
                class="px-4 py-1.5 border border-black/45 rounded-full text-xs font-light text-gray-800 tracking-tight"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Experience Sub-List -->
            <div class="flex flex-col border-t border-black">
              <div 
                v-for="(item, itemIndex) in service.items" 
                :key="itemIndex" 
                class="border-b border-black py-6 flex flex-col md:flex-row justify-between items-start gap-4"
              >
                <span class="text-[17px] font-semibold text-black min-w-[150px]">{{ item.name }}</span>
                <p class="text-sm font-light text-gray-700 leading-relaxed md:max-w-[360px]">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top-Right Gray Box (Spans Col 4 on Desktop, corresponding to Col 6 of parent) -->
        <div class="col-span-1 md:col-span-1 hidden md:block">
          <div class="bg-box-grey h-[180px] w-full rounded-sm"></div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
const services = [
  {
    number: '01',
    title: 'Navigating problem to product',
    tags: ['Strategy', 'Research', 'Design thinking'],
    items: [
      {
        name: 'Bublibu cooy',
        description: 'My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026.'
      },
      {
        name: 'Bublibu cooy',
        description: 'My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026.'
      }
    ]
  },
  {
    number: '02',
    title: 'Key visual and design direction',
    tags: ['Art direction', 'Visual design', 'Identity'],
    items: [
      {
        name: 'Bublibu cooy',
        description: 'My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026.'
      }
    ]
  },
  {
    number: '03',
    title: 'Building Design system',
    tags: ['Component library', 'Design tokens', 'Documentation'],
    items: [
      {
        name: 'Bublibu cooy',
        description: 'My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026. This gives me the full-stack design perspective to navigate ambiguity, unite teams, and take a product from concept to launch.'
      }
    ]
  }
]


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
