<template>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">

      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Skill Details
      </h1>

      <div v-if="loading" class="text-center py-10">
        <svg class="animate-spin h-10 w-10 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-white mt-4">Loading skill details...</p>
      </div>

      <div v-else-if="errorMsg" class="text-red-400 text-sm text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        {{ errorMsg }}
        <p v-if="errorMsg.includes('not found') || errorMsg.includes('invalid ID')" class="mt-2">
          <NuxtLink to="/browse-skills" class="text-blue-400 hover:underline">Browse other skills</NuxtLink>
        </p>
      </div>

      <div v-else-if="skill" class="space-y-6">
        <h2 class="text-3xl font-bold text-white mb-4 text-center md:text-left">{{ skill.title }}</h2>
        <div class="bg-white/5 p-6 rounded-lg shadow-md space-y-4">
          <dl>
            <div class="flex flex-col md:flex-row md:items-baseline">
              <dt class="font-semibold text-white mr-2 min-w-[100px]">Description:</dt>
              <dd class="text-lg text-gray-300 flex-grow">{{ skill.description }}</dd>
            </div>
            <div class="flex flex-col md:flex-row md:items-baseline">
              <dt class="font-semibold text-white mr-2 min-w-[100px]">Category:</dt>
              <dd class="text-lg text-gray-300 flex-grow">{{ skill.category || 'N/A' }}</dd>
            </div>
            <div class="flex flex-col md:flex-row md:items-baseline">
              <dt class="font-semibold text-white mr-2 min-w-[100px]">Looking for:</dt>
              <dd class="text-lg text-teal-400 font-medium flex-grow">{{ skill.exchange_preference }}</dd>
            </div>
            <div class="flex flex-col md:flex-row md:items-baseline">
              <dt class="font-semibold text-white mr-2 min-w-[100px]">Location:</dt>
              <dd class="text-lg text-gray-300 flex-grow">{{ skill.location || 'N/A' }}</dd>
            </div>
            <div class="flex flex-col md:flex-row md:items-baseline">
              <dt class="font-semibold text-white mr-2 min-w-[100px]">Listed by:</dt>
              <dd class="text-lg flex-grow">
                <span v-if="listerUsername" class="text-teal-400">{{ listerUsername }}</span>
                <span v-else>Unknown User</span>
                <span class="text-gray-500 text-sm ml-2">(Listed: {{ format(new Date(skill.created_at), 'MMM dd, yyyy') }})</span>
              </dd>
            </div>
          </dl>
        </div>

        <div class="flex justify-center mt-8">
          <button
            v-if="user && skill && user.id !== listerUserId"
            @click="contactLister"
            class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block"
          >
            Contact Lister
          </button>
          <NuxtLink v-else-if="!user" to="/login" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 hover:shadow-green-500/30 shadow-2xl transition-all duration-300 inline-block">
            Login to Contact
          </NuxtLink>
          <span v-else-if="skill && user && user.id === listerUserId" class="text-gray-400 text-lg">This is your listing.</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { format } from 'date-fns';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const skill = ref(null);
const listerUsername = ref(''); // Changed from 'Loading...' to an empty string
const loading = ref(true);
const errorMsg = ref('');
const listerUserId = ref(null);

const listingType = 'skill';

