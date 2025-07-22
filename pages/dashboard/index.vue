<!-- <script setup>
// Use Nuxt's built-in composable for meta tags
useHead({
  title: 'SkillSwap - Your Local Skill & Barter Community | Ahmadnagar, MH',
  meta: [
    { name: 'description', content: 'Connect with your community in Ahmadnagar, Maharashtra to share skills, trade items, and help each other out. Barter, learn, and grow locally.' },
    // Add more meta tags for SEO if needed
  ],
});

// --- Fetch Featured Listings ---
// Replace with your actual backend URL if different
const { data: featuredListings, pending, error } = useFetch('/api/listings/featured', {
  lazy: true, // Only fetch data when component is mounted, better for initial page load
  server: true, // Fetch data on server-side during SSR, then hydrate on client
});

// Dummy data for featured listings if API is not yet ready or for testing
// You can remove this once your API is functional
const dummyListings = [
  {
    id: 'skl1',
    type: 'skill',
    title: 'Gardening Help Offered',
    category: 'Home & Garden',
    location: 'Supa, Ahmadnagar',
    description: 'Experienced gardener offering help with planting, pruning, and garden design for small plots.',
    imageUrl: '/images/listing-gardening.jpg',
  },
  {
    id: 'itm1',
    type: 'item',
    title: 'Old Bicycle for Trade',
    category: 'Sports & Outdoors',
    location: 'Market Yard, Ahmadnagar',
    description: 'Well-maintained single-speed bicycle, looking for guitar lessons or a carpentry tool set.',
    imageUrl: '/images/listing-bicycle.jpg',
  },
  {
    id: 'skl2',
    type: 'skill',
    title: 'Basic Web Dev Tutoring (HTML/CSS)',
    category: 'Tutoring & Education',
    location: 'Savedi Road, Ahmadnagar',
    description: 'Offering beginner lessons in HTML/CSS for help with home repairs or baking services.',
    imageUrl: '/images/listing-webdev.jpg',
  },
  {
    id: 'itm2',
    type: 'item',
    title: 'Collection of Marathi Novels',
    category: 'Books & Literature',
    location: 'Tophkhana, Ahmadnagar',
    description: 'A collection of classic Marathi novels, open to trade for art supplies or cooking lessons.',
    imageUrl: '/images/listing-marathi-books.jpg',
  },
];

// Determine which listings to show (real or dummy)
const listingsToShow = featuredListings.value || dummyListings;


// --- Navigation Functions ---
const goToRegister = () => {
  navigateTo('/register');
};

const goToExplore = () => {
  navigateTo('/browse'); // You might want to navigate to /browse-skills or /browse-items
};

</script>

