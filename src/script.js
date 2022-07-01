import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import vertexShaderParticles from './shaders/vertexParticles.glsl';
import fragmentShaderParticles from './shaders/fragmentParticles.glsl';
import gsap from 'gsap';
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereBufferGeometry(1, 256, 256);

// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
});

const materialParticles = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShaderParticles,
    fragmentShader: fragmentShaderParticles,
    side: THREE.DoubleSide,
    transparent: true,
});

let n = 10000;

let positions = new Float32Array(n * 3);
let geometryParticles = new THREE.BufferGeometry();

let inc = Math.PI * (3 - Math.sqrt(5));
let off = 2 / n;
let rad = 1.7;

for (let i = 0; i < n; i++) {

    let y = i * off - 1 + (off / 2);
    let r = Math.sqrt(1 - y * y);
    let phi = i * inc;
    positions[i * 3 + 0] = rad * Math.cos(phi) * r;
    positions[i * 3 + 1] = rad * y;
    positions[i * 3 + 2] = rad * Math.sin(phi) * r;

}

geometryParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// points
const points = new THREE.Points(geometryParticles, materialParticles);
scene.add(points);

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();
    points.rotation.y = elapsedTime / 5.;
    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;
    materialParticles.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();