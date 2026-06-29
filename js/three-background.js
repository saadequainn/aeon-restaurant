/* ============================================
   Three.js 3D Hero Background — Food Objects
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // ---- Scene Setup ----
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 12);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // ---- Lights ----
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
  scene.add(ambientLight);

  const warmLight = new THREE.DirectionalLight(0xd4a574, 0.8);
  warmLight.position.set(5, 8, 6);
  scene.add(warmLight);

  const fillLight = new THREE.DirectionalLight(0x722f37, 0.4);
  fillLight.position.set(-5, 3, -4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xf5e6d3, 0.3);
  rimLight.position.set(0, -2, -8);
  scene.add(rimLight);

  // Warm point lights
  const pointLight1 = new THREE.PointLight(0xd4a574, 0.5, 12);
  pointLight1.position.set(-3, 2, 2);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x722f37, 0.3, 12);
  pointLight2.position.set(4, -1, 3);
  scene.add(pointLight2);

  // =============================================
  //  FOOD OBJECTS — All objects array
  // =============================================
  const objects = [];

  // =============================================
  //  1. BURGER
  // =============================================
  function createBurger(x, y, z) {
    const group = new THREE.Group();

    // Bottom bun
    const bottomBun = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 24, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5),
      new THREE.MeshPhysicalMaterial({ color: 0xd4a050, roughness: 0.9, metalness: 0 })
    );
    bottomBun.position.y = -0.25;
    bottomBun.scale.y = 0.3;
    group.add(bottomBun);

    // Patty
    const patty = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.12, 24),
      new THREE.MeshPhysicalMaterial({ color: 0x5a3a2a, roughness: 0.95, metalness: 0 })
    );
    patty.position.y = 0;
    group.add(patty);

    // Cheese
    const cheese = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.04, 0.55),
      new THREE.MeshPhysicalMaterial({ color: 0xf0c040, roughness: 0.7, metalness: 0, emissive: 0xf0c040, emissiveIntensity: 0.05 })
    );
    cheese.position.y = 0.08;
    group.add(cheese);

    // Lettuce (wavy thin box)
    const lettuce = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.55, 24),
      new THREE.MeshPhysicalMaterial({ color: 0x4a8a3a, roughness: 0.9, metalness: 0, side: THREE.DoubleSide })
    );
    lettuce.position.y = 0.14;
    lettuce.rotation.x = -Math.PI / 2;
    group.add(lettuce);

    // Tomato slice
    const tomato = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.45, 0.06, 16),
      new THREE.MeshPhysicalMaterial({ color: 0xcc3333, roughness: 0.8, metalness: 0 })
    );
    tomato.position.y = 0.2;
    group.add(tomato);

    // Top bun
    const topBun = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
      new THREE.MeshPhysicalMaterial({ color: 0xe0b060, roughness: 0.9, metalness: 0 })
    );
    topBun.position.y = 0.3;
    topBun.scale.y = 0.6;
    group.add(topBun);

    // Sesame seeds
    for (let i = 0; i < 6; i++) {
      const seed = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 6, 6),
        new THREE.MeshPhysicalMaterial({ color: 0xffeecc, roughness: 0.5 })
      );
      const angle = (i / 6) * Math.PI * 2 + 0.3;
      seed.position.set(Math.cos(angle) * 0.3, 0.45, Math.sin(angle) * 0.3);
      group.add(seed);
    }

    group.position.set(x, y, z);
    group.scale.set(1, 1, 1);
    group.userData = {
      rotationSpeed: { x: 0.005, y: 0.03, z: 0.003 },
      floatAmplitude: 0.15,
      floatSpeed: 0.4,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  2. SUSHI ROLL (2 pieces)
  // =============================================
  function createSushi(x, y, z) {
    const group = new THREE.Group();

    // Sushi rice base
    const riceMat = new THREE.MeshPhysicalMaterial({ color: 0xfffff0, roughness: 0.9, metalness: 0 });

    // Piece 1
    const rice1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.15, 12), riceMat);
    rice1.position.set(-0.2, 0, 0);
    group.add(rice1);

    // Salmon topping 1
    const salmon1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.05, 0.2),
      new THREE.MeshPhysicalMaterial({ color: 0xff7744, roughness: 0.6, metalness: 0.1, emissive: 0xff7744, emissiveIntensity: 0.03 })
    );
    salmon1.position.set(-0.2, 0.1, 0);
    group.add(salmon1);

    // Piece 2
    const rice2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.15, 12), riceMat);
    rice2.position.set(0.2, 0, 0);
    group.add(rice2);

    // Tuna topping 2
    const tuna2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.05, 0.2),
      new THREE.MeshPhysicalMaterial({ color: 0xcc2244, roughness: 0.6, metalness: 0.1, emissive: 0xcc2244, emissiveIntensity: 0.03 })
    );
    tuna2.position.set(0.2, 0.1, 0);
    group.add(tuna2);

    // Nori band piece 1
    const nori1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.15, 0.22),
      new THREE.MeshPhysicalMaterial({ color: 0x1a2a1a, roughness: 0.95 })
    );
    nori1.position.set(-0.2, 0.02, 0.12);
    group.add(nori1);

    const nori2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.15, 0.22),
      new THREE.MeshPhysicalMaterial({ color: 0x1a2a1a, roughness: 0.95 })
    );
    nori2.position.set(-0.2, 0.02, -0.12);
    group.add(nori2);

    // Small soy sauce dish underneath
    const dish = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.4, 0.04, 16),
      new THREE.MeshPhysicalMaterial({ color: 0x333333, roughness: 0.3, metalness: 0.6 })
    );
    dish.position.y = -0.1;
    group.add(dish);

    group.position.set(x, y, z);
    group.scale.set(1.2, 1.2, 1.2);
    group.userData = {
      rotationSpeed: { x: 0.01, y: 0.04, z: 0.005 },
      floatAmplitude: 0.15,
      floatSpeed: 0.5,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  3. WINE BOTTLE
  // =============================================
  function createWineBottle(x, y, z) {
    const group = new THREE.Group();

    // Bottle body
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a4a2a,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.8, 16), bodyMat);
    body.position.y = 0.4;
    group.add(body);

    // Bottle neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.3, 12),
      new THREE.MeshPhysicalMaterial({ color: 0x2a4a2a, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.6 })
    );
    neck.position.y = 0.95;
    group.add(neck);

    // Wine liquid inside (visible through glass)
    const liquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.55, 16),
      new THREE.MeshPhysicalMaterial({
        color: 0x722f37,
        roughness: 0.1,
        metalness: 0,
        transparent: true,
        opacity: 0.5,
        emissive: 0x722f37,
        emissiveIntensity: 0.05,
      })
    );
    liquid.position.y = 0.35;
    group.add(liquid);

    // Label
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.25),
      new THREE.MeshPhysicalMaterial({
        color: 0xf5e6d3,
        roughness: 0.8,
        metalness: 0,
        side: THREE.DoubleSide,
      })
    );
    label.position.set(0.22, 0.45, 0);
    group.add(label);

    // Cork
    const cork = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.07, 0.06, 8),
      new THREE.MeshPhysicalMaterial({ color: 0x8a7a5a, roughness: 0.95 })
    );
    cork.position.y = 1.12;
    group.add(cork);

    group.position.set(x, y, z);
    group.scale.set(1, 1, 1);
    group.userData = {
      rotationSpeed: { x: 0.005, y: 0.025, z: 0.002 },
      floatAmplitude: 0.1,
      floatSpeed: 0.35,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  4. COCKTAIL GLASS
  // =============================================
  function createCocktail(x, y, z) {
    const group = new THREE.Group();

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    });

    // Martini glass bowl (cone shape)
    const bowl = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.35, 24),
      glassMat
    );
    bowl.position.y = 0.35;
    bowl.scale.y = 0.8;
    group.add(bowl);

    // Liquid inside
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0a040,
      roughness: 0.1,
      metalness: 0,
      transparent: true,
      opacity: 0.4,
      emissive: 0xf0a040,
      emissiveIntensity: 0.03,
    });
    const liquid = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.15, 24), liquidMat);
    liquid.position.y = 0.2;
    liquid.scale.y = 0.8;
    group.add(liquid);

    // Stem
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.4, 8),
      glassMat
    );
    stem.position.y = 0.0;
    group.add(stem);

    // Base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.18, 0.03, 16),
      glassMat
    );
    base.position.y = -0.2;
    group.add(base);

    // Garnish (lemon slice on rim)
    const garnish = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.08, 12),
      new THREE.MeshPhysicalMaterial({ color: 0xffdd44, roughness: 0.8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
    );
    garnish.position.set(0.25, 0.55, 0);
    garnish.rotation.x = Math.PI / 3;
    group.add(garnish);

    group.position.set(x, y, z);
    group.scale.set(1.2, 1.2, 1.2);
    group.userData = {
      rotationSpeed: { x: 0.008, y: 0.03, z: 0.004 },
      floatAmplitude: 0.18,
      floatSpeed: 0.45,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  5. PLATED STEAK / MAIN COURSE
  // =============================================
  function createSteakPlate(x, y, z) {
    const group = new THREE.Group();

    // Plate
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.15,
    });
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 0.05, 24), plateMat);
    plate.position.y = 0;
    group.add(plate);

    // Plate rim
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.04, 12, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.3,
        transparent: true,
        opacity: 0.1,
      })
    );
    rim.position.y = 0.03;
    rim.rotation.x = Math.PI / 2;
    group.add(rim);

    // Steak
    const steakMat = new THREE.MeshPhysicalMaterial({
      color: 0x6a3a2a,
      roughness: 0.9,
      metalness: 0,
      emissive: 0x6a3a2a,
      emissiveIntensity: 0.02,
    });
    const steak = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.4), steakMat);
    steak.position.set(0.05, 0.06, 0.05);
    steak.scale.set(1.5, 0.5, 1.2);
    steak.rotation.z = 0.2;
    group.add(steak);

    // Steak top (seared)
    const sear = new THREE.Mesh(
      new THREE.SphereGeometry(0.23, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.3),
      new THREE.MeshPhysicalMaterial({ color: 0x4a2a1a, roughness: 0.95 })
    );
    sear.position.set(0.05, 0.08, 0.05);
    sear.scale.set(1.4, 0.3, 1.1);
    sear.rotation.z = 0.2;
    group.add(sear);

    // Garnish (rosemary sprig)
    const herbMat = new THREE.MeshPhysicalMaterial({ color: 0x3a7a2a, roughness: 0.9 });
    for (let i = 0; i < 3; i++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.002, 0.1), herbMat);
      leaf.position.set(-0.15 + i * 0.04, 0.06, 0.2 + i * 0.03);
      leaf.rotation.z = 0.3 + i * 0.2;
      group.add(leaf);
    }

    group.position.set(x, y, z);
    group.scale.set(1, 1, 1);
    group.userData = {
      rotationSpeed: { x: 0.003, y: 0.02, z: 0.001 },
      floatAmplitude: 0.08,
      floatSpeed: 0.3,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  6. DESSERT PLATE (cake slice)
  // =============================================
  function createDessert(x, y, z) {
    const group = new THREE.Group();

    // Small plate
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.12,
    });
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.04, 20), plateMat);
    plate.position.y = 0;
    group.add(plate);

    // Cake base (wedge)
    const cakeMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a070, roughness: 0.8 });
    const cake = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.2), cakeMat);
    cake.position.set(0, 0.08, 0);
    group.add(cake);

    // Cake top layer
    const topLayer = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.06, 0.18),
      new THREE.MeshPhysicalMaterial({ color: 0xee8844, roughness: 0.7, emissive: 0xee8844, emissiveIntensity: 0.02 })
    );
    topLayer.position.set(0, 0.17, 0);
    group.add(topLayer);

    // Glaze drip
    const glaze = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8, 0, Math.PI * 2, Math.PI * 0.6, Math.PI * 0.4),
      new THREE.MeshPhysicalMaterial({ color: 0xcc5533, roughness: 0.4, metalness: 0.1 })
    );
    glaze.position.set(0, 0.2, 0.05);
    glaze.scale.set(1, 0.4, 0.8);
    group.add(glaze);

    // Cherry on top
    const cherry = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshPhysicalMaterial({ color: 0xcc1133, roughness: 0.5, metalness: 0.2 })
    );
    cherry.position.set(0, 0.28, 0.05);
    group.add(cherry);

    // Cherry stem
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.003, 0.003, 0.05, 4),
      new THREE.MeshPhysicalMaterial({ color: 0x2a5a2a })
    );
    stem.position.set(0, 0.31, 0.05);
    stem.rotation.z = 0.3;
    group.add(stem);

    group.position.set(x, y, z);
    group.scale.set(1.3, 1.3, 1.3);
    group.userData = {
      rotationSpeed: { x: 0.005, y: 0.035, z: 0.002 },
      floatAmplitude: 0.12,
      floatSpeed: 0.38,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // =============================================
  //  7. FLOATING FRUITS & INGREDIENTS
  // =============================================
  function createFruit(x, y, z, type) {
    const group = new THREE.Group();

    if (type === 'lemon') {
      const lemon = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshPhysicalMaterial({ color: 0xffee44, roughness: 0.6, metalness: 0 })
      );
      lemon.scale.set(1, 0.8, 0.8);
      group.add(lemon);
    } else if (type === 'lime') {
      const lime = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 12, 12),
        new THREE.MeshPhysicalMaterial({ color: 0x55bb33, roughness: 0.6 })
      );
      lime.scale.set(1, 0.8, 0.8);
      group.add(lime);
    } else if (type === 'tomato') {
      const tomato = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 12, 12),
        new THREE.MeshPhysicalMaterial({ color: 0xdd3333, roughness: 0.7 })
      );
      group.add(tomato);
      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.008, 0.04, 4),
        new THREE.MeshPhysicalMaterial({ color: 0x3a6a2a })
      );
      stem.position.y = 0.12;
      group.add(stem);
    } else if (type === 'mushroom') {
      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, 0.08, 8),
        new THREE.MeshPhysicalMaterial({ color: 0xeeddcc, roughness: 0.9 })
      );
      stem.position.y = 0.04;
      group.add(stem);
      // Cap
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
        new THREE.MeshPhysicalMaterial({ color: 0x8a6a4a, roughness: 0.9 })
      );
      cap.position.y = 0.1;
      group.add(cap);
    } else if (type === 'chili') {
      const chili = new THREE.Mesh(
        new THREE.ConeGeometry(0.04, 0.18, 8),
        new THREE.MeshPhysicalMaterial({ color: 0xcc2222, roughness: 0.7 })
      );
      chili.rotation.z = Math.PI / 4;
      group.add(chili);
      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.008, 0.03, 4),
        new THREE.MeshPhysicalMaterial({ color: 0x2a5a2a })
      );
      top.position.set(0.06, 0.1, 0);
      group.add(top);
    }

    group.position.set(x, y, z);
    group.scale.set(1.5, 1.5, 1.5);
    group.userData = {
      rotationSpeed: { x: (Math.random() - 0.5) * 0.04, y: (Math.random() - 0.5) * 0.04, z: (Math.random() - 0.5) * 0.02 },
      floatAmplitude: 0.15 + Math.random() * 0.1,
      floatSpeed: 0.4 + Math.random() * 0.3,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    objects.push(group);
    return group;
  }

  // ---- SPAWN ALL FOOD ITEMS ----
  // Main dishes (close and large)
  createBurger(-2.5, -0.2, -2);
  createSushi(2.8, 0.0, -1.5);
  createWineBottle(-3.8, 1.2, -3);
  createCocktail(3.5, -0.5, -2.5);
  createSteakPlate(-0.8, -0.8, -3.5);
  createDessert(1.5, 1.5, -3);

  // Floating fruits / ingredients (scattered around)
  const fruitTypes = ['lemon', 'lime', 'tomato', 'mushroom', 'chili', 'lemon', 'tomato', 'lime'];
  const fruitPositions = [
    [-4, 0.5, -4], [4.5, -0.8, -4.5], [-5, -0.3, -3], [5.2, 0.6, -3.5],
    [-3, 1.8, -4.5], [0.5, 2, -4], [-1.2, -1.5, -5], [3, -1.2, -5],
  ];

  fruitPositions.forEach((pos, i) => {
    createFruit(pos[0], pos[1], pos[2], fruitTypes[i % fruitTypes.length]);
  });

  // =============================================
  //  AMBIENT SPARKLE PARTICLES
  // =============================================
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 20;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
    particleSizes[i] = 0.01 + Math.random() * 0.02;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMat = new THREE.PointsMaterial({
    color: 0xd4a574,
    size: 0.015,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // =============================================
  //  MOUSE TRACKING
  // =============================================
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // =============================================
  //  RESIZE
  // =============================================
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onResize);

  // =============================================
  //  ANIMATION LOOP
  // =============================================
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    // Animate all food objects
    objects.forEach(obj => {
      if (obj.userData.rotationSpeed) {
        const rs = obj.userData.rotationSpeed;
        obj.rotation.x += rs.x || 0;
        obj.rotation.y += rs.y || 0;
        obj.rotation.z += rs.z || 0;
      }

      if (obj.userData.floatAmplitude) {
        const floatY = Math.sin(elapsed * obj.userData.floatSpeed + obj.userData.floatOffset) * obj.userData.floatAmplitude;
        obj.position.y += floatY * 0.005;
      }
    });

    // Gentle camera sway
    camera.position.x += (targetX * 1.2 - camera.position.x) * 0.005;
    camera.position.y += (targetY * 0.8 - camera.position.y + 1.5) * 0.005;
    camera.lookAt(0, 0.5, 0);

    renderer.render(scene, camera);
  }

  animate();
})();