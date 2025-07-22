<template>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        About SkillSwap
      </h1>
      <p class="text-gray-400 text-center text-lg mb-12">
        Our mission is to build stronger communities through skill and item exchange.
      </p>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6 text-white text-center">Our Story</h2>
        <p class="text-gray-300 leading-relaxed text-lg mb-4">
          Born out of a desire to foster genuine connections and promote sustainable living in India, SkillSwap was founded on the simple yet powerful idea that not everything needs a price tag. We believe in the inherent value of human skills and the potential of unused items.
        </p>
        <p class="text-gray-300 leading-relaxed text-lg">
          In a world increasingly driven by monetary transactions, we aim to revive the age-old practice of bartering, making it accessible, safe, and enjoyable for everyone. We envision a future where communities thrive on shared talents and resources, reducing waste and building a more resilient local economy.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-8 text-white text-center">Our Principles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div class="flex flex-col items-center text-center p-6 bg-white/5 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="bg-green-600 p-3 rounded-full text-white mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Mission</h3>
            <p class="text-gray-300">To empower individuals and strengthen communities across India by facilitating easy, secure, and cash-free exchange of skills and items.</p>
          </div>

          <div class="flex flex-col items-center text-center p-6 bg-white/5 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="bg-green-600 p-3 rounded-full text-white mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Vision</h3>
            <p class="text-gray-300">A world where every skill finds its purpose and every item finds its home, fostering a resilient, sharing economy in every neighborhood.</p>
          </div>

          <div class="flex flex-col items-center text-center p-6 bg-white/5 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="bg-green-600 p-3 rounded-full text-white mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Values</h3>
            <p class="text-gray-300">Community, Sustainability, Trust, Innovation, and Accessibility are the core values guiding every decision we make at SkillSwap.</p>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-8 text-white text-center">Meet the Team</h2>
        <div class="text-center text-gray-400 text-lg">
          <p class="mb-4">We are a passionate group of developers, designers, and community enthusiasts dedicated to making SkillSwap a success.</p>
          <p>More details about our team members coming soon!</p>
        </div>
        </section>

      <section class="text-center">
        <h2 class="text-3xl font-semibold mb-6 text-white">Ready to join our mission?</h2>
        <NuxtLink to="/register" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block">
          Become a Swapper!
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup>
// No specific script logic is needed for this static informational page.
// The page will automatically use the 'default' layout.
</script>

<style scoped>
/* Scoped styles specific to this component, if any. */
</style>