// Function to fetch listing details
const fetchSkillDetails = async () => {
  loading.value = true;
  errorMsg.value = '';
  skill.value = null;
  listerUsername.value = ''; // Reset lister username
  listerUserId.value = null;

  const skillId = route.params.id;

  console.log(`DEBUG: Fetching details for ${listingType} with ID: ${skillId}`);

  if (!skillId) {
    errorMsg.value = `Invalid ${listingType} ID provided.`;
    loading.value = false;
    return;
  }

  try {
    const { data: fetchedData, error: fetchError } = await supabase
      .from('listings')
      .select('*')
      .eq('id', skillId)
      .eq('type', listingType)
      .single();

    console.log('DEBUG: Supabase fetch result:', { fetchedData, fetchError });

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        errorMsg.value = `${listingType.charAt(0).toUpperCase() + listingType.slice(1)} not found or invalid ID.`;
      } else {
        throw fetchError;
      }
      return;
    }

    if (!fetchedData) {
      errorMsg.value = `${listingType.charAt(0).toUpperCase() + listingType.slice(1)} not found.`;
      return;
    }

    skill.value = fetchedData;
    listerUserId.value = fetchedData.user_id;

    // Fetch lister's username
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', fetchedData.user_id)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.warn('DEBUG: Could not fetch lister username:', userError.message);
      listerUsername.value = 'User Profile Not Found';
    } else if (userData) {
      listerUsername.value = userData.username;
    } else {
      listerUsername.value = 'Unknown User';
    }

  } catch (error) {
    console.error('DEBUG: Error fetching listing details:', error);
    errorMsg.value = `Failed to load ${listingType} details: ` + error.message;
  } finally {
    loading.value = false;
  }
};

// Function to handle contacting the lister
const contactLister = async () => {
  console.log('--- Initiating contactLister debug ---');
  console.log('Current logged-in user (user.value):', user.value ? user.value.id : 'NOT LOGGED IN');
  console.log('Lister User ID (listerUserId.value):', listerUserId.value);
  console.log('Current Listing ID (skill.value.id):', skill.value?.id);

  errorMsg.value = ''; // Clear previous error messages for contact action

  if (!user.value) {
    errorMsg.value = 'You must be logged in to send messages.';
    console.error('DEBUG: User not logged in, redirecting.');
    router.push('/login');
    return;
  }
  if (!listerUserId.value || !skill.value) {
    errorMsg.value = 'Cannot contact lister: Information missing.';
    console.error('DEBUG: Lister ID or skill data missing for contact.');
    return;
  }
  if (listerUserId.value === user.value.id) {
    errorMsg.value = 'You cannot message yourself about your own listing.';
    console.warn('DEBUG: Attempted to message self.');
    router.push('/messages'); // Redirect to their own messages page
    return;
  }

  const participant1 = user.value.id;
  const participant2 = listerUserId.value;
  const currentListingId = skill.value.id;

  console.log(`DEBUG: Searching for conversation between ${participant1} and ${participant2} about listing ${currentListingId}`);

  try {
    const { data: existingConversation, error: convError } = await supabase
      .from('messages')
      .select('conversation_id')
      .or(`and(sender_id.eq.${participant1},receiver_id.eq.${participant2}),and(sender_id.eq.${participant2},receiver_id.eq.${participant1})`)
      .eq('listing_id', currentListingId)
      .limit(1)
      .single();

    console.log('DEBUG: Supabase query result for existing conversation:', { existingConversation, convError });

    if (convError && convError.code !== 'PGRST116') {
      console.error('DEBUG: Supabase conversation query failed (not PGRST116):', convError);
      throw convError;
    }

    let targetConversationId;

    if (existingConversation) {
      targetConversationId = existingConversation.conversation_id;
      console.log('DEBUG: Found existing conversation:', targetConversationId);
      router.push(`/messages/${targetConversationId}`);
    } else {
      targetConversationId = crypto.randomUUID();
      console.log('DEBUG: No existing conversation, generating new ID:', targetConversationId);
      console.log('DEBUG: Passing recipientId and listingId in query params for new conversation.');

      router.push({
        path: `/messages/${targetConversationId}`,
        query: {
          recipientId: participant2,
          listingId: currentListingId
        }
      });
    }

  } catch (error) {
    console.error('DEBUG: Error in contactLister try-catch block:', error);
    errorMsg.value = 'Failed to start conversation. Please try again. Check console for details.';
  }
};

onMounted(() => {
  fetchSkillDetails();
});

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    fetchSkillDetails();
  }
});
</script>

<style scoped>
/* Scoped styles here if needed, but Tailwind handles most. */
</style>