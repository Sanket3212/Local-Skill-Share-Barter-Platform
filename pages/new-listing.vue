<template>
     <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg">
      <h1
        class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Create New Listing
      </h1>
      <p class="text-gray-400 text-center mb-8">
        Offer a skill or an item to the SkillSwap community.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="listingType" class="block text-white text-lg font-semibold mb-2">What are you offering?</label>
          <select id="listingType" v-model="listing.type"
            class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required>
            <option value="" disabled>Select type</option>
            <option value="skill">Skill</option>
            <option value="item">Item</option>
          </select>
        </div>

        <div>
          <label for="title" class="block text-white text-lg font-semibold mb-2">Title</label>
          <input type="text" id="title" v-model="listing.title"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Learn Basic Guitar, Gently Used Books" required />
        </div>

        <div>
          <label for="description" class="block text-white text-lg font-semibold mb-2">Description</label>
          <textarea id="description" v-model="listing.description" rows="5"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
            placeholder="Provide details about your skill or item..." required></textarea>
        </div>

        <div>
          <label for="category" class="block text-white text-lg font-semibold mb-2">Category</label>
          <input type="text" id="category" v-model="listing.category"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Music, Books, Tutoring, Crafts" />
        </div>

        <div>
          <label for="location" class="block text-white text-lg font-semibold mb-2">Location (Optional)</label>
          <input type="text" id="location" v-model="listing.location"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Mumbai, Delhi, Your Locality" />
        </div>

        <div>
          <label for="swapPreference" class="block text-white text-lg font-semibold mb-2">What are you looking for in
            return?</label>
          <textarea id="swapPreference" v-model="listing.swapPreference" rows="3"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g., Cooking lessons, Old electronics, Gardening tools, Art supplies"></textarea>
        </div>

        <div v-if="errorMsg"
          class="text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          {{ errorMsg }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
          :class="{ 'opacity-70 cursor-not-allowed': loading }">
          <span v-if="!loading">Create Listing</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Creating...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const listing = ref({
  type: '',
  title: '',
  description: '',
  category: '',
  location: '',
  swapPreference: '',
});

const loading = ref(false);
const errorMsg = ref('');

const handleSubmit = async () => {
  loading.value = true;
  errorMsg.value = '';

  // --- ADD THIS CONSOLE LOG ---
  console.log('User object on submission:', user.value);
  console.log('User ID on submission:', user.value?.id);
  // --- END CONSOLE LOG ---

  if (!user.value) {
    errorMsg.value = 'You must be logged in to create a listing.';
    loading.value = false;
    router.push('/login');
    return;
  }

  // ... (rest of your handleSubmit function)
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([
        {
          type: listing.value.type,
          title: listing.value.title,
          description: listing.value.description,
          category: listing.value.category,
          location: listing.value.location,
          exchange_preference: listing.value.swapPreference,
          user_id: user.value.id, // This is the line we're focusing on
        }
      ]);

    if (error) throw error;

    alert('Listing created successfully!');
    if (listing.value.type === 'skill') {
      router.push('/browse-skills');
    } else {
      router.push('/browse-items');
    }

  } catch (error) {
    console.error('Error creating listing:', error.message);
    errorMsg.value = 'Failed to create listing: ' + error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles specific to this component, if any.
   Most styling should come from Tailwind utility classes or global styles/layouts. */
</style>