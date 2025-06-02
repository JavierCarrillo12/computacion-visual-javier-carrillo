import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // color cielo claro
    scene.fog = new THREE.Fog(0x87ceeb, 10, 50); // mismo color que el cielo

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Controles de cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Configurar iluminación
    const configurarIluminacion = (scene: THREE.Scene) => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Luz ambiental suave
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(30, 50, 30); // Sol más alto y lateral
      scene.add(directionalLight);
    };
    configurarIluminacion(scene);

    // Función para crear el terreno
    const crearTerreno = (
      width: number,
      depth: number,
      material: THREE.Material
    ): number[][] => {
      const size = 1;
      const maxHeight = 5;
      const heightMap: number[][] = [];

      for (let x = 0; x < width; x++) {
        heightMap[x] = [];
        for (let z = 0; z < depth; z++) {
          const height = Math.floor(Math.random() * maxHeight) + 1;
          heightMap[x][z] = height;

          for (let y = 0; y < height; y++) {
            const geometry = new THREE.BoxGeometry(size, size, size);
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x * size, y * size, z * size);
            scene.add(cube);
          }
        }
      }

      return heightMap;
    };

    // Función para crear formas primitivas
    const crearObjeto = (
      tipo: string,
      posicion: THREE.Vector3,
      material: THREE.Material
    ) => {
      let geometry: THREE.BufferGeometry;

      switch (tipo) {
        case "esfera":
          geometry = new THREE.SphereGeometry(0.5, 16, 16);
          break;
        case "cilindro":
          geometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 16);
          break;
        case "cono":
          geometry = new THREE.ConeGeometry(0.5, 1, 16);
          break;
        case "toro":
          geometry = new THREE.TorusGeometry(0.4, 0.1, 16, 100);
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(posicion);
      scene.add(mesh);
    };

    const aguaGeo = new THREE.PlaneGeometry(40, 40);
    const aguaMat = new THREE.MeshStandardMaterial({
      color: 0x1ca3ec,
      transparent: true,
      opacity: 0.4,
    });
    const agua = new THREE.Mesh(aguaGeo, aguaMat);
    agua.rotation.x = -Math.PI / 2;
    agua.position.y = 1; // Ajusta a la altura deseada
    scene.add(agua);

    // Función para crear arboles
    const crearArbol = (x: number, y: number, z: number) => {
      const troncoGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
      const troncoMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // marrón
      const tronco = new THREE.Mesh(troncoGeo, troncoMat);

      const copaGeo = new THREE.SphereGeometry(0.5, 12, 12);
      const copaMat = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // verde bosque
      const copa = new THREE.Mesh(copaGeo, copaMat);

      tronco.position.set(x, y + 0.5, z);
      copa.position.set(x, y + 1.3, z);

      const arbol = new THREE.Group();
      arbol.add(tronco);
      arbol.add(copa);
      scene.add(arbol);
    };

    // Función para crear un animal simple (cuerpo + cabeza + patas)
    const crearAnimal = (x: number, y: number, z: number) => {
      const cuerpoGeo = new THREE.BoxGeometry(1, 0.6, 0.6);
      const cuerpoMat = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // rosado tipo cerdito
      const cuerpo = new THREE.Mesh(cuerpoGeo, cuerpoMat);
      cuerpo.position.set(x, y + 0.3, z);

      const cabezaGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const cabeza = new THREE.Mesh(cabezaGeo, cuerpoMat);
      cabeza.position.set(x + 0.6, y + 0.4, z);

      // Patas (4 pequeñas cajas)
      const pataGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const patas: THREE.Mesh[] = [];
      const offsets = [
        [-0.3, 0, -0.2],
        [0.3, 0, -0.2],
        [-0.3, 0, 0.2],
        [0.3, 0, 0.2],
      ];

      offsets.forEach(([dx, dy, dz]) => {
        const pata = new THREE.Mesh(pataGeo, cuerpoMat);
        pata.position.set(x + dx, y, z + dz);
        patas.push(pata);
      });

      const animal = new THREE.Group();
      animal.add(cuerpo);
      animal.add(cabeza);
      patas.forEach((p) => animal.add(p));

      scene.add(animal);
    };

    // Cargar texturas y crear material PBR
    const loader = new THREE.TextureLoader();
    const grassAlbedo = loader.load(
      "/textures/grasss/Grass001_1K-JPG_Color.jpg"
    );
    const grassNormal = loader.load(
      "/textures/grasss/Grass001_1K-JPG_NormalGL.jpg"
    );
    const grassRoughness = loader.load(
      "/textures/grasss/Grass001_1K-JPG_Roughness.jpg"
    );
    const grassAO = loader.load(
      "/textures/grasss/Grass001_1K-JPG_AmbientOcclusion.jpg"
    );

    const grassMaterial = new THREE.MeshStandardMaterial({
      map: grassAlbedo,
      normalMap: grassNormal,
      roughnessMap: grassRoughness,
      aoMap: grassAO,
    });

    // Crear terreno y formas decorativas
    const terrenoMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // verde bosque
    const heightMap = crearTerreno(20, 20, terrenoMaterial);
    crearObjeto("esfera", new THREE.Vector3(5, 5, 5), grassMaterial);
    crearObjeto("cilindro", new THREE.Vector3(8, 3, 8), grassMaterial);
    crearObjeto("cono", new THREE.Vector3(10, 5, 10), grassMaterial);
    // Crear varios árboles en posiciones aleatorias sobre el terreno
    for (let i = 0; i < 50; i++) {
      const x = Math.floor(Math.random() * 20);
      const z = Math.floor(Math.random() * 20);
      const y = 2; // Altura base (ajústala según la altura promedio del terreno)
      crearArbol(x, y, z);
    }
    // Crear varios animales en posiciones aleatorias
    for (let i = 0; i < 4; i++) {
      const x = Math.floor(Math.random() * 20);
      const z = Math.floor(Math.random() * 20);
      const y = heightMap[x][z]; // altura correcta en esa columna
      crearAnimal(x, y, z);
    }

    camera.position.set(20, 25, 20);
    controls.target.set(10, 0, 10);
    controls.update();

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpiar al desmontar
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    />
  );
};

export default App;
