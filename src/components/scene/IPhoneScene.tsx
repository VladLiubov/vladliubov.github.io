import { useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PresentationControls, Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import IPhoneModel from './IPhoneModel'

// ── Smooth camera zoom (runs inside Canvas) ───────────────────────────────────
function CameraRig({ zoomed }: { zoomed: boolean }) {
  const { camera } = useThree()
  useFrame(() => {
    const targetZ = zoomed ? 2.0 : 3.5
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.055)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.055)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.055)
  })
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  onZoomedChange?: (zoomed: boolean) => void
}

export default function IPhoneScene({ onZoomedChange }: Props) {
  const [wheelDragging, setWheelDragging] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  function setZoom(val: boolean) {
    setZoomed(val)
    onZoomedChange?.(val)
  }

  // Escape key exits zoom
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && zoomed) setZoom(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 35 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <CameraRig zoomed={zoomed} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} castShadow />

        <Environment preset="apartment" />

        <PresentationControls
          global
          enabled={!wheelDragging && !zoomed}
          rotation={[0.05, -0.2, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          snap
        >
          <Float
            speed={wheelDragging || zoomed ? 0 : 1.5}
            rotationIntensity={0}
            floatIntensity={0.25}
          >
            <IPhoneModel
              onWheelDragChange={setWheelDragging}
              onTap={zoomed ? undefined : () => setZoom(true)}
            />
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

      {/* ── Close button (shown when zoomed) ─────────────────── */}
      {zoomed && (
        <button
          onClick={() => setZoom(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '1px solid rgba(100,80,180,0.35)',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(60,40,120,0.85)',
            fontSize: 17,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
          aria-label="Close zoom"
        >
          ✕
        </button>
      )}

      {/* ── "Tap to explore" hint (shown when not zoomed) ─────── */}
      {!zoomed && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11,
            color: 'rgba(108,92,231,0.55)',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          tap to explore
        </div>
      )}
    </div>
  )
}
