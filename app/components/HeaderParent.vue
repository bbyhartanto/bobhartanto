<template>
  <div class="w-full sticky top-0 z-50">
    <div class="p-5">
      <!-- Desktop Header -->
      <header class="hidden md:block text-sm">
        <nav class="bg-[#fafafa]/80 backdrop-blur-md w-full text-black py-3 px-6 rounded-md leading-tight font-medium grid grid-cols-6 gap-6 items-center">
          <NuxtLink to="/" class="col-span-1 hover:opacity-80 transition-opacity text-left">
            Bobby <br/>Hartanto
          </NuxtLink>
          <NuxtLink to="/casestudies" class="col-span-1 opacity-75 hover:opacity-100 transition-opacity duration-200">
            Works<br/><span class="text-[12px] text-black/50">Casestudies</span>
          </NuxtLink>
          <ButtonPortfolio class="col-span-1" />
          <a href="https://www.instagram.com/desainer.bergairah/" class="col-span-1 opacity-75 hover:opacity-100 transition-opacity duration-200">
            Instagram<br/><span class="text-[12px] text-black/50">designer.bergairah</span>
          </a>
          <a href="https://www.linkedin.com/in/bobhartanto" class="col-span-1 opacity-75 hover:opacity-100 transition-opacity duration-200">
            Linkedin<br/><span class="text-[12px] text-black/50">Bobhartanto</span>
          </a>
          <a href="mailto:work.bobbyhartanto@gmail.com" class="col-span-1 opacity-75 hover:opacity-100 transition-opacity duration-200">
            Contact<br/><span class="text-[12px] text-black/50">work.bobbyhartanto@gmail.com </span>
          </a>
        </nav>
      </header>

      <!-- Mobile Header -->
      <header class="block md:hidden text-sm">
        <nav class="bg-[#fafafa]/80 backdrop-blur-md w-full text-black py-3 px-6 rounded-md leading-tight font-medium grid grid-cols-6 gap-6 items-center">
          <NuxtLink to="/" class="col-span-5 hover:opacity-80 transition-opacity text-left">
            Bobby <br/>Hartanto
          </NuxtLink>
          <button @click="isMenuOpen = !isMenuOpen" class="col-span-1 justify-self-end flex items-center justify-center p-1 focus:outline-none" aria-label="Toggle Menu">
            <!-- Hamburger Icon (shows when closed) -->
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Close Icon (shows when open) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Mobile Dropdown Links -->
          <div v-if="isMenuOpen" class="col-span-6 flex flex-col gap-4 pt-4 border-t border-black/10">
            <NuxtLink to="/casestudies" @click="isMenuOpen = false" class="opacity-75 hover:opacity-100 transition-opacity duration-200">
              Works<br/><span class="text-[12px] text-black/50">Casestudies</span>
            </NuxtLink>
            <ButtonPortfolio @click="isMenuOpen = false" />
            <NuxtLink to="/#" @click="isMenuOpen = false" class="opacity-75 hover:opacity-100 transition-opacity duration-200">
              Blog<br/><span class="text-[12px] text-black/50">Articles</span>
            </NuxtLink>
            <a href="https://www.linkedin.com/in/bobhartanto" @click="isMenuOpen = false" class="opacity-75 hover:opacity-100 transition-opacity duration-200">
              Linkedin<br/><span class="text-[12px] text-black/50">Bobhartanto</span>
            </a>
            <a href="mailto:work.bobbyhartanto@gmail.com" @click="isMenuOpen = false" class="opacity-75 hover:opacity-100 transition-opacity duration-200">
              Contact<br/><span class="text-[12px] text-black/50">work.bobbyhartanto@gmail.com </span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>


