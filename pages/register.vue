<template>
  <div class="w-full max-w-md z-10 animate-fade-in-down flex flex-col items-center">
    <div class="flex justify-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow-lg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>

    <form
      @submit.prevent="handleRegister"
      class="bg-black/30 backdrop-blur-xl w-full p-8 rounded-2xl text-white space-y-6 border border-white/10 shadow-2xl"
    >
      <h2
        class="text-4xl font-black text-center bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow-lg"
      >
        Join SkillSwap
      </h2>
      <p class="text-gray-400 text-center text-lg -mt-3">Create your account to start swapping!</p>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>
        <input
          type="text"
          v-model="username"
          required
          class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Choose a Username"
          autocomplete="username"
        />
      </div>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
        </div>
        <input
          type="email"
          v-model="email"
          required
          class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </div>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          required
          class="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Create password"
          autocomplete="new-password"
        />
        <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 focus:outline-none">
          <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .536 0 1.056.052 1.564.148M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 2l20 20" /></svg>
        </button>
      </div>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <input
          :type="showPasswordConfirm ? 'text' : 'password'"
          v-model="passwordConfirm"
          required
          class="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Confirm password"
          autocomplete="new-password"
        />
        <button type="button" @click="showPasswordConfirm = !showPasswordConfirm" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 focus:outline-none">
          <svg v-if="!showPasswordConfirm" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .536 0 1.056.052 1.564.148M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 2l20 20" /></svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="locationAddress" class="block text-white text-lg font-semibold mb-2">Address</label>
          <input
            type="text"
            id="locationAddress"
            v-model="locationAddress"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Street Address"
            autocomplete="street-address"
            required
          />
        </div>
        <div>
          <label for="locationCity" class="block text-white text-lg font-semibold mb-2">City</label>
          <input
            type="text"
            id="locationCity"
            v-model="locationCity"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Mumbai"
            autocomplete="address-level2"
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
            v-model="locationState"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., Maharashtra"
            autocomplete="address-level1"
            required
          />
        </div>
        <div>
          <label for="locationPincode" class="block text-white text-lg font-semibold mb-2">Pincode</label>
          <input
            type="text"
            id="locationPincode"
            v-model="locationPincode"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="e.g., 400001"
            autocomplete="postal-code"
            required
          />
        </div>
      </div>

      <div v-if="errorMsg" class="text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
        {{ errorMsg }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
      >
        <span v-if="!loading">Register</span>
        <span v-else class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Registering...
        </span>
      </button>

      <div class="relative flex py-2 items-center">
        <div class="flex-grow border-t border-white/10"></div>
        <span class="flex-shrink mx-4 text-gray-400">OR</span>
        <div class="flex-grow border-t border-white/10"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          @click="handleSocialLogin('google')"
          class="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 py-3 rounded-lg font-semibold text-gray-200 transition-all duration-200 border border-white/10"
        >
          <svg class="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.16 5.37-4.4 6.98l7.98 6.19c4.63-4.28 7.4-10.75 7.4-17.64z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.16 1.45-4.92 2.3-8.01 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
          Google
        </button>
        <button
          type="button"
          @click="handleSocialLogin('github')"
          class="flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 py-3 rounded-lg font-semibold text-gray-200 transition-all duration-200 border border-white/10"
        >
          <svg class="w-5 h-5" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
          GitHub
        </button>
      </div>
    </form>

    <p class="text-center text-gray-400 mt-6 text-md">
      Already have an account?
      <NuxtLink to="/login" class="text-green-400 hover:text-green-300 font-semibold ml-1 transition-colors duration-200">
        Sign In Here
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useRouter } from 'vue-router'

// Define the custom layout for this page
definePageMeta({
  layout: 'auth'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser() // This watches the Supabase auth state
const router = useRouter()

// Form data refs
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const locationAddress = ref('')
const locationCity = ref('')
const locationState = ref('')
const locationPincode = ref('')
// Removed locationLatitude and locationLongitude

const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

// Redirect if already logged in
watch(user, (currentUser) => {
  if (currentUser) {
    router.push('/profile') // Assuming '/profile' is your dashboard route
  }
}, { immediate: true })

const handleRegister = async () => {
  loading.value = true
  errorMsg.value = '' // Clear previous errors

  if (password.value !== passwordConfirm.value) {
    errorMsg.value = 'Passwords do not match.';
    loading.value = false;
    return;
  }

  try {
    // Step 1: Register user with Supabase Auth (auth.users table)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value, // Storing username in auth.users metadata
        }
      }
    });

    if (authError) throw authError;

    // Step 2: If auth.signUp is successful AND user object is returned (meaning they are signed in/confirmed),
    // then insert into public.users table.
    // The public profile creation should happen ONLY if the user is immediately signed in
    // (e.g., no email confirmation required, or auto-confirm is on).
    // Otherwise, it's better to create the profile via a webhook/trigger after email confirmation.
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users') // Targeting your public user profile table
        .insert([
          {
            id: authData.user.id, // Link to auth.users.id
            username: username.value,
            email: email.value, // Store email here too if needed for queries
            location_address: locationAddress.value,
            location_city: locationCity.value,
            location_state: locationState.value,
            location_country: 'India', // Fixed value as per schema default
            location_pincode: locationPincode.value,
            // Removed location_latitude and location_longitude
          }
        ]);

      if (profileError) {
        console.error('Error creating public user profile:', profileError.message);
        errorMsg.value = 'Account created, but failed to save profile details. Please log in to update your profile later: ' + profileError.message;
        alert('Registration successful, but there was an issue saving your profile. Please log in.');
        router.push('/login');
        return;
      }
    } else {
        alert('Registration successful! Please check your email for a confirmation link to activate your account.');
        router.push('/login');
        return;
    }

    alert('Registration successful! You can now log in.');
    router.push('/login');

  } catch (error) {
    errorMsg.value = error.message;
  } finally {
    loading.value = false;
  }
}

// Function to handle social logins
const handleSocialLogin = async (provider) => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/profile', // Redirect to /profile after social login
      },
    });

    if (error) throw error;
    // Supabase will redirect the user to the provider, then back to the redirectTo URL.
    // The public profile creation for social logins will be handled on the /profile page.
  } catch (error) {
    console.error('Social login error:', error.message);
    errorMsg.value = error.message;
    loading.value = false;
  }
};
</script>

<style scoped>
/* No scoped styles needed here, as they are inherited from the layout file */
</style>