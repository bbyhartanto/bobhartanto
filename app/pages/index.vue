<template>
  <div class="max-w-[1200px] mx-auto px-5 pt-10 pb-[100px]">
    <header class="flex justify-between text-sm mb-[60px] font-normal">
      <span>Indonesia</span>
      <a href="mailto:hello@bobhartanto.com" class="text-[#1A1A1A] no-underline">hello@bobhartanto.com</a>
    </header>

    <section class="mb-[50px]">
      <h1 class="text-[110px] font-medium tracking-tight m-0 leading-none">BOBBY HARTANTO</h1>
      <p class="text-[22px] m-0 font-light text-[#333]">A No fancy lead UI&UX Designer</p>
    </section>

    <!-- Top Grid Section -->
    <section class="grid grid-cols-3 gap-[15px] mb-[60px]">
      <!-- Row 1 -->
      <div class="bg-box-grey flex items-center justify-center relative overflow-hidden aspect-[4/3]">
        <div class="flex flex-col items-center">
          <div class="w-[90px] h-[90px] border border-[#444] rounded-full relative flex items-center justify-center before:content-[''] before:absolute before:bg-[#444] before:w-full before:h-px before:rotate-45 after:content-[''] after:absolute after:bg-[#444] after:w-full after:h-px after:-rotate-45"></div>
          <div class="text-[14px] text-[#444] text-center leading-snug mt-2.5">image<br>placeholder</div>
        </div>
      </div>
      <div class="col-span-2 flex items-center pl-[30px]">
        <h2 class="text-[40px] font-normal leading-[1.15] m-0 max-w-[95%]">Bobby Hartanto is user interaction designer that just do stupid simple things that work, no fancy!</h2>
      </div>

      <!-- Row 2 -->
      <div class="text-[16px] leading-relaxed pt-5 pr-[30px]">
        <span class="text-accent-red text-[14px] font-normal">Case study</span>
        <p class="mt-[15px]">Here How bobby's human layer communication to improve driver delivery efficiency</p>
      </div>
      <div class="bg-box-grey flex items-center justify-center relative overflow-hidden aspect-[4/3]">
        <div class="text-[14px] text-[#444] text-center leading-snug">image<br>placeholder</div>
      </div>
      <div class="text-[16px] leading-relaxed pt-5 pl-5">
        <p>He's experiencing build a whole user experience of food delivery app, managing the design to dev alignment alone with 2 engineer from rough ideas, ship the product optimize it to have almost 0 fail rate at 200 food delivery attempt</p>
      </div>
    </section>

    <!-- Experiences Ribbon -->
    <section class="flex items-center gap-[30px] my-[70px] text-[16px]">
      <div class="bg-[#1A1A1A] text-white py-1.5 px-3 text-[13px] font-semibold tracking-wider whitespace-nowrap">[ EXPERIENCES ]</div>
      <div class="flex justify-between flex-1">
        <div class="text-[#333]"><b class="font-bold text-[#1A1A1A] text-[18px]">Paton Dev</b> – Product & Lead Design 2025</div>
        <div class="text-[#333]"><b class="font-black text-[#1A1A1A] text-[18px] tracking-tight">IBM</b> Indonesia – Senior Design Consultant 2019</div>
        <div class="text-[#333]"><b class="font-bold text-[#1A1A1A] text-[18px]">moka <span class="text-[13px] font-semibold">Point of Sales</span></b> - Senior UI/UX Designer</div>
      </div>
    </section>

    <!-- Bottom Grid Section -->
    <section class="grid grid-cols-3 gap-[15px]">
      <!-- Column 1 -->
      <div class="flex flex-col h-full">
        <div class="bg-box-grey flex items-center justify-center relative overflow-hidden flex-1 min-h-0">
          <div class="text-[14px] text-[#444] text-center leading-snug">image<br>placeholder</div>
        </div>
        <p class="text-[14px] leading-snug mb-0 mt-[15px]">His first open free class, Fundamental step to transform yourself become UI&UX designer</p>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col h-full justify-between">
        <div class="text-[16px] leading-relaxed pr-5">
          <span class="text-accent-red text-[14px] font-normal">Case study</span>
          <p class="mt-[15px]">Here how bobby's start early design system for the app that constantly changes</p>
        </div>
        <div class="text-[16px] leading-relaxed pr-5">
          <p>He's experiencing build a whole user experience of food delivery app, managing the design to dev alignment alone with 2 engineer from rough ideas, ship the product optimize it to have almost 0 fail rate at 200 food delivery attempt</p>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="flex flex-col h-full gap-[15px]">
        <div class="bg-box-grey flex items-center justify-center relative overflow-hidden aspect-square">
          <div class="text-[14px] text-[#444] text-center leading-snug">image<br>placeholder</div>
        </div>
        <div class="bg-box-grey flex items-center justify-center relative overflow-hidden aspect-square">
          <div class="text-[14px] text-[#444] text-center leading-snug">image<br>placeholder</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Bobby Hartanto - Portfolio',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    }
  ]
})
</script>
