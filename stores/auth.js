// stores/auth.js
import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Stores the Firebase user object
    isLoggedIn: false,
    authReady: false, // Indicates if the initial Firebase auth state has been checked
  }),

  actions: {
    /**
     * Sets the user object and updates the login status.
     * @param {Object|null} userPayload - The Firebase user object or null if logged out.
     */
    setUser(userPayload) {
      this.user = userPayload;
      this.isLoggedIn = !!userPayload; // True if userPayload is not null
    },

    /**
     * Clears the user object and sets login status to false.
     */
    clearUser() {
      this.user = null;
      this.isLoggedIn = false;
    },

    /**
     * Initializes the authentication state by listening to Firebase auth changes.
     * This should be called once, typically in a Nuxt plugin or app lifecycle hook.
     */
    async initAuth() {
      // Ensure this runs only once and Firebase is initialized
      if (this.authReady) {
        return;
      }

      // Access the Firebase auth instance from NuxtApp
      const { $auth } = useNuxtApp();

      if (!$auth) {
        console.error('Firebase Auth is not available. Ensure firebase.client.js plugin is correctly set up.');
        this.authReady = true; // Mark as ready even if auth is not available to prevent infinite loading
        return;
      }

      // Return a promise that resolves when the initial auth state is ready
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged($auth, (user) => {
          this.setUser(user);
          this.authReady = true; // Mark auth as ready after the first check
          unsubscribe(); // Unsubscribe after the initial check
          resolve();
        });
      });
    },
  },

  // Optional: Getters for derived state
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn,
    isAuthInitialized: (state) => state.authReady,
  },
});
