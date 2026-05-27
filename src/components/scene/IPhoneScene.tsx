import { Canvas } from '@react-three/fiber'
import { PresentationControls, Float, Environment, ContactShadows } from '@react-three/drei'
import IPhoneModel from './IPhoneModel'

export default function IPhoneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 35 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} castShadow />

      <Environment preset="apartment" />

      <PresentationControls
        global
        rotation={[0.05, -0.2, 0]}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 300 }}
      >
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.25}>
          <IPhoneModel />
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.15}
        scale={3}
        blur={2.5}
        far={1.5}
      />
    </Canvas>
  )
}
