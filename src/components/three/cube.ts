import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

export function Cube(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: 0.5,
    metalness: 0,
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(1.5, 0, 0);
  scene.add(sphere);

  const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0,
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(-1.5, 0, 0);
  scene.add(torus);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

// camera controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;


// transform controls
  let isObjectBeingControlled = false;

  const transformControls = new TransformControls(camera, canvas);
  transformControls.addEventListener("dragging-changed", (event) => {
    controls.enabled = !event.value;
    isObjectBeingControlled = event.value;
  });
  scene.add(transformControls);

  function select(object: THREE.Object3D | null) {
    if (object) {
      transformControls.attach(object);
    } else {
      // Detach the transform controls from any object
      transformControls.detach();
    }
  }
  

  const pixelationShader = {
    uniforms: {
      tDiffuse: { value: null },
      resolution: { value: new THREE.Vector2(300, 300) },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    void main() {
      vec2 dxy = 1.0 / resolution;
      vec2 coord = dxy * floor(vUv / dxy);
      gl_FragColor = texture2D(tDiffuse, coord);
    }
  `,
  };

  const pixelationPass = new ShaderPass(pixelationShader);
  composer.addPass(pixelationPass);

  function onWindowResize() {
    const container = canvas.parentElement;
    if (!container) return;
  
    const width = container.clientWidth;
    const height = container.clientHeight;
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    render();
  }

  canvas.addEventListener("dblclick", (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      select(intersects[0].object);
    } else {
      select(null);
    }
  });
  
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

  
    if (!isObjectBeingControlled) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
  
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.02;
  
      torus.rotation.x += 0.02;
      torus.rotation.y += 0.01;
    }
  
    render();
  }
  

  function render() {
    composer.render();
  }

  animate();

  return {
    onWindowResize: onWindowResize,
    enableControls: () => controls.enabled = true,
    disableControls: () => controls.enabled = false,
  };
}