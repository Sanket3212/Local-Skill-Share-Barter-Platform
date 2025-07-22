<template>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-6xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Browse Skills
      </h1>
      <p class="text-gray-400 text-center text-lg mb-12">
        Discover talents and services offered by the SkillSwap community.
      </p>

      <div v-if="loading" class="text-center py-10">
        <svg class="animate-spin h-10 w-10 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-white mt-4">Loading skills...</p>
      </div>

      <div v-else-if="errorMsg" class="text-red-400 text-sm text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        {{ errorMsg }}
      </div>

      <div v-else-if="skills.length === 0" class="text-center py-10">
        <p class="text-gray-400 text-xl mb-6">No skills found yet. Be the first to add one!</p>
        <NuxtLink to="/new-listing" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block">
          Offer a Skill
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="skill in skills"
          :key="skill.id"
          class="bg-white/5 p-6 rounded-lg shadow-sm flex flex-col hover:shadow-md hover:shadow-green-500/30 transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold mb-2 text-white">{{ skill.title }}</h2>
          <p class="text-gray-400 text-sm mb-4">{{ skill.category }}</p>
          <p class="text-gray-300 flex-grow mb-4">{{ truncateDescription(skill.description) }}</p>
          <p class="text-teal-400 font-medium mb-4">Looking for: {{ truncateExchangePreference(skill.exchange_preference) }}</p>

          <NuxtLink
            :to="`/skills/${skill.id}`"
            class="mt-auto inline-block bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-500 transition-colors text-center"
          >
            View Details
          </NuxtLink>
        </div>
      </div>

      <div v-if="skills.length > 0" class="text-center mt-12">
        <h2 class="text-3xl font-semibold mb-6 text-white">Can't find what you're looking for?</h2>
        <p class="text-gray-400 text-lg mb-8">Offer your own skill or item and connect with others!</p>
        <NuxtLink to="/new-listing" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block">
          Create a New Listing
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseClient } from '#imports';

const supabase = useSupabaseClient();

const skills = ref([]);
const loading = ref(true);
const errorMsg = ref('');

// Function to fetch skills from Supabase - MODIFIED HERE
const fetchSkills = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const { data, error } = await supabase
      .from('listings') // <--- Changed from 'skills' to 'listings'
      .select('id, title, description, category, exchange_preference, created_at') // <--- Changed 'skill_name' to 'title'
      .eq('type', 'skill') // <--- Added filter for 'skill' type
      .order('created_at', { ascending: false }); // Order by newest first

    if (error) throw error;
    skills.value = data || [];
  } catch (error) {
    console.error('Error fetching skills:', error.message);
    errorMsg.value = 'Failed to load skills: ' + error.message;
  } finally {
    loading.value = false;
  }
};

// Helper function to truncate long descriptions
const truncateDescription = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Helper function to truncate long exchange preferences
const truncateExchangePreference = (text, maxLength = 70) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Fetch skills when the component is mounted
onMounted(() => {
  fetchSkills();
});
</script>

<style scoped>
/* No specific scoped styles needed here, as most are handled by Tailwind or the layout. */
</style>