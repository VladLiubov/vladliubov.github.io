import { RoundedBox } from '@react-three/drei'
import CVScreen from './CVScreen'

// iPhone 15 Pro proportions in Three.js units
const W = 0.72    // width
const H = 1.47    // height
const D = 0.09    // depth
const R = 0.055   // corner radius

interface Props {
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

export default function IPhoneModel({ onPointerEnter, onPointerLeave }: Props) {
  return (
    <group onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {/* Phone body — polished titanium-like frame + glass back */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={6}>
        <meshPhysicalMaterial
          color="#e2e2e7"
          metalness={0.4}
          roughness={0.05}
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </RoundedBox>

      {/* Screen — dark OLED base */}
      <mesh position={[0, 0.025, D / 2 + 0.001]}>
        <planeGeometry args={[W - 0.05, H - 0.07]} />
        <meshBasicMaterial color="#0d0d0f" />
      </mesh>

      {/* Dynamic Island — horizontal pill */}
      <mesh
        position={[0, H / 2 - 0.09, D / 2 + 0.002]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <capsuleGeometry args={[0.018, 0.07, 4, 8]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {/* Home indicator bar */}
      <mesh position={[0, -(H / 2 - 0.07), D / 2 + 0.002]}>
        <planeGeometry args={[0.2, 0.007]} />
        <meshBasicMaterial color="#3a3a3c" />
      </mesh>

      {/* Side buttons — volume up */}
      <mesh position={[-(W / 2 + 0.005), 0.3, 0]}>
        <boxGeometry args={[0.01, 0.09, D - 0.02]} />
        <meshPhysicalMaterial color="#d0d0d5" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Side buttons — volume down */}
      <mesh position={[-(W / 2 + 0.005), 0.16, 0]}>
        <boxGeometry args={[0.01, 0.09, D - 0.02]} />
        <meshPhysicalMaterial color="#d0d0d5" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Side buttons — power */}
      <mesh position={[W / 2 + 0.005, 0.22, 0]}>
        <boxGeometry args={[0.01, 0.14, D - 0.02]} />
        <meshPhysicalMaterial color="#d0d0d5" metalness={0.6} roughness={0.2} />
      </mesh>

      <CVScreen />
    </group>
  )
}
