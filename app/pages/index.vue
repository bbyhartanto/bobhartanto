<template>
  <div class="w-full relative overflow-hidden">
    <!-- Top Grid Section -->
    <div
      class="flex flex-col md:grid md:grid-cols-6 gap-2 my-8 px-4 pointer-events-none relative z-10 h-[70vh]"
    >
      <div
        class="col-span-2 col-start-3 flex items-center justify-center h-full w-full"
      >
        <img
          src="/images-/bobby.svg"
          alt="Bobby logo"
          class="animate-intro w-[60%] md:w-[90%] h-auto py-4"
        />
      </div>
    </div>
    <div
      :class="{
        'opacity-0': isLoading,
        'opacity-100': !isLoading,
        'transition-opacity duration-1000': true,
      }"
      class="flex flex-col md:grid md:grid-cols-6 gap-2 my-8 px-4 pointer-events-none relative z-10 bg-[#fafafa]"
    >
      <!-- Column 1 -->

      <div class="col-span-2 my-8 px-4 pointer-events-none pb-40">
        <div>
          <img
            src="/images-/bobby-hartanto.png"
            alt="bobby hartanto image"
            class="animate-intro w-[50%] md:w-[50%] h-auto py-4"
          />
        </div>
        <div
          class="col-span-2 lg:col-span-3 lg:col-start-3 -mt-20 lg:-mt-10 lg:-mt-40 lg:ml-20 mix-blend-difference text-white"
        >
          <h2
            data-initial-delay="0.2s"
            data-scroll-delay="0.1s"
            class="opacity-0 font-medium animate-target text-5xl md:text-4xl lg:text-5xl py-4 leading-[1.15]"
          >
            Designer who had a full-stack development perspective.
          </h2>
            <ButtonPortfolio class=" opacity-0 animate-target pointer-events-auto" />
        </div>
      </div>

      <div class="col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-3">
        <div ref="headingsContainer" class="flex flex-col my-4">
          <h2
            data-initial-delay="1.5s"
            data-scroll-delay="0s"
            class="text-3xl py-4 md:text-5xl leading-[1.15] opacity-0 animate-target"
          >
            A product design partner<br />
            with focus on
          </h2>
          <div
            v-for="(service, index) in services"
            :key="index"
            :data-initial-delay="`${0.7 + index * 0.2}s`"
            :data-scroll-delay="`${0.1 + index * 0.1}s`"
            class="pointer-events-auto border-t border-black/10 opacity-0 animate-target"
            :class="{ 'border-b': index === services.length - 1 }"
            >
            <button
              @click="openAccordion = openAccordion === index ? null : index"
              class="w-full flex justify-between items-center py-6 text-left hover:opacity-70 transition-opacity group"
            >
              <div class="flex items-baseline gap-4 md:gap-6">
                <span
                  class="text-lg md:text-2xl text-black/40 font-light font-mono"
                  >0{{ index + 1 }}</span
                >
                <span class="text-2xl md:text-4xl leading-[1.15]">{{
                  service.title
                }}</span>
              </div>
              <span
                class="text-4xl font-light transition-transform duration-300"
                :class="{ 'rotate-45': openAccordion === index }"
                >+</span
              >
            </button>
            <div
              class="grid transition-all duration-300 ease-in-out"
              :class="
                openAccordion === index
                  ? 'grid-rows-[1fr] opacity-100 pb-6'
                  : 'grid-rows-[0fr] opacity-0'
              "
            >
              <div class="overflow-hidden text-lg text-black/70">
                {{ service.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
<!-- Featured Work -->
    <div class="grid grid-cols-2 md:grid-cols-8 gap-2 px-4 pointer-events-none relative z-10">
      <div class="flex col-span-2 md:col-start-2 py-16">
        <div ref="headingsContainer">
          <h3
            data-initial-delay="1.5s"
            data-scroll-delay="0s"
            class="text-6xl md:text-6xl leading-[1.15] opacity-0 animate-target"
          >
            Featured works<br />
          </h3>
      </div>
    </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-10 gap-2 px-4 pointer-events-none relative z-10 items-center">
      <div class="flex items-center col-span-2 md:col-start-2">
        
        <div class="relative w-full flex-col flex items-center justify-center">
          <img src="/images-/cognitix-thumb.png" alt="Cognitix website" class="w-full h-auto object-contain" />
        <p class="text-xs font-mono text-black/50 -mt-6">Fig 01. Cognitix website</p>
        </div>        
      </div>
      <div class="flex flex-col items-center col-span-4 md:col-start-4 justify-center">
        <div class="relative w-full flex-col flex items-center justify-center">
          <img src="/images-/crema.svg" alt="crema roastery website" class="w-50 h-auto object-contain" />
        <p class="text-xs font-mono text-black/50 ">Fig 02. crema logo branding</p>
        </div>        
      </div>
      <div class="flex flex-col items-center col-span-2 md:col-start-8">
        <div class="relative w-full flex-col flex items-center justify-center">
          <img src="/images-/crema-thumb.png" alt="crema roastery website" class="w-full h-auto object-contain" />
        <p class="text-xs font-mono text-black/50">Fig 02. crema roastery website</p>
        </div>        
      </div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-10 gap-2 px-4 pointer-events-none relative z-10 items-center">
      <div class="flex flex-col items-center col-span-3 ">
        <img src="/images-/bublibu-thumb.png" alt="bublibu food delivery app" class="w-full h-auto object-contain" />
          <p class="text-xs font-mono text-black/50 -mt-6">Fig 02. Bublibu food delivery app</p>
      </div>
      <div class="flex flex-col items-center col-span-2 md:col-start-5">
        <p>
          I've shipped full-stack web and mobile products, built lean marketplaces, and structured business models that reduce cost without sacrificing user experience. My edge is conversion-focused design: the kind that moves metrics, not just pixels.
        </p>
        <img src="/images-/MokaPos-thumb.png" alt="Moka POS app" class="w-full h-auto object-contain" />  
        <p class="text-xs font-mono text-black/50 -mt-6">Fig 03. Moka POS app</p>
      </div>
      <div class="flex flex-col items-center col-span-2 md:col-span-4 md:col-start-7">
        <img src="/images-/parkee-thumb.png" alt="parkee parking app" class="w-full h-auto object-contain" />
        <p class="text-xs font-mono text-black/50 pr-10 -mt-6">Fig 04. Parkee app</p>
          
      </div>
    </div>
    

    <!-- Experiences Section -->
    <div class="grid grid-cols-6 md:grid-cols-8 gap-2 px-4 pointer-events-none relative z-10 py-16">
      
      <!-- Section Title -->
      
      <div class="col-span-6 md:col-span-8 flex flex-row gap-5 col-start-1">
        <div class="grid grid-cols-1 md:grid-cols-8 w-full md:scale-100 origin-left gap-16 md:gap-0">
          <div
            class="col-span-1 md:col-start-2 opacity-0 animate-target"
            data-initial-delay="0.2s"
            data-scroll-delay="0.1s"
          >
            <h3 class="text-3xl py-4 md:text-6xl leading-[1.15] opacity-0 animate-target">Experiences</h3>
          </div>
        </div>
      </div>

      <!-- Experience Timeline -->
      <div class="col-span-6 md:col-span-8 flex flex-row gap-5 col-start-1">
        <div class="grid grid-cols-1 md:grid-cols-8 w-full md:scale-100 origin-left gap-8 md:gap-0">
          
          <!-- 2014: Mullen Lowe -->
          <div
            class="col-span-1 md:col-start-2 opacity-0 animate-target"
            data-initial-delay="0.2s"
            data-scroll-delay="0.1s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2014 - 2016</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">Mullen Lowe</p>
          </div>

          <!-- 2016: Astragraphia -->
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.3s"
            data-scroll-delay="0.2s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2016 - 2017</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">Astragraphia</p>
          </div>

          <!-- 2017: MokaPOS -->
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.4s"
            data-scroll-delay="0.3s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2017 - 2018</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">MokaPOS</p>
          </div>

          <!-- 2018: IBM -->
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.5s"
            data-scroll-delay="0.4s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2018 - 2019</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">IBM</p>
          </div>

          <!-- 2019: Paton.Dev -->
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.6s"
            data-scroll-delay="0.5s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2019 - 2026</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">Paton.Dev</p>
          </div>

          <!-- 2026: Freelance -->
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.7s"
            data-scroll-delay="0.6s"
          >
            <p class="md:scale-100 text-sm origin-top-left">2026 - present</p>
            <hr class="my-2 border-black/70" />
            <p class="md:scale-100 origin-top-left">Freelance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Partner Logos -->
    <div class="px-4 pointer-events-none relative z-10 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-8 w-full md:scale-100 origin-left gap-16 md:gap-0">
       
        <div
          class="md:col-start-2 col-span-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <img src="/images-/lowe-logo.png" alt="IBM Logo" class="w-auto h-8 md:h-10 object-contain" />
        </div>
        <div
          class="col-span-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <img src="/images-/Astragraphia-logo.svg" alt="IBM Logo" class="w-auto h-8 md:h-10 object-contain" />
        </div>
        <div
          class="col-span-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <img src="/images-/moka-logo.svg" alt="IBM Logo" class="w-auto h-8 md:h-10 object-contain" />
        </div>
         <div
          class="col-span-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <img src="/images-/ibm.svg" alt="IBM Logo" class="w-auto h-8 md:h-10 object-contain" />
        </div>
         <div
          class="col-span-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <img src="/images-/paton-logo.svg" alt="IBM Logo" class="w-auto h-8 md:h-10 object-contain" />
        </div>
        
      </div>
    </div>
    
    <div :class="{
        'opacity-0': isLoading,
        'opacity-100': !isLoading,
        'transition-opacity duration-1000': true,
      }"
      class="flex flex-col md:grid md:grid-cols-8 gap-2 my-24 px-4 pointer-events-none relative z-10"
    >
      <div class="col-span-2 md:col-span-3 md:col-span-6 md:col-start-2 flex flex-col md:flex-row gap-8 md:gap-16">
        <div class="flex-2 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <p class="text-2xl md:text-2xl leading-[1.15]">
          My experience spans agencies, corporate enterprises, startups, and
          global consultancies.

          </p>  
          <p class="text-xl md:text-xl leading-[1.15] mt-8">
            I help business owners see their blindspots — especially in an AI-first world where the gap between good design and growth is smaller than ever.
            Building something? Let's talk.
          </p>
        </div>

        <div class="flex-1 opacity-0 animate-target"
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
        >
          <h2 class="text-3xl md:text-3xl leading-[1.15]">
          Hire me as:
          </h2>  
          <ul class="text-xl leading-relaxed border-t border-black/10 mt-4 pointer-events-auto">
            <li class="border-b border-black/10 py-3 transition-all duration-300 hover:bg-black hover:text-white hover:pl-2 cursor-pointer opacity-0 animate-target"
                data-initial-delay="0.2s" data-scroll-delay="0.2s">
              Design consulting partner
            </li>
            <li class="border-b border-black/10 py-3 transition-all duration-300 hover:bg-black hover:text-white hover:pl-2 cursor-pointer opacity-0 animate-target"
                data-initial-delay="0.3s" data-scroll-delay="0.3s">
              Development partner
            </li>
            <li class="border-b border-black/10 py-3 transition-all duration-300 hover:bg-black hover:text-white hover:pl-2 cursor-pointer opacity-0 animate-target"
                data-initial-delay="0.4s" data-scroll-delay="0.4s">
              Workshops speaker
            </li>
          </ul>
              <button href="/contact" class="mt-8 flex items-center gap-2 bg-black text-white text-lg px-6 py-3 rounded-lg w-fit hover:opacity-80 hover:scale-[1.1] transition-all duration-300 pointer-events-auto opacity-0 animate-target"
              data-initial-delay="0.5s" data-scroll-delay="0.5s">
              Get in touch
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-arrow">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          <!-- add button get in touch -->
        </div>
      </div>

    </div>

    <div
      class="grid grid-cols-8 gap-2 my-8 px-4 pointer-events-none relative z-10"
    >
      <div
        class="col-span-8 md:col-span-6  flex flex-row gap-5 md:col-start-2 md:px-4 border-b-1 border-black/50 pb-16" 
      >
        <div class="grid grid-cols-3 md:grid-cols-5 w-full gap-4 opacity-0 animate-target"
        data-initial-delay="0.4s"
            data-scroll-delay="0.3s">
          <div class="col-span-1">
            <h2><strong>Agencies</strong></h2>
            <ul>
              <li>Mullen lowe</li>
              <li>Indomie</li>
              <li>XL Axiata</li>
              <li>Axis</li>
              <li>Garuda Indonesia</li>
              <li>Danamon</li>
            </ul>
          </div>
          <div class="col-span-1">
            <h2><strong>Startups</strong></h2>
            <ul>
              <li>Moka POS</li>
              <li>Bublibu</li>
              <li>Cognitix</li>
            </ul>
          </div>
          <div class="col-span-1">
            <h2><strong>Consultancies</strong></h2>
            <ul>
              <li>IBM Indonesia</li>
              <li>XL Axiata</li>
              <li>Adira</li>
              <li>Pertamina</li>
              <li>Astragraphia</li>
            </ul>
          </div>
          <div class="col-span-2">
            <h2><strong>Personal Projects</strong></h2>
            <ul>
              <li>Crema</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const openAccordion = ref(null);
const services = ref([
  {
    title: "Website design & development",
    description:
      "I do loves designing and building websites. I design website on figma for both desktop and mobile design then build it using HTML, Tailwind CSS, Vue.js and Nuxt.js such as this portfolio website.",
  },
  {
    title: "UI Design & Prototyping",
    description:
      "UI design is where I do my sharpest thinking, translating the ambiguous vision of founders and board members into interfaces that feel intuitive, fun and engaging. I've worked across the full spectrum, from emerging to growing startups to large enterprises, Such as Astragraphia, Moka POS and IBM.",
  },
  {
    title: "UX Audit review & Strategy",
    description:
      "I do design critiques, analyzing your existing product to identify usability issues and providing a clear, actionable strategy for improvement.",
  },
  {
    title: "Branding and Design system",
    description:
      "I have ability to designing in pixel perfect such as logo, poster, and banner, and also developing comprehensive, scalable design systems to ensure visual consistency across all of the products in your ecosystem.",
  },
]);

const isLoading = ref(true);
const headingsContainer = ref(null);
let observer = null;

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500); // 1.5s loading delay

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isLoading.value) {
            entry.target.style.animationDelay =
              entry.target.dataset.initialDelay;
          } else {
            entry.target.style.animationDelay =
              entry.target.dataset.scrollDelay;
          }
          entry.target.classList.add("animate-intro");
        } else {
          entry.target.classList.remove("animate-intro");
        }
      });
    },
    { threshold: 0.1 },
  );

  setTimeout(() => {
    // Select ALL elements with .animate-target on the page
    const animatedElements = document.querySelectorAll(".animate-target");
    animatedElements.forEach((el) => observer.observe(el));
  }, 100);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const { data: categoriesDoc } = await useAsyncData("categories", () => {
  return queryCollection("categories").first();
});

