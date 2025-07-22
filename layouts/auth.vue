<template>
    
  <div class="min-h-dvh bg-gray-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <div
      class="absolute bg-teal-500/20 w-96 h-96 rounded-full -top-20 -left-20 animate-pulse-slow filter blur-3xl transform will-change-transform"
    ></div>
    <div
      class="absolute bg-green-500/20 w-[500px] h-[500px] rounded-full -bottom-40 -right-20 animate-pulse-slower filter blur-3xl transform will-change-transform"
    ></div>
    <div
      class="absolute bg-purple-500/15 w-80 h-80 rounded-full top-1/4 left-1/4 animate-pulse-slowest filter blur-3xl transform will-change-transform"
    ></div>
    <div
      class="absolute bg-blue-500/10 w-64 h-64 rounded-full bottom-20 left-1/3 animate-pulse-slowest filter blur-3xl transform will-change-transform"
    ></div>

    <slot />
  </div>
</template>

<style>
/* Global body style for this layout (if not already in a shared CSS) */
body {
  font-family: 'Inter', sans-serif;
  background-color: #0f172a; /* Ensure the primary background is consistent */
}

/* Keep your custom animations and shadows here as they are specific to this visual experience */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out forwards;
}

@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1) translateX(0);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1) translateX(10px);
    opacity: 0.3;
  }
}

@keyframes pulse-slower {
  0%, 100% {
    transform: scale(1) translateY(0);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.05) translateY(-10px);
    opacity: 0.25;
  }
}

@keyframes pulse-slowest {
  0%, 100% {
    transform: scale(1) translateX(0) translateY(0);
    opacity: 0.15;
  }
  50% {
    transform: scale(1.03) translateX(-5px) translateY(5px);
    opacity: 0.2;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 12s infinite ease-in-out;
}
.animate-pulse-slower {
  animation: pulse-slower 18s infinite ease-in-out;
}
.animate-pulse-slowest {
  animation: pulse-slowest 24s infinite ease-in-out;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(22, 163, 74, 0.25), 0 10px 10px -5px rgba(22, 163, 74, 0.1);
}
</style>