import { RoundedBox } from '@react-three/drei'
import CVScreen from './CVScreen'

const W = 0.72
const H = 1.47
const D = 0.09
const R = 0.055

interface Props {
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

export default function IPhoneModel({ onPointerEnter, onPointerLeave }: Props) {
  return (
    <group onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {/* Phone body — Space Black titanium */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={8}>
        <meshPhysicalMaterial
          color="#1c1c1e"
          metalness={0.92}
          roughness={0.08}
          envMapIntensity={3}
          clearcoat={0.6}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>

      {/* Screen glass — very dark, slight blue tint */}
      <mesh position={[0, 0.025, D / 2 + 0.001]}>
        <planeGeometry args={[W - 0.05, H - 0.07]} />
        <meshPhysicalMaterial
          color="#050508"
          roughness={0}
          metalness={0}
          transmission={0.05}
          reflectivity={0.6}
        />
      </mesh>

      {/* Dynamic Island */}
      <mesh
        position={[0, H / 2 - 0.075, D / 2 + 0.003]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <capsuleGeometry args={[0.016, 0.065, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Home indicator */}
      <mesh position={[0, -(H / 2 - 0.065), D / 2 + 0.002]}>
        <planeGeometry args={[0.18, 0.005]} />
        <meshBasicMaterial color="#3a3a3c" />
      </mesh>

      {/* Side buttons — titanium dark */}
      <mesh position={[-(W / 2 + 0.005), 0.3, 0]}>
        <boxGeometry args={[0.01, 0.09, D - 0.02]} />
        <meshPhysicalMaterial color="#2c2c2e" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-(W / 2 + 0.005), 0.16, 0]}>
        <boxGeometry args={[0.01, 0.09, D - 0.02]} />
        <meshPhysicalMaterial color="#2c2c2e" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[W / 2 + 0.005, 0.22, 0]}>
        <boxGeometry args={[0.01, 0.14, D - 0.02]} />
        <meshPhysicalMaterial color="#2c2c2e" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Camera module bump */}
      <mesh position={[-(W / 2 - 0.12), H / 2 - 0.22, -(D / 2 + 0.005)]}>
        <boxGeometry args={[0.22, 0.22, 0.01]} />
        <meshPhysicalMaterial color="#111113" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[-(W / 2 - 0.09), H / 2 - 0.18, -(D / 2 + 0.011)]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 32]} />
        <meshPhysicalMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-(W / 2 - 0.15), H / 2 - 0.18, -(D / 2 + 0.011)]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 32]} />
        <meshPhysicalMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-(W / 2 - 0.09), H / 2 - 0.26, -(D / 2 + 0.011)]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 32]} />
        <meshPhysicalMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>

      <CVScreen />
    </group>
  )
}