const categoriesList = computed(() => {
  return categoriesDoc.value?.items || [];
});

const selectedQuotes = useState("random-quotes", () => {
  const quotesMap = {};
  categoriesList.value.forEach((category) => {
    if (category.Quotes && category.Quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * category.Quotes.length);
      quotesMap[category.name] = category.Quotes[randomIndex];
    } else {
      quotesMap[category.name] =
        "Thing’s that i do with passion in my daily basis";
    }
  });
  return quotesMap;
});

useSeoMeta({
  title: "Bobby Hartanto - UI & UX Consulting Partner",
  ogTitle: "Bobby Hartanto - UI & UX Consulting Partner",
  description:
    "Ex-MokaPOS, Ex-IBM designer turned consulting partner - helping founders and brands design, build, and fix digital products from the ground up.",
  ogDescription:
    "Ex-MokaPOS, Ex-IBM designer turned consulting partner - helping founders and brands design, build, and fix digital products from the ground up.",
  ogImage: "https://bobhartanto.com/og-image.jpg",
  ogUrl: "https://bobhartanto.com/",
});

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=DotGothic16&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
    },
  ],
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-intro {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

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

@keyframes moveRight {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

.animate-arrow {
  animation: moveRight 1.5s ease-in-out infinite;
}
</style>
