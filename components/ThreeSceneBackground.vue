<template>
  <div class="three-scene-container">
    <canvas ref="threeCanvas" class="w-full h-full block"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const threeCanvas = ref(null);
let scene, camera, renderer, sphere; // Declare variables for Three.js elements
let animationFrameId; // To store the animation frame ID for cleanup

const initThreeScene = () => {
  if (!threeCanvas.value) {
    console.error('Canvas element not found!');
    return;
  }

  // 1. Scene
  scene = new THREE.Scene();

  // 2. Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: threeCanvas.value,
    alpha: true, // Allow transparency so HTML background can show through
    antialias: true // Smooths edges of 3D objects
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // For sharper rendering on high-DPI screens

  // Optional: Adjust renderer size on window resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // 4. Geometry and Material (a simple sphere for now)
  const geometry = new THREE.SphereGeometry(2, 32, 32); // Radius 2, 32 width/height segments
  
  // Create a glowing, transparent material
  const material = new THREE.MeshBasicMaterial({
    color: 0x14b8a6, // Primary Teal - from your saved info
    transparent: true,
    opacity: 0.5,
    wireframe: true, // Shows the mesh structure, good for abstract backgrounds
  });

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // 5. Animation Loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Simple animation: rotate the sphere
    if (sphere) {
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
  };
  animate();
};

const disposeThreeScene = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (renderer) {
    renderer.dispose();
  }
  // Dispose of geometries and materials to prevent memory leaks for more complex scenes
  if (sphere) {
      sphere.geometry.dispose();
      sphere.material.dispose();
  }
  window.removeEventListener('resize', onWindowResize); // Clean up resize listener
  scene = null;
  camera = null;
  renderer = null;
  sphere = null;
  animationFrameId = null;
  console.log('Three.js scene disposed.');
};

onMounted(() => {
  // Ensure we are on the client-side before initializing Three.js
  if (process.client) {
    initThreeScene();
  }
});

onUnmounted(() => {
  if (process.client) {
    disposeThreeScene();
  }
});
</script>

<style scoped>
.three-scene-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ensures it's behind other content */
  pointer-events: none; /* Allows clicks to pass through to underlying elements */
}
canvas {
  display: block; /* Removes extra space below canvas */
}
</style>