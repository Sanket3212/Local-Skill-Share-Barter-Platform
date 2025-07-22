<template>
  <ClientOnly>
    <button
      @click="toggleColorMode"
      class="p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-dark"
      :class="[
        colorMode.value === 'dark'
          ? 'bg-neutral-dark text-white hover:bg-gray-700'
          : 'bg-neutral-light text-neutral-dark hover:bg-gray-200'
      ]"
      aria-label="Toggle dark/light mode"
    >
      <span v-if="colorMode.value === 'dark'" class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 21v-2.25m-6.364-.364l1.591-1.591M3 12h2.25m.364-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <span class="sr-only">Switch to Light Mode</span>
      </span>
      <span v-else class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.567 0-10.05-4.223-10.05-9.407C1.95 7.456 6.432 3.25 12 3.25c2.479 0 4.811.968 6.556 2.688A8.077 8.077 0 0012 5.25c-4.482 0-8.077 3.595-8.077 8.077 0 4.482 3.595 8.077 8.077 8.077 1.637 0 3.18-.485 4.482-1.332L21.752 15.002z" />
        </svg>
        <span class="sr-only">Switch to Dark Mode</span>
      </span>
    </button>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

const toggleColorMode = () => {
  // If current value is 'dark', set preference to 'light', else set to 'dark'
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

// You can also add options for 'system' preference if you want
// <select v-model="colorMode.preference">
//   <option value="system">System</option>
//   <option value="light">Light</option>
//   <option value="dark">Dark</option>
// </select>
</script>

<style scoped>
/* Any additional custom styling for the button */
</style>