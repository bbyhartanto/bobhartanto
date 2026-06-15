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
            <ButtonPortfolio class="col-span-1 !bg-white !text-black pointer-events-auto" />
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
            :data-initial-delay="`${1.7 + index * 0.2}s`"
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
    </div>

    <!-- profile section -->

    <div
      class="grid grid-cols-6 md:grid-cols-8 gap-2 px-4 pointer-events-none relative z-10 py-16"
    ><div class="col-span-6 md:col-span-8 flex flex-row gap-5 col-start-1">
    
        <div class="flex flex-col md:flex-row grid grid-cols-1 md:grid-cols-8 w-full md:scale-100 origin-left gap-16 md:gap-0">
          <div
            class="col-span-1 md:col-start-2 opacity-0 animate-target"
            data-initial-delay="0.2s"
            data-scroll-delay="0.1s"
          >
            <p class="text-3xl py-4 md:text-5xl leading-[1.15] opacity-0 animate-target">Experiences</p>
          </div>
          </div></div>
      <div class="col-span-6 md:col-span-8 flex flex-row gap-5 col-start-1">
    
        <div class="flex flex-col md:flex-row grid grid-cols-1 md:grid-cols-8 w-full md:scale-100 origin-left gap-8 md:gap-0">
          <div
            class="col-span-1 md:col-start-2 opacity-0 animate-target"
            data-initial-delay="0.2s"
            data-scroll-delay="0.1s"
          >
            <p class="0 md:scale-100 origin-top-left">2014</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left">Mullen Lowe</p>
          </div>
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.3s"
            data-scroll-delay="0.2s"
          >
            <p class="0 md:scale-100 origin-top-left ">2016</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left ">Astragraphia</p>
          </div>
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.4s"
            data-scroll-delay="0.3s"
          >
            <p class="0 md:scale-100 origin-top-left ">2017</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left">MokaPOS</p>
          </div>
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.5s"
            data-scroll-delay="0.4s"
          >
            <p class="0 md:scale-100 origin-top-left">2018</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left">IBM</p>
          </div>
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.6s"
            data-scroll-delay="0.5s"
          >
          <p class="0 md:scale-100 origin-top-left">2019</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left">Paton.Dev</p>
          </div>
          <div
            class="col-span-1 opacity-0 animate-target"
            data-initial-delay="0.7s"
            data-scroll-delay="0.6s"
          >
            <p class="0 md:scale-100 origin-top-left">2026</p>
            <hr class="my-2 border-black/70" />
            <p class="0 md:scale-100 origin-top-left">Freelance</p>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'opacity-0': isLoading,
        'opacity-100': !isLoading,
        'transition-opacity duration-1000': true,
      }"
      class="flex flex-col md:grid md:grid-cols-8 gap-2 my-8 px-4 pointer-events-none relative z-10"
    >
      <div class="col-span-2 md:col-span-3 md:col-start-2">
        <h2
          data-initial-delay="0.2s"
          data-scroll-delay="0.1s"
          class="opacity-0 animate-target text-3xl py-16 md:text-5xl leading-[1.15]"
        >
          My experience spans agencies, corporate enterprises, startups, and
          global consultancies
        </h2>
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
  title: "Bobby Hartanto - UI/UX Designer",
  ogTitle: "Bobby Hartanto - UI/UX Designer",
  description:
    "UX|UI Product designer specialize in building digital products for startup, enterprise and consultancy with over 11+ years of experience.",
  ogDescription:
    "UX|UI Product designer specialize in building digital products for startup, enterprise and consultancy with over 11+ years of experience.",
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
</style>
