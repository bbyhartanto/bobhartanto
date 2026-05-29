<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#fafafa]">
    <div>
      <HeaderParent />
      <main>
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
