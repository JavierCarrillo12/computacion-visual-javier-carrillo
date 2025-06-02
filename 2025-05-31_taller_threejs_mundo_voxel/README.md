# 🌍 Proyecto Mundo Voxel en React + Three.js

Este proyecto simula un mundo estilo Minecraft utilizando `@react-three/fiber` y `three.js`. El terreno, los árboles, animales y decoraciones se generan proceduralmente con funciones personalizadas. La cámara y controles permiten explorar el entorno en 3D.

---

## 📦 Estructura del Proyecto

```
2025-05-21_taller_threejs_mundo_voxel/
├── public/
│   └── textures/
│       └── grasss/
│           ├── Grass001_1K-JPG_Color.jpg
│           ├── Grass001_1K-JPG_NormalGL.jpg
│           ├── Grass001_1K-JPG_Roughness.jpg
│           └── Grass001_1K-JPG_AmbientOcclusion.jpg
├── src/
│   └── App.tsx
├── package.json
├── tsconfig.json
├── index.html
├── README.md
└── capturas/
    ├── mundo_voxel_01.png
    ├── mundo_voxel_02.png
    └── mundo_voxel_03.png
````

---

## 📘 Ejemplos de Funciones Usadas

```js
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
````

---

## 🌱 Elementos del Mundo

- Terreno voxel generado mediante cubos (BoxGeometry) con alturas aleatorias por columna.
- Árboles simples, formados por un tronco cilíndrico y una copa esférica, generados en posiciones aleatorias.
- Animales básicos construidos con BoxGeometry agrupados en cuerpo, cabeza y patas.
- Distribución procedural de árboles y animales basada en un mapa de alturas (heightMap).
Todos los elementos están organizados en grupos (THREE.Group) para facilitar su manipulación y visualización en la escena.



---

## 🎨 Material PBR Ejemplo

Se aplica un material físico realista (PBR) al terreno utilizando mapas de texturas descargados de ambientCG:

```js
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassAlbedo,
  normalMap: grassNormal,
  roughnessMap: grassRoughness,
  aoMap: grassAO,
});
```
En App.tsx, las texturas se cargan con THREE.TextureLoader() y se aplican a cada cubo del terreno en la función crearTerreno(...). Estas texturas simulan superficies de césped con detalle visual mediante mapas de normal, rugosidad y oclusión ambiental.

Posteriormente, el material fue reemplazado por un color sólido (0x228B22) para mantener coherencia visual con los árboles.
---
---

## 🌍 Vista General del Mundo

🧱 Primera versión – Terreno con texturas y figuras geométricas
En esta etapa se genera un terreno voxel con alturas aleatorias. Se aplican texturas PBR realistas y se agregan figuras primitivas (Sphere, Cylinder, Cone) para probar la integración de geometrías en el entorno.

![Primera-versión-terreno-aplicación_de_texturas](https://github.com/user-attachments/assets/2ecbd03d-3a28-4851-b701-976bd6fc5ad8)

🌳 Versión final – Mundo completo con árboles y criaturas
Aquí se integran elementos naturales generados proceduralmente: árboles compuestos por cilindros y esferas, y animales simples creados con cajas. Todo se distribuye aleatoriamente sobre el terreno usando un mapa de alturas, logrando un entorno interactivo y visualmente coherente.

![Versión_Final_terreno_arboles_animales](https://github.com/user-attachments/assets/b3db8560-5467-415b-a236-ec3ee6690220)


---

## 💡 Reflexión

Este proyecto evidencia cómo, a partir de formas geométricas básicas como cajas, esferas y cilindros, es posible construir un mundo 3D inmersivo y coherente visualmente. Al combinar y posicionar estas formas con lógica procedural, se logran composiciones que evocan elementos naturales sin recurrir a modelos complejos.

La inclusión de aleatoriedad en la generación del terreno, árboles y criaturas aporta dinamismo y variedad, haciendo que cada ejecución del mundo sea ligeramente diferente y fomentando tanto la experimentación como el sentido de descubrimiento.

---

## 🚀 Requisitos

* React
* @react-three/fiber
* three
* @react-three/drei

Instalar dependencias:

```bash
npm install three @react-three/fiber @react-three/drei
```

---

## 🕹️ Controles

* **Clic y arrastra**: Rotar cámara
* **Scroll**: Zoom in/out
* **Clic derecho + mover**: Paneo

---

## 🧪 Ejecutar el proyecto

```bash
npm run dev
```

---

