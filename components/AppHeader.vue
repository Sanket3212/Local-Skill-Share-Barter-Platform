<template>
  <header class="bg-black/80 backdrop-blur-md text-white py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center
                 fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-white/10">

    <NuxtLink to="/" class="flex items-center group">
      <span class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg
                   group-hover:scale-105 transition-transform duration-300">
        SkillSwap
      </span>
    </NuxtLink>

    <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
      <NuxtLink to="/" class="header-nav-link">Home</NuxtLink>
      <NuxtLink to="/browse-skills" class="header-nav-link">Browse Skills</NuxtLink>
      <NuxtLink to="/browse-items" class="header-nav-link">Browse Items</NuxtLink>
      
      <NuxtLink v-if="user" to="/messages" class="header-nav-link">Messages</NuxtLink>
      <NuxtLink v-if="user" to="/profile" class="header-nav-link">Dashboard</NuxtLink>
      
      <div class="ml-4 relative">
        <NuxtLink v-if="!user" to="/login" class="bg-green-600 text-white px-5 py-2 rounded-md
                                                  hover:bg-green-500 transition-all duration-300 ease-out
                                                  hover:scale-105 hover:shadow-green-500/30 focus:ring-4 focus:ring-green-500/50">
          Sign In
        </NuxtLink>
        
        <div v-else class="relative">
          <button @click="toggleUserMenu" class="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-lg font-bold text-white
                                               focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-out
                                               hover:scale-110 hover:shadow-lg hover:shadow-green-500/30">
            {{ userInitial }}
          </button>

          <Transition name="menu-fade">
            <div v-if="showUserMenu" ref="userMenuRef" class="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-lg rounded-md shadow-xl
                                                            border border-white/10 overflow-hidden z-50">
              <NuxtLink to="/profile" @click="toggleUserMenu" class="block px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                <div class="font-bold mb-1">{{ userDisplayName }}</div>
                <div class="text-gray-400 truncate">{{ user?.email }}</div>
              </NuxtLink>
              <div class="border-t border-white/5"></div>
              <NuxtLink to="/profile" @click="toggleUserMenu" class="block px-4 py-3 text-white hover:bg-white/10 transition-colors header-nav-link-dropdown">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/messages" @click="toggleUserMenu" class="block px-4 py-3 text-white hover:bg-white/10 transition-colors header-nav-link-dropdown">
                Messages
              </NuxtLink>
              <button @click="handleLogoutAndCloseMenu" class="block w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors">
                Logout
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </nav>

    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors">
        <svg v-if="!isMobileMenuOpen" class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <Transition name="fade-slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden p-6">
        <button @click="toggleMobileMenu" class="absolute top-6 right-6 text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors">
          <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <NuxtLink @click="toggleMobileMenu" to="/" class="mobile-nav-link">Home</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/browse-skills" class="mobile-nav-link">Browse Skills</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/browse-items" class="mobile-nav-link">Browse Items</NuxtLink>
        <NuxtLink v-if="user" @click="toggleMobileMenu" to="/messages" class="mobile-nav-link">Messages</NuxtLink>
        <NuxtLink v-if="user" @click="toggleMobileMenu" to="/profile" class="mobile-nav-link">Dashboard</NuxtLink>
        
        <div class="mt-10 flex flex-col items-center space-y-6 w-full max-w-xs">
          <NuxtLink v-if="!user" @click="toggleMobileMenu" to="/login" class="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl w-full text-center
                                                                          hover:bg-green-500 transition-colors hover:scale-105 hover:shadow-green-500/30">
            Sign In
          </NuxtLink>
          <div v-else class="text-center w-full">
              <div class="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                {{ userInitial }}
              </div>
              <p class="text-xl font-bold text-white">{{ userDisplayName }}</p>
              <p class="text-gray-400 text-sm mb-6 truncate">{{ user?.email }}</p>
              <button @click="handleLogoutAndCloseMenu" class="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-xl w-full
                                                                 hover:bg-red-500 transition-colors hover:scale-105 hover:shadow-red-500/30">
                Logout
              </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <div :style="{ height: headerHeight + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'; // Added computed
