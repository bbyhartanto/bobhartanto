<template>
  <div class="w-full sticky top-0 z-10 border-b-1 border-black">
    <div class="p-5">
    <header class="flex justify-between text-sm ">
      <span>Bobby Hartanto</span>
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
    <section class="flex flex-col md:flex-row gap-[15px]">
      <!-- Column 1 -->
            <div class="flex-1 lg:flex-2 justify-center relative overflow-hidden py-2 md:py-0">
              <div class="flex flex-col">
                <div class="w-[100%] lg:w-[80%] mx-auto rounded-md overflow-hidden animate-reveal">
                  <video 
                  src="/videos/bby.mp4" 
                  autoplay 
                  loop 
                  muted 
                  playsinline 
                  class="w-full h-full object-cover"
                ></video>
                </div>
              </div>
            </div>
            <!-- Column 2 -->
            <div class="flex-3 md:col-start-3 md:col-span-2 flex py-2 md:py-0">
              <h2 class="md:pl-10 lg:pl-0 text-2xl md:text-5xl leading-[1.15] m-0 max-w-[100%]">Bobby Hartanto is an Indonesian based product designer with over 11+ years experience in designing intuitive and useful digital products.
              
              </h2>
              <p class="mt-[15px]">My experience spans agencies, corporate enterprises, startups, and global consultancies from 2014 to 2026, Culminating in a highly adaptable approach to design and problem solving. 
          </p>
            </div>

            <div class="flex-1 flex items-center justify-center py-2 md:col-span-1 md:py-10">
        <img src="/images-/circle.svg" alt="bublibu image" class="w-[50%] h-auto" />
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-5 gap-[15px] mb-[30px] md:border-b-1 border-black">
      <div class="col-span-1 md:col-span-2 md:col-start-2 md:py-10 flex items-center justify-center">
        <img src="/images-/bobby.svg" alt="bublibu image" class="w-[90%] h-auto" />
      </div>
      <div class="col-span-1 md:col-start-5 md:col-span-1 md:py-10 flex items-center justify-center">
        <img src="/images-/barcode.svg" alt="bublibu image" class="w-[90%] h-auto" />
      </div>
    </section>
  </div>
</template>

<script setup>
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-reveal').forEach(el => {
    observer.observe(el)
  })
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
