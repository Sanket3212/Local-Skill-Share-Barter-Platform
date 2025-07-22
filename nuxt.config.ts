
import { defineNuxtConfig } from "nuxt/config";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  plugins: [

    '@/plugins/aos.js'
  ],

  modules: [
    '@nuxtjs/tailwindcss', '@tresjs/nuxt', '@pinia/nuxt', '@nuxtjs/supabase'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/profile',
      exclude: ['/', '/register', '/forgot-password'],
    }
  },





})