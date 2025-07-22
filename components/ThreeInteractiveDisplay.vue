<template>
  <div class="three-interactive-display-container">
    <canvas ref="interactiveCanvas" class="w-full h-full block cursor-grab active:cursor-grabbing"></canvas>
    <div v-if="hoveredObjectName" class="hover-info-box">
      {{ hoveredObjectName }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const interactiveCanvas = ref(null);
let scene, camera, renderer, controls, raycaster, mouse;
let animationFrameId;
let interactiveObjects = []; // Array to hold all 3D meshes
let originalColors = new Map(); // Store original colors for hover effect
const hoveredObjectName = ref('');

const initInteractiveScene = () => {
  if (!interactiveCanvas.value) {
    console.error('Interactive canvas element not found!');
    return;
  }

  // Scene
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x0f172a); // Optional: if you want a solid background for this specific canvas

  // Camera
  camera = new THREE.PerspectiveCamera(75, interactiveCanvas.value.clientWidth / interactiveCanvas.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 8); // Slightly pulled back for better view

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: interactiveCanvas.value,
    alpha: true, // Transparent background
    antialias: true
  });
  renderer.setSize(interactiveCanvas.value.clientWidth, interactiveCanvas.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Orbit Controls (for user interaction with camera)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth camera movement
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = true; // Auto-rotate initially
  controls.autoRotateSpeed = 0.5;

  // Lighting (essential for MeshStandardMaterial)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft general light
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x14b8a6, 200); // Primary Teal light
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(0x16a34a, 150); // Primary Green light
  pointLight2.position.set(-5, -5, -5);
  scene.add(pointLight2);


  // Add more 3D Structures (Icosahedron, Torus, Cube)
  const addInteractiveObject = (geometry, material, position, rotation, name) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    mesh.userData.name = name; // Assign a name for display
    scene.add(mesh);
    interactiveObjects.push(mesh);
    originalColors.set(mesh.uuid, material.color.clone()); // Store original color
  };

  const material1 = new THREE.MeshStandardMaterial({ color: 0x14b8a6, roughness: 0.4, metalness: 0.1 }); // Primary Teal
  const material2 = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.4, metalness: 0.1 }); // Primary Green
  const material3 = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, roughness: 0.4, metalness: 0.1 }); // Secondary Teal

  addInteractiveObject(new THREE.IcosahedronGeometry(1.5, 0), material1, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 'SkillSwap Core');
  addInteractiveObject(new THREE.TorusGeometry(0.8, 0.3, 16, 100), material2, { x: 2.5, y: 1.5, z: -1 }, { x: 0.5, y: 0.5, z: 0 }, 'Connection Ring');
  addInteractiveObject(new THREE.BoxGeometry(1.2, 1.2, 1.2), material3, { x: -2, y: -1, z: 0.5 }, { x: 0, y: 0.7, z: 0.3 }, 'Resource Block');

  // Raycaster for interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Mouse move event for hover
  const onMouseMove = (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.offsetX / interactiveCanvas.value.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / interactiveCanvas.value.clientHeight) * 2 + 1;
  };
  interactiveCanvas.value.addEventListener('mousemove', onMouseMove);

  // Animation Loop
  let lastIntersected = null;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    controls.update(); // Update OrbitControls

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(camera, mouse);

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    if (intersects.length > 0) {
      if (lastIntersected !== intersects[0].object) {
        // Restore color of previous object if it exists and wasn't manually changed
        if (lastIntersected && originalColors.has(lastIntersected.uuid)) {
          lastIntersected.material.color.copy(originalColors.get(lastIntersected.uuid));
        }
        lastIntersected = intersects[0].object;
        originalColors.set(lastIntersected.uuid, lastIntersected.material.color.clone()); // Store current color
        lastIntersected.material.color.set(0x3b82f6); // Accent Blue on hover
        hoveredObjectName.value = lastIntersected.userData.name || 'Unknown Object';
      }
    } else {
      if (lastIntersected) {
        // Restore color when no longer hovering
        if (originalColors.has(lastIntersected.uuid)) {
          lastIntersected.material.color.copy(originalColors.get(lastIntersected.uuid));
        }
        hoveredObjectName.value = '';
      }
      lastIntersected = null;
    }

    renderer.render(scene, camera);
  };
  animate();

  // Handle Window Resize
  const onWindowResize = () => {
    camera.aspect = interactiveCanvas.value.clientWidth / interactiveCanvas.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(interactiveCanvas.value.clientWidth, interactiveCanvas.value.clientHeight);
  };
  // Use a ResizeObserver for more robust handling within a fluid container
  const resizeObserver = new ResizeObserver(() => onWindowResize());
  resizeObserver.observe(interactiveCanvas.value);

  // Store references for cleanup
  renderer.domElement.resizeObserver = resizeObserver;
  renderer.domElement.onMouseMove = onMouseMove;
};

const disposeInteractiveScene = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (renderer) {
    renderer.domElement.removeEventListener('mousemove', renderer.domElement.onMouseMove);
    if (renderer.domElement.resizeObserver) {
      renderer.domElement.resizeObserver.disconnect();
    }
    renderer.dispose();
  }
  if (controls) {
    controls.dispose();
  }
  interactiveObjects.forEach(obj => {
    obj.geometry.dispose();
    obj.material.dispose();
  });
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  raycaster = null;
  mouse = null;
  interactiveObjects = [];
  originalColors.clear();
  animationFrameId = null;
  console.log('Three.js interactive display disposed.');
};

onMounted(() => {
  if (process.client) {
    initInteractiveScene();
  }
});

onUnmounted(() => {
  if (process.client) {
    disposeInteractiveScene();
  }
});

// Watch for changes in hoveredObjectName for potential reactive updates (e.g., UI elements)
watch(hoveredObjectName, (newValue) => {
  // console.log('Hovered object:', newValue);
});
</script>

<style scoped>
.three-interactive-display-container {
  position: relative;
  width: 100%; /* Or a fixed width/height */
  height: 400px; /* Adjust height as needed */
  background-color: rgba(0, 0, 0, 0.3); /* Form Surface - Semi-transparent background */
  border-radius: 1rem; /* Rounded corners */
  border: 1px solid rgba(255, 255, 255, 0.05); /* Input Surface border */
  overflow: hidden; /* Important for border-radius */
  box-shadow: 0 0 60px rgba(20, 184, 166, 0.15), /* Neon glow */
              0 0 30px rgba(22, 163, 74, 0.1);
}

canvas {
  display: block;
}

.hover-info-box {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  pointer-events: none; /* Do not block interaction with canvas */
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
</style>