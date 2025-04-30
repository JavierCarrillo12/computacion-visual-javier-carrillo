import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function MiCubo() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Movimiento circular
    meshRef.current.position.x = Math.sin(t) * 2
    meshRef.current.position.y = Math.cos(t) * 2

    // Rotación sobre su propio eje
    meshRef.current.rotation.x = t
    meshRef.current.rotation.y = t

    // Escalado suave
    meshRef.current.scale.set(
      1 + 0.5 * Math.sin(t), 
      1 + 0.5 * Math.sin(t), 
      1 + 0.5 * Math.sin(t)
    )
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MiCubo />
      <OrbitControls />
    </Canvas>
  )
}
