<template>
  <footer class="w-full bg-[#fafafa] text-black py-16 px-8 border-t border-black/10">
    <div class=" mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <!-- Left side: Branding / Info -->
      <div class="flex flex-col gap-2">
        <NuxtLink to="/" class="text-lg font-medium leading-tight text-black hover:opacity-85 transition-opacity block text-left">
          Bobby <br/>Hartanto
        </NuxtLink>
        <span class="text-xs text-black/50 font-mono mt-1 block text-left">Product Designer</span>
        <span class="text-xs text-black/40 mt-4 font-mono block text-left">© 2026 Bobby Hartanto. All rights reserved.</span>
      </div>

      <!-- Right side: Navigation Links -->
      <div class="grid grid-cols-2 md:flex md:flex-row gap-x-12 gap-y-6 text-sm text-left">
        <div class="flex flex-col gap-2.5">
          <span class="text-xs uppercase font-mono text-black/45 tracking-wider">Navigation</span>
          <NuxtLink to="/" class="hover:underline opacity-75 hover:opacity-100 transition-all">Home</NuxtLink>
          <NuxtLink to="/casestudies" class="hover:underline opacity-75 hover:opacity-100 transition-all">Works</NuxtLink>
          <a href="#portfolio" class="hover:underline opacity-75 hover:opacity-100 transition-all">Portfolio</a>
          <NuxtLink to="/#" class="hover:underline opacity-75 hover:opacity-100 transition-all">Blog</NuxtLink>
        </div>

        <div class="flex flex-col gap-2.5">
          <span class="text-xs uppercase font-mono text-black/45 tracking-wider">Socials</span>
          <a href="https://www.linkedin.com/in/bobhartanto" target="_blank" rel="noopener" class="hover:underline opacity-75 hover:opacity-100 transition-all">LinkedIn</a>
          <a href="https://dribbble.com/bobhartanto" target="_blank" rel="noopener" class="hover:underline opacity-75 hover:opacity-100 transition-all">Dribbble</a>
          <a href="#" target="_blank" rel="noopener" class="hover:underline opacity-75 hover:opacity-100 transition-all">Read.cv</a>
        </div>

        <div class="flex flex-col gap-2.5 col-span-2 md:col-span-1">
          <span class="text-xs uppercase font-mono text-black/45 tracking-wider font-mono">Say Hello</span>
          <a href="mailto:work.bobbyhartanto@gmail.com" class="hover:underline opacity-75 hover:opacity-100 transition-all font-mono text-xs">
            work.bobbyhartanto@gmail.com
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
