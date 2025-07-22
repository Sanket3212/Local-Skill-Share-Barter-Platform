<template>
   <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-12 px-4 flex-grow">
    <div class="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-white">
      <h1 class="text-4xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
        Contact Us
      </h1>
      <p class="text-gray-400 text-center text-lg mb-12">
        We'd love to hear from you! Reach out with any questions, feedback, or support needs.
      </p>

      <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6 text-white text-center">Send us a Message</h2>
        <form @submit.prevent="submitContactForm" class="space-y-6">
          <div>
            <label for="name" class="block text-white text-lg font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-white text-lg font-semibold mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label for="subject" class="block text-white text-lg font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="e.g., Support Request, Feedback, Partnership Inquiry"
              required
            />
          </div>

          <div>
            <label for="message" class="block text-white text-lg font-semibold mb-2">Your Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="6"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <div v-if="formStatus.error" class="text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            {{ formStatus.error }}
          </div>
          <div v-if="formStatus.success" class="text-green-400 text-sm text-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            {{ formStatus.success }}
          </div>

          <button
            type="submit"
            :disabled="formStatus.loading"
            class="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
            :class="{ 'opacity-70 cursor-not-allowed': formStatus.loading }"
          >
            <span v-if="!formStatus.loading">Send Message</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          </button>
        </form>
      </section>

      <section class="text-center pt-8 border-t border-white/10 mt-12">
        <h2 class="text-3xl font-semibold mb-6 text-white">Other Ways to Connect</h2>
        <div class="flex flex-col md:flex-row justify-center items-center gap-6">
          <div class="text-center">
            <p class="text-lg text-gray-400 mb-2">Email Us Directly:</p>
            <a href="mailto:support@skillswap.in" class="text-teal-400 hover:text-green-300 font-medium text-xl transition-colors">support@skillswap.in</a>
          </div>
          <div class="hidden md:block text-gray-400">|</div>
          <div class="text-center">
            <p class="text-lg text-gray-400 mb-2">Call Us:</p>
            <a href="tel:+9180XXXXXXX" class="text-teal-400 hover:text-green-300 font-medium text-xl transition-colors">+91 80XXXXXXX</a>
            <p class="text-sm text-gray-500">(Mon-Fri, 9 AM - 5 PM IST)</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// If you plan to use a backend service (like a serverless function, or a simple Supabase insert
// into a 'contact_messages' table) to handle form submissions, you'll need supabase here.
// For a basic setup, this form might just trigger a mailto link or be handled by a third-party service.
// This example simulates a successful/failed submission without actual backend integration.

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const formStatus = ref({
  loading: false,
  error: '',
  success: '',
});

const submitContactForm = async () => {
  formStatus.value.loading = true;
  formStatus.value.error = '';
  formStatus.value.success = '';

  // Simulate API call or form submission
  try {
    // In a real application, you would make an API call here.
    // Example with Supabase:
    /*
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.value.name,
      email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
    });
    if (error) throw error;
    */

    // Simulate a successful response after a short delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    formStatus.value.success = 'Your message has been sent successfully! We will get back to you soon.';
    // Clear the form
    formData.value = { name: '', email: '', subject: '', message: '' };

  } catch (err) {
    console.error('Contact form submission error:', err);
    formStatus.value.error = 'Failed to send message. Please try again later or contact us directly.';
    // You might add specific error handling for different error types
  } finally {
    formStatus.value.loading = false;
  }
};
</script>

<style scoped>
/* No specific scoped styles needed here, as most are handled by Tailwind or the layout. */
</style>