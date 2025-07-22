<template>
  <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Edit Your Profile
      </h1>
      <p class="text-gray-400 text-center text-lg mb-8">
        Update your personal details and location information.
      </p>

      <div v-if="loadingProfile" class="text-center py-10">
        <svg class="animate-spin h-10 w-10 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-white mt-4">Loading profile data...</p>
      </div>

      <div v-else-if="fetchErrorMsg" class="text-red-400 text-sm text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        {{ fetchErrorMsg }}
        <p class="mt-2">Please try again later or <NuxtLink to="/profile" class="text-blue-400 hover:underline">go back to your dashboard</NuxtLink>.</p>
      </div>

      <form v-else @submit.prevent="updateProfile" class="space-y-6">
        <div>
          <label for="userId" class="block text-white text-lg font-semibold mb-2">User ID</label>
          <input
            type="text"
            id="userId"
            :value="profileForm.id"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
            readonly
          />
        </div>

        <div>
          <label for="username" class="block text-white text-lg font-semibold mb-2">Username</label>
          <input
            type="text"
            id="username"
            v-model="profileForm.username"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-white text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            :value="profileForm.email"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
            readonly
          />
          <p class="text-gray-500 text-sm mt-1">Email changes must be done through Supabase authentication settings.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="locationAddress" class="block text-white text-lg font-semibold mb-2">Address</label>
            <input
              type="text"
              id="locationAddress"
              v-model="profileForm.location_address"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Street Address"
              required
            />
          </div>
          <div>
            <label for="locationCity" class="block text-white text-lg font-semibold mb-2">City</label>
            <input
              type="text"
              id="locationCity"
              v-model="profileForm.location_city"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="e.g., Mumbai"
              required
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="locationState" class="block text-white text-lg font-semibold mb-2">State</label>
            <input
              type="text"
              id="locationState"
              v-model="profileForm.location_state"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="e.g., Maharashtra"
              required
            />
          </div>
          <div>
            <label for="locationPincode" class="block text-white text-lg font-semibold mb-2">Pincode</label>
            <input
              type="text"
              id="locationPincode"
              v-model="profileForm.location_pincode"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="e.g., 400001"
              required
            />
          </div>
        </div>
        <div>
          <label for="locationCountry" class="block text-white text-lg font-semibold mb-2">Country</label>
          <input
            type="text"
            id="locationCountry"
            value="India"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
            readonly
          />
        </div>

        <div v-if="updateErrorMsg" class="text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          {{ updateErrorMsg }}
        </div>
        <div v-if="updateSuccessMsg" class="text-green-400 text-sm text-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
          {{ updateSuccessMsg }}
        </div>

        <div class="flex justify-end gap-4">
          <NuxtLink to="/profile" class="px-6 py-2 rounded-md font-semibold border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors">
            Cancel
          </NuxtLink>
          <button
            type="submit"
            :disabled="updatingProfile"
            class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-2 rounded-md text-white font-bold shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
            :class="{ 'opacity-70 cursor-not-allowed': updatingProfile }"
          >
            <span v-if="!updatingProfile">Save Changes</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const profileForm = ref({
  id: '',
  username: '',
  email: '',
  location_address: '',
  location_city: '',
  location_state: '',
  location_pincode: '',
  location_country: 'India',
});

const loadingProfile = ref(true);
const fetchErrorMsg = ref('');
const updatingProfile = ref(false);
const updateErrorMsg = ref('');
const updateSuccessMsg = ref('');

watch(user, (currentUser) => {
  if (!currentUser) {
    router.push('/login');
  }
}, { immediate: true });

const fetchUserProfile = async () => {
  loadingProfile.value = true;
  fetchErrorMsg.value = '';

  if (!user.value) {
    fetchErrorMsg.value = 'User not authenticated.';
    loadingProfile.value = false;
    return;
  }

  try {
    const { data: profileData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.value.id)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      fetchErrorMsg.value = 'Profile not found. Please log in again or contact support.';
      console.warn('Profile not found for user ID:', user.value.id);
    } else if (fetchError) {
      throw fetchError;
    }

    if (profileData) {
      profileForm.value = {
        id: profileData.id,
        username: profileData.username,
        email: profileData.email,
        location_address: profileData.location_address,
        location_city: profileData.location_city,
        location_state: profileData.location_state,
        location_pincode: profileData.location_pincode,
        location_country: profileData.location_country,
      };
    } else {
      fetchErrorMsg.value = 'Failed to load profile data.';
    }

  } catch (error) {
    console.error('Error fetching profile:', error.message);
    fetchErrorMsg.value = 'Error loading profile: ' + error.message;
  } finally {
    loadingProfile.value = false;
  }
};

const updateProfile = async () => {
  updatingProfile.value = true;
  updateErrorMsg.value = '';
  updateSuccessMsg.value = '';

  if (!user.value) {
    updateErrorMsg.value = 'Not authenticated. Please log in.';
    updatingProfile.value = false;
    return;
  }

  try {
    if (!profileForm.value.username || !profileForm.value.location_address ||
        !profileForm.value.location_city || !profileForm.value.location_state ||
        !profileForm.value.location_pincode) {
      updateErrorMsg.value = 'Please fill in all required fields.';
      updatingProfile.value = false;
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        username: profileForm.value.username,
        location_address: profileForm.value.location_address,
        location_city: profileForm.value.location_city,
        location_state: profileForm.value.location_state,
        location_pincode: profileForm.value.location_pincode,
        // REMOVED: updated_at: new Date().toISOString(),
      })
      .eq('id', user.value.id);

    if (updateError) throw updateError;

    updateSuccessMsg.value = 'Profile updated successfully!';
    // You might want to re-fetch the user object or profile data here
    // to ensure userDisplayName in header updates if username was changed.
  } catch (error) {
    console.error('Error updating profile:', error.message);
    updateErrorMsg.value = 'Failed to update profile: ' + error.message;
  } finally {
    updatingProfile.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
/* Scoped styles here if needed. */
</style>