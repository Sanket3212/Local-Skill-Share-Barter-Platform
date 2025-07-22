<template>
   <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="container mx-auto py-12 px-4 flex-grow antialiased">
    <div class="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl-custom-glow-alt text-white relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-10">
          <div class="absolute top-0 -left-1/4 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div class="absolute bottom-0 -right-1/4 w-72 h-72 bg-purple-500/15 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg">
          Your SkillSwap Dashboard
        </h1>
        <p class="text-gray-300 text-center mb-10 text-lg">
          Welcome, <span class="text-white font-semibold">{{ userDisplayName }}</span>! Manage your skills, items, and activity here.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div class="bg-black/30 p-6 md:p-8 rounded-xl border border-gray-700/50 shadow-lg interactive-card">
            <h2 class="text-2xl font-semibold mb-5 text-white flex items-center drop-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Profile Details
            </h2>
            <div class="space-y-3 mb-6">
              <p class="text-lg"><span class="font-medium text-gray-400">Email:</span> <span class="text-white ml-2">{{ user?.email }}</span></p>
              <p v-if="userDisplayName && userDisplayName !== user?.email" class="text-lg">
                <span class="font-medium text-gray-400">Name:</span> <span class="text-white ml-2">{{ userDisplayName }}</span>
              </p>
              <p v-if="user?.created_at" class="text-lg"><span class="font-medium text-gray-400">Member Since:</span> <span class="text-white ml-2">{{ format(new Date(user.created_at), 'MMM dd, yyyy') }}</span></p>
            </div>
            
            <NuxtLink to="/profile/edit" class="inline-flex items-center bg-green-600 text-white font-semibold px-6 py-3 rounded-md
                                                 transition-all duration-300 ease-out hover:bg-green-500 hover:scale-105 focus:ring-4 focus:ring-green-500/50">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Edit Profile
            </NuxtLink>
          </div>

          <div class="bg-black/30 p-6 md:p-8 rounded-xl border border-gray-700/50 shadow-lg interactive-card">
            <h2 class="text-2xl font-semibold mb-5 text-white flex items-center drop-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              My Listings
            </h2>
            <p class="text-gray-400 mb-5">You have <strong class="text-white">{{ userListings.length }}</strong> active skill listings.</p>
            <ul v-if="userListings.length > 0" class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2 scrollbar-thumb-teal-400 scrollbar-track-white/5">
              <li v-for="listing in userListings" :key="listing.id" class="flex justify-between items-center text-white bg-gray-700/30 p-3 rounded-md border border-gray-600/50 hover:bg-gray-600/50 transition-colors duration-200">
                <span class="truncate pr-2 font-medium">{{ listing.skill_name }}</span>
                <NuxtLink :to="`/skills/${listing.id}`" class="text-teal-400 hover:text-teal-300 hover:underline text-sm font-medium flex-shrink-0">View Details</NuxtLink>
              </li>
            </ul>
            <p v-else class="text-gray-400 italic mb-5">No skill listings yet. Share your talents with the community!</p>
            <NuxtLink to="/new-listing" class="inline-flex items-center bg-green-600 text-white font-semibold px-6 py-3 rounded-md mt-6 md:mt-0
                                               transition-all duration-300 ease-out hover:bg-green-500 hover:scale-105 focus:ring-4 focus:ring-green-500/50">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Create New Listing
            </NuxtLink>
          </div>

          <div class="lg:col-span-2 bg-black/30 p-6 md:p-8 rounded-xl border border-gray-700/50 shadow-lg interactive-card">
            <h2 class="text-2xl font-semibold mb-5 text-white flex items-center drop-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div class="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
              <NuxtLink to="/browse-skills" class="flex-1 min-w-[150px] bg-blue-500/10 text-white text-lg font-medium px-6 py-3 rounded-md text-center
                                                  transition-all duration-300 ease-out hover:bg-blue-500/20 hover:scale-105 focus:ring-4 focus:ring-blue-500/50">
                Browse Skills
              </NuxtLink>
              <NuxtLink to="/browse-items" class="flex-1 min-w-[150px] bg-purple-500/15 text-white text-lg font-medium px-6 py-3 rounded-md text-center
                                                  transition-all duration-300 ease-out hover:bg-purple-500/20 hover:scale-105 focus:ring-4 focus:ring-purple-500/50">
                Browse Items
              </NuxtLink>
              <button @click="handleLogout" class="flex-1 min-w-[150px] bg-red-600 text-white text-lg font-medium px-6 py-3 rounded-md text-center
                                                  transition-all duration-300 ease-out hover:bg-red-500 hover:scale-105 focus:ring-4 focus:ring-red-500/50">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useSupabaseUser, useSupabaseClient } from '#imports';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const userListings = ref([]);

watch(user, (currentUser) => {
  if (!currentUser) {
    router.push('/login');
  }
}, { immediate: true });

const userDisplayName = computed(() => {
  if (user.value) {
    if (user.value.user_metadata?.full_name) {
      return user.value.user_metadata.full_name;
    }
    return user.value.email;
  }
  return 'Guest';
});

const fetchUserListings = async () => {
  if (!user.value) return;

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('id, skill_name')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    userListings.value = data || [];
  } catch (error) {
    console.error('Error fetching user listings:', error.message);
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

onMounted(() => {
  fetchUserListings();
});
</script>

<style scoped>
/* Custom Shadow Enhancements (re-using from previous UI updates) */
.shadow-2xl-custom-glow-alt {
    box-shadow: 0 0 50px rgba(20, 184, 166, 0.1),
                0 0 20px rgba(22, 163, 74, 0.08),
                0 20px 40px -10px rgba(0,0,0,0.3);
}

/* Blob/Orb Background Animation (re-using from previous UI updates) */
@keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
    animation: blob 7s infinite cubic-bezier(0.42, 0, 0.58, 1);
}
.animation-delay-2000 {
    animation-delay: 2s;
}

/* Headings: Added drop-shadow for better readability on gradients */
.drop-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

/* Card Hover Effect */
.interactive-card {
  transition: all 0.3s ease-out;
}

.interactive-card:hover {
  transform: translateY(-5px); /* Lift slightly on hover */
  border-color: rgba(20, 184, 166, 0.5); /* Primary Teal */
  box-shadow: 0 10px 20px rgba(20, 184, 166, 0.15), /* Subtle teal glow */
              0 4px 6px rgba(0,0,0,0.2); /* Standard shadow */
}


/* Custom Scrollbar (from previous iterations) */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05); /* Input Surface color */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #14b8a6; /* Primary Teal */
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.05); /* Border matching track */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #2dd4bf; /* Secondary Teal on hover */
}
</style>