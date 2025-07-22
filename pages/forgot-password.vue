<template>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Offer a New Skill
      </h1>
      <p class="text-gray-400 text-center mb-8">
        Share your talent with the SkillSwap community.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Skill Name -->
        <div>
          <label for="skillName" class="block text-white text-lg font-semibold mb-2">Skill Name</label>
          <input
            type="text"
            id="skillName"
            v-model="skillListing.skill_name"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Guitar Lessons, Web Development, Yoga Instruction"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-white text-lg font-semibold mb-2">Description</label>
          <textarea
            id="description"
            v-model="skillListing.description"
            rows="5"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
            placeholder="Describe your skill, your experience, and what you can offer..."
            required
          ></textarea>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-white text-lg font-semibold mb-2">Category (Optional)</label>
          <input
            type="text"
            id="category"
            v-model="skillListing.category"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Arts & Crafts, Technology, Health & Wellness, Education"
          />
        </div>

        <!-- Exchange Preference -->
        <div>
          <label for="exchangePreference" class="block text-white text-lg font-semibold mb-2">What are you looking for in exchange?</label>
          <textarea
            id="exchangePreference"
            v-model="skillListing.exchange_preference"
            rows="3"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g., Photography services, Home-cooked meals, Language lessons"
            required
          ></textarea>
        </div>

        <!-- Error Message Display -->
        <div v-if="errorMsg" class="text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          {{ errorMsg }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
          :class="{ 'opacity-70 cursor-not-allowed': loading }"
        >
          <span v-if="!loading">Create Skill Listing</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

const skillListing = ref({
  skill_name: '',
  description: '',
  category: '',
  exchange_preference: '',
  user_id: user.value ? user.value.id : null // Automatically assign current user's ID
});

const loading = ref(false);
const errorMsg = ref('');

const handleSubmit = async () => {
  loading.value = true;
  errorMsg.value = '';

  // Basic client-side validation for required fields
  if (!skillListing.value.skill_name || !skillListing.value.description || !skillListing.value.exchange_preference) {
    errorMsg.value = 'Please fill in all required fields (Skill Name, Description, Exchange Preference).';
    loading.value = false;
    return;
  }

  if (!user.value) {
    errorMsg.value = 'You must be logged in to create a listing.';
    loading.value = false;
    router.push('/login'); // Redirect to login if not authenticated
    return;
  }

  try {
    const { data, error } = await supabase
      .from('skills') // Targeting the 'public.skills' table
      .insert([
        {
          user_id: skillListing.value.user_id,
          skill_name: skillListing.value.skill_name,
          description: skillListing.value.description,
          category: skillListing.value.category,
          exchange_preference: skillListing.value.exchange_preference,
          // 'status' and 'created_at', 'updated_at' have defaults in the SQL, so no need to explicitly set them here
        }
      ]);

    if (error) throw error;

    alert('Skill listing created successfully!');
    router.push('/browse-skills'); // Redirect to browse skills page after successful creation
    // Optionally reset form:
    // skillListing.value = {
    //   skill_name: '', description: '', category: '', exchange_preference: '', user_id: user.value.id
    // };

  } catch (error) {
    console.error('Error creating skill listing:', error.message);
    errorMsg.value = 'Failed to create skill listing: ' + error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles specific to this component, if any.
   Most styling should come from Tailwind utility classes or global styles/layouts. */
</style>