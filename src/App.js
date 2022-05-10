import * as THREE from 'three'
import { useMemo,  } from 'react'
import { Canvas, applyProps } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'


export const App = () => (
  <Canvas shadows dpr={[1, 2]} camera={{ position: [-10, 0, 15], fov: 30 }}>
    <OrbitControls />
    <Porsche scale={0.6} position={[-2, -0.78, 0]} />
    <Porsche scale={0.6} position={[2, -0.78, 0]} />
    <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={7} shadow-bias={-0.0001} />
  </Canvas>
)

function Porsche(props) {
  const { scene, nodes, materials } = useGLTF('/911-transformed.glb')
  useMemo(() => {
    Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
    applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
    applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 })
    applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
    applyProps(materials.paint, { roughness: 0.5, metalness: 0.8, color: '#555', envMapIntensity: 2 })
  }, [nodes, materials])
  const copiedScene = useMemo(() => scene.clone(), [scene])
  return <primitive object={copiedScene} {...props} />
}
