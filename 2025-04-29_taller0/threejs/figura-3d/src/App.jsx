import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Componente del cubo con animaciones
const AnimatedBox = () => {
  // Usamos un ref para el objeto 3D
  const ref = React.useRef();

  // Animación con useFrame
  useFrame((state, delta) => {
    // Traslación senoidal (movimiento en X)
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2;

    // Rotación constante sobre el eje Y
    ref.current.rotation.y += delta;

    // Escalado con función temporal (Math.sin)
    ref.current.scale.set(
      1 + Math.sin(state.clock.elapsedTime) * 0.5,  // Oscilación de la escala
      1 + Math.sin(state.clock.elapsedTime) * 0.5,
      1 + Math.sin(state.clock.elapsedTime) * 0.5
    );
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      {/* Agregamos OrbitControls para poder navegar en la escena */}
      <OrbitControls />
      {/* Luz en la escena */}
      <ambientLight intensity={0.5} />
      <spotLight position={[30, 30, 30]} angle={0.15} intensity={1} />
      {/* Objeto 3D con animaciones */}
      <AnimatedBox />
    </Canvas>
  );
};

export default App;

