<template>
  <div class="max-w-[1200px] min-[1500px]:max-w-[1400px] mx-auto px-5 pt-10 pb-[100px]">
    <header class="flex justify-between text-sm mb-[60px] font-normal">
      <span>Indonesia</span>
      <a href="mailto:hello@bobhartanto.com" class="text-[#1A1A1A] no-underline">hello@bobhartanto.com</a>
    </header>

    <section class="mb-[50px]">
      <h1 class="text-[110px] font-medium tracking-tight m-0 leading-none">BOBBY HARTANTO</h1>
      <p class="text-[22px] m-0 font-light text-[#333]">A No fancy lead UI&UX Designer</p>
    </section>

    <!-- Top Grid Section -->
    <section class="grid grid-cols-3 gap-[30px] mb-[60px]">
      <!-- Row 1 -->
      <div class="bg-box-grey flex items-center justify-center relative overflow-hidden aspect-[4/3]">
        <div class="flex flex-col items-center">
          <div class="w-[90px] h-[90px] border border-[#444] rounded-full relative bg-[url('/images-/Fig-3.png')] bg-contain bg-no-repeat bg-center"></div>

        </div>
      </div>
      <div class="col-span-2 flex items-center pl-[30px]">
        <h2 class="text-[40px] font-normal leading-[1.15] m-0 max-w-[95%]">Bobby Hartanto is an Indonesian based product designer with over 8+ years experience in designing intuitive and useful digital products.</h2>
      </div>

      <!-- Row 2 -->
      <div class="text-[16px] leading-relaxed pt-5 pr-[30px]">
        <span class="text-accent-red text-[14px] font-normal">Case study</span>
        <p class="mt-[15px]">bobby’s experience spans agencies, corporate enterprises, startups, and global consultancies, culminating in a highly adaptable approach to design and problem solving.</p>
      </div>
      <div class=" flex items-center justify-center relative overflow-hidden aspect-[4/3] bg-[url('/images-/Fig-3.png')] bg-contain bg-no-repeat bg-center">
      </div>
      <div class="flex items-center justify-center w-full">
        <a href="#" class="text-[16px] leading-relaxed no-underline text-inherit block text-center">
          <img src="/images-/file-icon.png" alt="file icon" class="mb-2 mx-auto" />
          <p>Bobby-hartanto.cv</p>
        </a>
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
    <!-- bublibu section -->
     <section class="grid grid-cols-3 gap-[30px]">
      <!-- Merged Column 1 & 2 -->
      <div class="col-span-2">
        <div class="flex flex-col h-full">
          <div class="flex items-start justify-start relative pr-10">
            <img src="/images-/bublibuu.png" alt="bublibu image" class="w-full h-auto" />
          </div>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="flex flex-col h-full gap-[30px]">
        <div class="flex items-center justify-center relative overflow-hidden aspect-square bg-[url('/images-/tangga.svg')] bg-[length:95%] bg-no-repeat bg-center">
        </div>
      </div>
    </section>
  

    <!-- Bottom Grid Section -->
    <section class="grid grid-cols-3 gap-[30px] mt-20">
      <!-- Column 1 -->
      <div class="flex flex-col h-full mt-60">
     
        <div class="shadow-xl/30 rounded-[10px]">
          <div class="flex-col items-start justify-start relative overflow-hidden aspect-[4/3] rounded-[10px]" style="background-color: #181818" >
            <img src="/images-/closing-button.png" alt="Vue.js" class="p-1" />
            <video src="/videos/npm-run-build.mp4" autoplay loop muted playsinline class="w-full h-full object-cover object-left"></video>
          </div>
        </div> 
        
        <div class="flex items-center gap-10 mb-4 pt-15">
          <img src="/images-/Laravel.svg" alt="Laravel" class="h-[60px] w-auto" />
          <img src="/images-/vue-js.svg" alt="Vue.js" class="h-[60px] w-auto" />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col h-full justify-between">
        <div class="text-[16px] leading-relaxed pr-5">
          <span class="text-accent-red text-[14px] font-normal">Case study</span>
          <p class="mt-[15px]">At Paton.dev, he designed (bublibu) a food delivery app that delivered the same user experience as Gofood or GrabFood without the fleet. built on third-party courier APIs to match the experience at a fraction of their operating cost.</p>
        </div>
        <div class="text-[16px] leading-relaxed pr-5">
          <p>He's experiencing build a whole user experience of food delivery app, managing the design to dev alignment alone with 2 engineer from rough ideas, ship the product optimize it to have almost 0 fail rate at 200 food delivery attempt</p>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="flex flex-col h-full gap-[30px]">
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
