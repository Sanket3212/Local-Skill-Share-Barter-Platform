<template>
  <SpeedInsights/>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>

<style scoped>
/* These are global styles that apply to the entire application.
   You'd typically put your basic CSS resets, font definitions,
   and base styles here or in a dedicated global CSS file (e.g., assets/css/main.css).
*/
body {
  font-family: 'Inter', sans-serif; /* Using Inter, based on previous context */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #333;
  background-color: #0f172a; /* Using your brand's Background color */
  -webkit-font-smoothing: antialiased; /* From previous context */
  -moz-osx-font-smoothing: grayscale;  /* From previous context */
}

/* Basic styling for NuxtLink to remove underlines */
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none; /* Keep consistent with theme, no underline unless desired */
}

.flex-grow {
  flex-grow: 1;
}
</style>