import { useSupabaseUser, useSupabaseClient } from '#imports';
import { useRouter } from 'vue-router';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const showUserMenu = ref(false); // New: Controls desktop user dropdown
const headerHeight = ref(0);
const userMenuRef = ref(null); // Ref for the dropdown element

// Computed property for user's display name
const userDisplayName = computed(() => {
  if (user.value) {
    // Prioritize full_name from user_metadata
    if (user.value.user_metadata?.full_name) {
      return user.value.user_metadata.full_name;
    }
    // Fallback to email if full_name is not available
    return user.value.email;
  }
  return 'Guest'; // Fallback for unauthenticated user (though this part of UI is hidden then)
});

// Computed property for user's initial
const userInitial = computed(() => {
  if (userDisplayName.value && userDisplayName.value !== 'Guest') {
    return userDisplayName.value.charAt(0).toUpperCase();
  }
  return 'U'; // Default initial if no name/email
});


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// New: Toggle desktop user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// New: Close user menu if click outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target) && showUserMenu.value) {
    const avatarButton = event.target.closest('button.w-10.h-10.rounded-full'); // Check if click was on avatar button itself
    if (!avatarButton) { // Close only if click is truly outside both menu and button
        showUserMenu.value = false;
    }
  }
};


const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error.message);
    alert('Failed to logout. Please try again.');
  }
};

const handleLogoutAndCloseMenu = async () => {
  await handleLogout();
  toggleMobileMenu(); // Close mobile menu after logout
  showUserMenu.value = false; // Close desktop menu after logout
};

const measureHeaderHeight = () => {
  const headerElement = document.querySelector('header');
  if (headerElement) {
    headerHeight.value = headerElement.offsetHeight;
  }
};

onMounted(() => {
  measureHeaderHeight();
  window.addEventListener('resize', measureHeaderHeight);
  document.addEventListener('click', handleClickOutside); // Listen for clicks outside
});

onUnmounted(() => {
  window.removeEventListener('resize', measureHeaderHeight);
  document.removeEventListener('click', handleClickOutside); // Clean up listener
  document.body.style.overflow = ''; // Ensure body scrolling is re-enabled
});
</script>

<style scoped>
/* Custom drop shadow for gradient text */
.drop-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

/* Base style for desktop navigation links */
.header-nav-link {
  @apply text-white relative py-1 px-2 text-lg font-medium transition-all duration-300 ease-out;
}

.header-nav-link:hover {
  @apply text-teal-400; /* Primary Teal hover */
}

/* Subtle underline effect for desktop links on hover */
.header-nav-link::after {
  content: '';
  @apply absolute left-0 bottom-0 h-[2px] w-0 bg-teal-400 transition-all duration-300 ease-out;
}

.header-nav-link:hover::after {
  @apply w-full;
}

/* Style for active NuxtLink (requires Nuxt's default active class, often 'router-link-active' or 'router-link-exact-active') */
.header-nav-link.router-link-exact-active {
  @apply text-teal-400;
}

.header-nav-link.router-link-exact-active::after {
  @apply w-full; /* Active link also has full underline */
}

/* Specific styling for dropdown links to override generic header-nav-link */
.header-nav-link-dropdown {
  @apply text-white hover:text-teal-400; /* Reset color for dropdown */
}
.header-nav-link-dropdown::after {
  content: none; /* No underline for dropdown items */
}

/* Mobile navigation link styles */
.mobile-nav-link {
  @apply text-4xl text-white font-semibold relative py-2 transition-all duration-300 ease-out;
}

.mobile-nav-link:hover {
  @apply text-teal-400 scale-105;
}

/* Transition for mobile menu overlay */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Transition for user dropdown menu */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>