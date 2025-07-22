<template>
   <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        How SkillSwap Works
      </h1>
      <p class="text-gray-400 text-center text-lg mb-12">
        Connecting communities through skill and item exchange, without needing money.
      </p>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6 text-white text-center">What is SkillSwap?</h2>
        <p class="text-gray-300 leading-relaxed text-lg mb-4">
          SkillSwap is a community-driven platform in India where you can exchange your skills and unused items directly with others, without the use of money. It's a modern take on bartering, designed to build stronger local connections and promote sustainable living.
        </p>
        <p class="text-gray-300 leading-relaxed text-lg">
          Whether you're looking for someone to teach you guitar in exchange for a home-cooked meal, or you have old books you'd like to swap for gardening tools, SkillSwap makes it simple and secure.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-8 text-white text-center">Our Simple Process</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          <div class="flex items-start bg-white/5 p-6 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="flex-shrink-0 bg-green-600 p-3 rounded-full text-white mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3M10 21v-5a2 2 0 012-2h2a2 2 0 012 2v5m-10 0h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-white">1. Join Our Community</h3>
              <p class="text-gray-300">Sign up for a free account. It's quick, easy, and your gateway to a world of exchange possibilities.</p>
              <NuxtLink to="/register" class="text-teal-400 hover:text-green-300 transition-colors duration-200 text-sm mt-2 inline-block">
                Join Now &rarr;
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start bg-white/5 p-6 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="flex-shrink-0 bg-green-600 p-3 rounded-full text-white mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13.438m0-13.438c-3.118-.035-5.918-.687-8-3.5L4 4.5m8 1.753c3.118-.035 5.918-.687 8-3.5l-.01 16.938m-8-13.438h.01M12 6.253v13.438"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-white">2. Offer a Skill or Item</h3>
              <p class="text-gray-300">Got a talent? An unused item? Create a detailed listing. Specify what you offer and what you're looking for in return.</p>
              <NuxtLink to="/new-listing" class="text-teal-400 hover:text-green-300 transition-colors duration-200 text-sm mt-2 inline-block">
                List Your Swap &rarr;
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start bg-white/5 p-6 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="flex-shrink-0 bg-green-600 p-3 rounded-full text-white mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-white">3. Find Your Match</h3>
              <p class="text-gray-300">Browse listings from others in your community. Use filters to find skills or items that match your needs.</p>
              <NuxtLink to="/browse-skills" class="text-teal-400 hover:text-green-300 transition-colors duration-200 text-sm mt-2 inline-block">
                Start Browse &rarr;
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start bg-white/5 p-6 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-500/30 transition-all duration-300">
            <div class="flex-shrink-0 bg-green-600 p-3 rounded-full text-white mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-white">4. Exchange and Enjoy!</h3>
              <p class="text-gray-300">Connect securely, arrange your swap, and enjoy the benefits of a cash-free economy and new community bonds.</p>
              <NuxtLink to="/contact" class="text-teal-400 hover:text-green-300 transition-colors duration-200 text-sm mt-2 inline-block">
                Contact Us &rarr;
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-8 text-white text-center">Benefits of SkillSwap</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-3 text-lg px-4 md:px-8">
          <li>
            <span class="font-semibold text-white">Cash-Free Living:</span> Access services and goods without spending money, promoting a true bartering system.
          </li>
          <li>
            <span class="font-semibold text-white">Community Building:</span> Connect with talented individuals and neighbors in your local area, strengthening social bonds.
          </li>
          <li>
            <span class="font-semibold text-white">Sustainable Practices:</span> Reduce waste by giving new life to unused items and sharing knowledge rather than consuming more.
          </li>
          <li>
            <span class="font-semibold text-white">Learn & Grow:</span> Discover new skills or teach what you know, fostering personal development within the community.
          </li>
          <li>
            <span class="font-semibold text-white">Economic Empowerment:</span> Utilize untapped skills and resources, creating value outside traditional monetary systems.
          </li>
        </ul>
      </section>

      <section class="text-center">
        <h2 class="text-3xl font-semibold mb-6 text-white">Ready to start swapping?</h2>
        <NuxtLink to="/register" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block">
          Join SkillSwap Today!
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