<template>
  <div class="three-abstract-background-container">
    <canvas ref="threeCanvas" class="w-full h-full block"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const threeCanvas = ref(null);
let scene, camera, renderer, particles;
let animationFrameId;

const initThreeScene = () => {
  if (!threeCanvas.value) {
    console.error('Canvas element not found!');
    return;
  }

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: threeCanvas.value,
    alpha: true, // Transparent background
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Particle Geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 500; // Spread particles in a cube
    colors[i] = 0.5 + Math.random() * 0.5; // Random brightness for color
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Material (Primary Teal / Primary Green blend)
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true, // Use colors from geometry
    blending: THREE.AdditiveBlending, // For glowing effect
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true // Particles closer to camera appear larger
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Animation Loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Rotate particles subtly
    if (particles) {
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0008;
    }
    
    renderer.render(scene, camera);
  };
  animate();

  // Handle Window Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Make the resize listener available for cleanup
  renderer.domElement.onWindowResize = onWindowResize;
};

const disposeThreeScene = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (renderer) {
    renderer.domElement.removeEventListener('resize', renderer.domElement.onWindowResize); // Remove resize listener
    renderer.dispose();
  }
  if (particles) {
    particles.geometry.dispose();
    particles.material.dispose();
  }
  scene = null;
  camera = null;
  renderer = null;
  particles = null;
  animationFrameId = null;
  console.log('Three.js abstract background disposed.');
};

onMounted(() => {
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
.three-abstract-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ensures it's behind other content */
  pointer-events: none; /* Allows clicks to pass through to underlying elements */
}
canvas {
  display: block;
}
</style>