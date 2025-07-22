<template>
  <ClientOnly>
    <div ref="container" class="w-full h-full absolute inset-0 z-0"></div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

// This component no longer depends on @nuxtjs/color-mode, so no imports related to it are needed here.

const container = ref(null); // Reference to the div where the Three.js canvas will be appended
let scene, camera, renderer, particles, particleMaterial, mouse, raycaster;
let animationFrameId;

// Particle color is now fixed to the primary color from your design system, as dark mode is removed.
const getParticleColor = () => {
  return 0x3498DB; // Your primary color (Deep Sky Blue) in hexadecimal
};

// Initializes the Three.js scene, camera, renderer, and particles
const initThreeJs = () => {
  if (!container.value) return; // Ensure the container element is available

  // Clean up any existing Three.js instances before re-initializing (important for hot-reloading in dev)
  if (renderer && renderer.domElement) {
    container.value.removeChild(renderer.domElement);
    renderer.dispose();
  }

  // Set up the Scene
  scene = new THREE.Scene();

  // Set up the Camera
  // FOV, Aspect Ratio, Near, Far clipping planes
  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  camera.position.z = 5; // Position the camera back to see particles

  // Set up the Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
  renderer.setSize(container.value.clientWidth, container.value.clientHeight); // Set renderer size to container size
  renderer.setPixelRatio(window.devicePixelRatio); // Handle high-DPI screens
  container.value.appendChild(renderer.domElement); // Append the canvas to the container div

  // Create Particles
  const particleCount = 150; // Number of particles
  const positions = new Float32Array(particleCount * 3); // x, y, z for each particle
  const particleGeometry = new THREE.BufferGeometry();

  // Distribute particles randomly in a cube space
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = (Math.random() - 0.5) * 10; // X position (-5 to 5)
    positions[i3 + 1] = (Math.random() - 0.5) * 10; // Y position (-5 to 5)
    positions[i3 + 2] = (Math.random() - 0.5) * 10; // Z position (-5 to 5)
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create Particle Material
  particleMaterial = new THREE.PointsMaterial({
    color: getParticleColor(), // Use the fixed particle color
    size: 0.05, // Size of each particle
    sizeAttenuation: true, // Particles closer to camera appear larger
    transparent: true,
    blending: THREE.AdditiveBlending, // For glowing effect
    depthWrite: false, // Prevents particles from blocking each other
  });

  // Create Points object and add to scene
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Initialize Mouse for potential interaction (not fully implemented in this basic version)
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  // Add event listeners for interactivity and responsiveness
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);

  // Start the animation loop
  animate();
};

// Animation loop
const animate = () => {
  animationFrameId = requestAnimationFrame(animate); // Request the next frame

  // Rotate particles for a subtle animation
  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0005;

  renderer.render(scene, camera); // Render the scene
};

// Mouse move handler (currently just updates mouse coordinates)
const onMouseMove = (event) => {
  // Normalize mouse coordinates to -1 to +1 range (for raycasting)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera); // Update raycaster with new mouse position
};

// Window resize handler for responsiveness
const onWindowResize = () => {
  if (container.value && camera && renderer) {
    camera.aspect = container.value.clientWidth / container.value.clientHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Update camera projection
    renderer.setSize(container.value.clientWidth, container.value.clientHeight); // Resize renderer
  }
};

// Clean up Three.js resources when component is unmounted
const disposeThreeJs = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // Stop the animation loop
  }
  if (renderer) {
    renderer.dispose(); // Dispose of renderer's WebGL context
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement); // Remove canvas from DOM
    }
  }
  // Nullify references to aid garbage collection
  scene = null;
  camera = null;
  renderer = null;
  particles = null;
  particleMaterial = null;
  mouse = null;
  raycaster = null;

  // Remove event listeners
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onWindowResize);
};

// Lifecycle hooks
onMounted(() => {
  initThreeJs(); // Initialize Three.js when component mounts
});

onUnmounted(() => {
  disposeThreeJs(); // Clean up when component unmounts
});

// Removed: watch(() => colorMode.value, ...) as color mode is no longer a factor here.
</script>