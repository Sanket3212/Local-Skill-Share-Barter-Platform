<template>
  <footer class="bg-black/30 backdrop-blur-xl text-white py-10 px-4 md:px-8 transition-colors duration-300 mt-auto">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
      <div>
        <h3 class="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">SkillSwap</h3>
        <p class="text-gray-400 text-sm">Connecting communities through skills and sustainable exchange.</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Quick Links</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/about-us" class="text-white hover:text-teal-400 transition-colors duration-300">About Us</NuxtLink></li>
          <li><NuxtLink to="/how-it-works" class="text-white hover:text-teal-400 transition-colors duration-300">How It Works</NuxtLink></li>
          <li><NuxtLink to="/faq" class="text-white hover:text-teal-400 transition-colors duration-300">FAQ</NuxtLink></li>
          <li><NuxtLink to="/privacy-policy" class="text-white hover:text-teal-400 transition-colors duration-300">Privacy Policy</NuxtLink></li>
          <li><NuxtLink to="/terms-of-service" class="text-white hover:text-teal-400 transition-colors duration-300">Terms of Service</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Browse</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/browse-skills" class="text-white hover:text-teal-400 transition-colors duration-300">Skills</NuxtLink></li>
          <li><NuxtLink to="/browse-items" class="text-white hover:text-teal-400 transition-colors duration-300">Items</NuxtLink></li>
          <li><NuxtLink to="/new-listing" class="text-white hover:text-teal-400 transition-colors duration-300">Add a Listing</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/contact" class="text-white hover:text-teal-400 transition-colors duration-300">Contact Us</NuxtLink></li>
          <li class="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="https://www.facebook.com/SkillSwapIndia" target="_blank" aria-label="Facebook" class="text-white hover:text-teal-400 transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.01 3.657 9.177 8.441 9.873V15.4h-2.34V12h2.34V9.333c0-2.308 1.408-3.568 3.464-3.568 1.015 0 1.889.075 2.144.109v2.44h-1.444c-1.135 0-1.353.538-1.353 1.325V12h2.787l-.448 3.4h-2.339v6.473C18.343 21.177 22 17.01 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Facebook
            </a>
            <a href="https://twitter.com/SkillSwapIndia" target="_blank" aria-label="Twitter (X)" class="text-white hover:text-teal-400 transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
                <path d="M18.901 1.153a11.109 11.109 0 01-3.237.935A5.673 5.073 0 0014 3.784c0 3.33-2.67 6.035-6 6.035A5.67 5.67 0 015.435 9.14l-1.637-.215A11.106 11.106 0 0012 19c6.627 0 12-5.373 12-12 0-.256-.01-.51-.028-.763l-.004-.07a8.553 8.553 0 002.1-2.137l-.025-.03c-.632.28-1.3.468-2.02.553a4.01 4.01 0 001.765-1.921c-.694.412-1.46.708-2.298.868A4.01 4.01 0 0018.9 1.153z"/>
              </svg>
              Twitter
            </a>
            <a href="https://www.instagram.com/skillswap_india/" target="_blank" aria-label="Instagram" class="text-white hover:text-teal-400 transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
                <path fill-rule="evenodd" d="M12 0C8.74 0 8.333.012 7.053.07C5.996.118 5.253.248 4.63.49C4.007.731 3.492.983 2.96 1.516A4.956 4.956 0 001.516 2.96C.983 3.492.731 4.007.49 4.63c-.242.623-.372 1.366-.42 2.423C.012 8.333 0 8.74 0 12s.012 3.667.07 4.947c.048 1.057.178 1.8.42 2.423.241.623.493 1.138 1.026 1.671a4.956 4.956 0 001.671 1.026c.623.242 1.366.372 2.423.42C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.07c1.057-.048 1.8-.178 2.423-.42.623-.241 1.138-.493 1.671-1.026a4.956 4.956 0 001.026-1.671c.242-.623.372-1.366.42-2.423.058-1.3.07-1.707.07-4.947s-.012-3.667-.07-4.947c-.048-1.057-.178-1.8-.42-2.423a4.956 4.956 0 00-1.026-1.671A4.956 4.956 0 0019.51 1.516c-.623-.242-1.366-.372-2.423-.42C15.667.012 15.26 0 12 0zm0 2.16c3.2 0 3.58.012 4.85.07c1.02.047 1.485.198 1.81.332.335.13.56.248.82.507.26.26.378.485.508.82.134.325.285.79.333 1.81.058 1.27.07 1.65.07 4.85s-.012 3.58-.07 4.85c-.047 1.02-.198 1.485-.332 1.81-.13.335-.248.56-.507.82-.26.26-.485.378-.508.82-.134.325-.285.79-.333 1.81-.058 1.27-.07 1.65-.07 4.85zM12 6.865c-2.83 0-5.135 2.305-5.135 5.135s2.305 5.135 5.135 5.135 5.135-2.305 5.135-5.135-2.305-5.135-5.135-5.135zM12 17.5c-3.047 0-5.5-2.453-5.5-5.5S8.953 6.5 12 6.5s5.5 2.453 5.5 5.5-2.453 5.5-5.5 5.5zM17.5 5.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clip-rule="evenodd"/>
              </svg>
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-sm">
      <p>&copy; {{ new Date().getFullYear() }} SkillSwap. All rights reserved.</p>
      <p class="mt-1">Built with community spirit across India.</p>
    </div>
  </footer>
</template>

<script setup>
// No specific script logic needed for the footer itself, aside from NuxtLink.
</script>

<style scoped>
/* Scoped styles specific to the footer if needed */
.container {
  max-width: 1200px; /* Consistent with other containers */
}
</style>