<template>
  <div class="font-sans antialiased text-neutral-dark bg-white">
    <main>
      <section class="bg-gradient-to-r from-primary to-blue-700 text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div class="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
          <div class="hero-content text-center md:text-left md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Unlock Your Community's Potential. <br> Share. Barter. Connect.
            </h1>
            <p class="text-lg md:text-xl mb-8 opacity-90">
              Exchange skills, trade items, and build stronger local connections in Ahmadnagar without cash.
            </p>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
              <button @click="goToRegister" class="px-8 py-4 rounded-lg font-bold bg-secondary text-white hover:bg-secondary-dark shadow-xl text-lg transition-all duration-200">
                Start Bartering Today!
              </button>
              <button @click="goToExplore" class="px-8 py-4 rounded-lg font-bold bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl text-lg transition-all duration-200">
                Explore Listings
              </button>
            </div>
          </div>
          <div class="hero-image md:w-1/2 flex justify-center items-center">
            <img src="/images/hero-community-share.svg" alt="People exchanging skills and items" class="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg w-full h-auto drop-shadow-2xl">
          </div>
        </div>
      </section>

      <section id="how-it-works" class="py-16 px-4 md:px-8 bg-white">
        <div class="container mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-primary">How SkillSwap Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div class="flex flex-col items-center p-6 bg-neutral-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/icon-register.svg" alt="Register Icon" class="w-16 h-16 mb-4">
              <h3 class="text-xl font-semibold mb-2 text-primary">1. Join the Community</h3>
              <p class="text-neutral-dark">Create your free profile in minutes and tell us what you can offer and what you need.</p>
            </div>
            <div class="flex flex-col items-center p-6 bg-neutral-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/icon-list.svg" alt="List Icon" class="w-16 h-16 mb-4">
              <h3 class="text-xl font-semibold mb-2 text-primary">2. List Your Skills or Items</h3>
              <p class="text-neutral-dark">Share your unique talents or items you're willing to trade. Be specific!</p>
            </div>
            <div class="flex flex-col items-center p-6 bg-neutral-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/icon-connect.svg" alt="Connect Icon" class="w-16 h-16 mb-4">
              <h3 class="text-xl font-semibold mb-2 text-primary">3. Discover & Connect</h3>
              <p class="text-neutral-dark">Browse local listings, find matches, and message directly within the platform.</p>
            </div>
            <div class="flex flex-col items-center p-6 bg-neutral-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/icon-exchange.svg" alt="Exchange Icon" class="w-16 h-16 mb-4">
              <h3 class="text-xl font-semibold mb-2 text-primary">4. Barter & Thrive!</h3>
              <p class="text-neutral-dark">Arrange your exchange and help build a stronger, more sustainable local network in Ahmadnagar.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 px-4 md:px-8 bg-neutral-light">
        <div class="container mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-primary">Featured Skills & Items in Ahmadnagar</h2>

          <div v-if="pending" class="text-center text-primary text-lg">Loading featured listings...</div>
          <div v-else-if="error" class="text-center text-red-600 text-lg">
            Error loading listings. Displaying dummy data.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div v-for="listing in listingsToShow" :key="listing.id" class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img :src="listing.imageUrl" :alt="listing.title" class="w-full h-48 object-cover">
              <div class="p-6 text-left">
                <span class="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 block">{{ listing.type }}: {{ listing.category }}</span>
                <h3 class="text-xl font-bold text-neutral-dark mb-2">{{ listing.title }}</h3>
                <p class="text-neutral-medium text-sm mb-3"><i class="fas fa-map-marker-alt mr-1 text-accent"></i>{{ listing.location }}</p>
                <p class="text-neutral-dark text-base mb-4 line-clamp-2">{{ listing.description }}</p>
                <NuxtLink :to="`/listing/${listing.id}`" class="px-4 py-2 rounded-md font-semibold bg-primary text-white hover:bg-primary-dark transition-all duration-200 text-center block">View Details</NuxtLink>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <button @click="goToExplore" class="px-8 py-4 rounded-lg font-bold bg-secondary text-white hover:bg-secondary-dark shadow-lg text-lg transition-all duration-200">View All Listings</button>
          </div>
        </div>
      </section>

      <section class="py-16 px-4 md:px-8 bg-white">
        <div class="container mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-primary">What Our Community in Ahmadnagar Says</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-neutral-light p-8 rounded-lg shadow-md">
              <p class="text-lg italic text-neutral-dark mb-6">"SkillSwap helped me find someone to fix my leaky faucet in exchange for baking a cake! So convenient and neighborly in Ahmadnagar."</p>
              <p class="font-semibold text-primary">- Priya S. (Pune)</p>
            </div>
            <div class="bg-neutral-light p-8 rounded-lg shadow-md">
              <p class="text-lg italic text-neutral-dark mb-6">"I traded my old bicycle for guitar lessons. Best exchange ever! Highly recommend this platform for local bartering."</p>
              <p class="font-semibold text-primary">- Rohan K. (Ahmadnagar)</p>
            </div>
            <div class="bg-neutral-light p-8 rounded-lg shadow-md">
              <p class="text-lg italic text-neutral-dark mb-6">"Finally, a way to declutter and get help with odd jobs without spending cash. SkillSwap is a game-changer for our area!"</p>
              <p class="font-semibold text-primary">- Smita P. (Rahuri)</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-primary text-white py-20 px-4 md:px-8 text-center">
        <div class="container mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 drop-shadow">Ready to Start Sharing & Bartering?</h2>
          <p class="text-xl md:text-2xl mb-10 opacity-90">Join SkillSwap today and discover the amazing resources and talents right in your neighborhood in Ahmadnagar!</p>
          <button @click="goToRegister" class="px-10 py-4 rounded-lg font-bold bg-secondary text-white hover:bg-secondary-dark shadow-xl text-xl transition-all duration-200">Get Started Now</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* These scoped styles are minimal now, as most styling is handled by Tailwind.
   Only specific overrides or complex non-utility styles should go here. */

.container {
  max-width: 1200px;
}

/* Common utility for text truncation (if not handled by Tailwind line-clamp plugin) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> -->

<template>
  hither
</template>