<template>
    <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="text-white bg-gray-950 min-h-screen flex flex-col antialiased justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <main class="w-full max-w-md mx-auto">
      <section class="bg-black/30 rounded-xl border border-white/5 shadow-2xl-custom-glow-alt p-8 sm:p-10 md:p-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg">
          Reset Your Password
        </h1>

        <p class="text-center text-gray-400 mb-8 leading-relaxed">
          Enter your new password below. Make sure it's strong and something you'll remember!
        </p>

        <form @submit.prevent="handlePasswordReset" class="space-y-6">
          <div>
            <label for="new-password" class="block text-sm font-medium text-white mb-2">New Password</label>
            <input
              type="password"
              id="new-password"
              v-model="newPassword"
              autocomplete="new-password"
              required
              minlength="8"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700/50 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                     transition-all duration-300"
              :class="{ 'border-red-500/30 focus:ring-red-500/50': errors.newPassword }"
            />
            <p v-if="errors.newPassword" class="mt-2 text-sm text-red-400">
              {{ errors.newPassword }}
            </p>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-white mb-2">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              autocomplete="new-password"
              required
              minlength="8"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700/50 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                     transition-all duration-300"
              :class="{ 'border-red-500/30 focus:ring-red-500/50': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <div v-if="formError" class="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm text-center">
            {{ formError }}
          </div>

          <div v-if="successMessage" class="bg-green-600/20 border border-green-600/30 text-green-400 p-4 rounded-lg text-sm text-center">
            {{ successMessage }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg
                     inline-flex justify-center items-center
                     transition-all duration-300 ease-out hover:scale-105 hover:shadow-green-500/30 focus:ring-4 focus:ring-green-600/50
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Reset Password</span>
              <span v-else>
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </span>
            </button>
          </div>

          <p class="mt-8 text-center text-gray-400 text-sm">
            Remembered your password?
            <NuxtLink to="/signin" class="text-teal-400 hover:underline transition-colors duration-200">
              Sign In
            </NuxtLink>
          </p>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'; // onMounted is handled by defineNuxtPlugin
import { useRouter } from 'vue-router'; // Import useRouter
import { useSupabaseClient } from '#imports'; // Import useSupabaseClient

const supabase = useSupabaseClient();
const router = useRouter();

// Form fields
const newPassword = ref('');
const confirmPassword = ref('');

// Validation and submission states
const errors = reactive({
  newPassword: '',
  confirmPassword: '',
});
const formError = ref(''); // General form submission error
const successMessage = ref(''); // Success message after submission
const isSubmitting = ref(false); // To disable button during submission

// Client-side validation logic
const validateForm = () => {
  let isValid = true;
  errors.newPassword = '';
  errors.confirmPassword = '';
  formError.value = '';

  if (newPassword.value.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long.';
    isValid = false;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match.';
    isValid = false;
  }

  return isValid;
};

// Handle form submission with Supabase
const handlePasswordReset = async () => {
  if (!validateForm()) {
    formError.value = 'Please correct the errors above.';
    return;
  }

  isSubmitting.value = true;
  formError.value = '';
  successMessage.value = '';

  try {
    // Supabase method to update the user's password
    // This relies on the user already being implicitly authenticated via the reset token in the URL.
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    });

    if (error) {
      console.error('Supabase password reset error:', error.message);
      formError.value = error.message || 'Failed to reset password. Please try again.';
    } else {
      successMessage.value = 'Password has been successfully reset! You will be redirected to the sign-in page.';
      newPassword.value = '';
      confirmPassword.value = '';
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    }

  } catch (error) {
    console.error('Catch block password reset error:', error);
    formError.value = 'A network or unexpected error occurred. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

// AOS initialization/refresh is typically handled by a Nuxt plugin (e.g., aos.client.js)
// If you had onMounted here only for AOS.refresh, you can remove it if your plugin handles `app:mounted`
</script>

<style scoped>
/* Scoped styles here. Ensure global styles and custom utility classes are loaded via main.css */
/* For example, shadow-2xl-custom-glow-alt and drop-shadow-lg should be in main.css or similar global stylesheet */
</style>