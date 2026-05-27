import { useEffect, useRef, useState } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { CV } from '../../data/cv'

const W = 0.74
const H = 1.25
const D = 0.12
const R = 0.022

const SCR_W = 0.60
const SCR_H = 0.45
const SCR_Y = 0.30

const WHEEL_Y = -0.22
const WHEEL_R = 0.20
const BTN_R = 0.088

const STEPS_PER_REV = 10
const STEP_ANGLE = (2 * Math.PI) / STEPS_PER_REV

const ITEMS = [
  { label: CV.name,       sub: CV.role },
  { label: 'Experience',  sub: 'RIA.com · CML Team · NewTone' },
  { label: 'Skills',      sub: 'Swift · SwiftUI · UIKit · RxSwift' },
  { label: 'Education',   sub: 'KPI Kyiv · Web Academy 2021' },
  { label: 'Contact',     sub: CV.email },
]

function buildScreenTexture(selectedIndex: number): THREE.CanvasTexture {
  const PW = 480, PH = 360
  const canvas = document.createElement('canvas')
  canvas.width = PW
  canvas.height = PH
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#e0e0e0'
  ctx.fillRect(0, 0, PW, PH)

  const HH = 52
  const hGrad = ctx.createLinearGradient(0, 0, 0, HH)
  hGrad.addColorStop(0, '#2e2e2e')
  hGrad.addColorStop(1, '#1a1a1a')
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, PW, HH)

  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '20px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('◀', 10, 34)

  ctx.fillStyle = 'white'
  ctx.font = 'bold 22px -apple-system, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Portfolio', PW / 2, 34)

  ctx.strokeStyle = 'rgba(255,255,255,0.55)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(PW - 42, 18, 28, 16)
  ctx.fillStyle = '#5ac45a'
  ctx.fillRect(PW - 41, 19, 20, 14)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.fillRect(PW - 14, 23, 3, 8)

  const rowH = (PH - HH) / ITEMS.length
  ITEMS.forEach((item, i) => {
    const y = HH + i * rowH
    const sel = i === selectedIndex

    if (sel) {
      const g = ctx.createLinearGradient(0, y, 0, y + rowH)
      g.addColorStop(0, '#5c9ee8')
      g.addColorStop(0.48, '#2d6fd4')
      g.addColorStop(0.52, '#1f5fc0')
      g.addColorStop(1, '#1650aa')
      ctx.fillStyle = g
    } else {
      ctx.fillStyle = i % 2 === 0 ? '#ececec' : '#e4e4e4'
    }
    ctx.fillRect(0, y, PW, rowH)

    ctx.fillStyle = sel ? 'rgba(0,40,100,0.18)' : '#cccccc'
    ctx.fillRect(0, y + rowH - 1, PW, 1)

    ctx.fillStyle = sel ? 'white' : '#111'
    ctx.font = 'bold 20px -apple-system, Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(item.label, 16, y + rowH * 0.40)

    ctx.fillStyle = sel ? 'rgba(255,255,255,0.76)' : '#606060'
    ctx.font = '15px -apple-system, Arial, sans-serif'
    ctx.fillText(item.sub, 16, y + rowH * 0.72)

    ctx.fillStyle = sel ? 'rgba(255,255,255,0.6)' : '#b0b0b0'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('›', PW - 14, y + rowH * 0.57)
  })

  return new THREE.CanvasTexture(canvas)
}

function buildWheelTexture(): THREE.CanvasTexture {
  const S = 512
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')!
  const cx = S / 2, cy = S / 2, r = S * 0.36

  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = 'rgba(155,155,155,0.85)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = `bold ${S * 0.07}px -apple-system, Arial, sans-serif`
  ctx.fillText('MENU', cx, cy - r)

  ctx.font = `bold ${S * 0.08}px sans-serif`
  ctx.fillText('◀◀', cx - r, cy)
  ctx.fillText('▶▶', cx + r, cy)

  ctx.font = `bold ${S * 0.07}px -apple-system, Arial, sans-serif`
  ctx.fillText('▶❙', cx, cy + r)

  return new THREE.CanvasTexture(canvas)
}

function playClick(audioCtxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    const ctx = audioCtxRef.current
    const len = Math.floor(ctx.sampleRate * 0.018)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    const gain = ctx.createGain()
    gain.gain.value = 0.28
    src.connect(gain)
    gain.connect(ctx.destination)
    src.start()
  } catch (_) {}
}

interface Props {
  onPointerEnter?: () => void
  onPointerLeave?: () => void
  onWheelDragChange?: (dragging: boolean) => void
}

export default function IPhoneModel({ onPointerEnter, onPointerLeave, onWheelDragChange }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const screenMeshRef = useRef<THREE.Mesh>(null)
  const wheelMeshRef = useRef<THREE.Mesh>(null)
  const isDragging = useRef(false)
  const lastAngle = useRef<number | null>(null)
  const angleAcc = useRef(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const screenTexRef = useRef(buildScreenTexture(0))
  const wheelTexRef = useRef(buildWheelTexture())

  const { gl, camera } = useThree()

  useEffect(() => {
    if (!screenMeshRef.current) return
    const newTex = buildScreenTexture(selectedIndex)
    const mat = screenMeshRef.current.material as THREE.MeshBasicMaterial
    if (mat.map) mat.map.dispose()
    mat.map = newTex
    mat.needsUpdate = true
    screenTexRef.current = newTex
  }, [selectedIndex])

  function computeAngle(e: PointerEvent): number {
    if (!wheelMeshRef.current) return 0
    const worldPos = new THREE.Vector3()
    wheelMeshRef.current.getWorldPosition(worldPos)
    const proj = worldPos.clone().project(camera)
    const rect = gl.domElement.getBoundingClientRect()
    const sx = ((proj.x + 1) / 2) * rect.width + rect.left
    const sy = ((-proj.y + 1) / 2) * rect.height + rect.top
    return Math.atan2(e.clientY - sy, e.clientX - sx)
  }

  function startWheelDrag(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    isDragging.current = true
    lastAngle.current = computeAngle(e.nativeEvent as PointerEvent)
    angleAcc.current = 0
    onWheelDragChange?.(true)
    document.body.style.cursor = 'grabbing'

    const canvas = gl.domElement

    function onMove(ev: PointerEvent) {
      if (!isDragging.current || lastAngle.current === null) return
      const cur = computeAngle(ev)
      let delta = cur - lastAngle.current
      if (delta > Math.PI) delta -= 2 * Math.PI
      if (delta < -Math.PI) delta += 2 * Math.PI
      lastAngle.current = cur
      angleAcc.current += delta

      while (angleAcc.current >= STEP_ANGLE) {
        angleAcc.current -= STEP_ANGLE
        setSelectedIndex(p => (p + 1) % ITEMS.length)
        playClick(audioCtxRef)
      }
      while (angleAcc.current <= -STEP_ANGLE) {
        angleAcc.current += STEP_ANGLE
        setSelectedIndex(p => (p - 1 + ITEMS.length) % ITEMS.length)
        playClick(audioCtxRef)
      }
    }

    function onUp() {
      isDragging.current = false
      lastAngle.current = null
      onWheelDragChange?.(false)
      document.body.style.cursor = 'auto'
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
  }

  return (
    <group onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {/* Body — gray aluminum */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={4}>
        <meshPhysicalMaterial
          color="#787878"
          metalness={0.88}
          roughness={0.10}
          envMapIntensity={2.5}
          clearcoat={0.4}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>

      {/* Screen bezel */}
      <mesh position={[0, SCR_Y, D / 2 + 0.0015]}>
        <planeGeometry args={[SCR_W + 0.025, SCR_H + 0.025]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Screen */}
      <mesh ref={screenMeshRef} position={[0, SCR_Y, D / 2 + 0.003]}>
        <planeGeometry args={[SCR_W, SCR_H]} />
        <meshBasicMaterial map={screenTexRef.current} />
      </mesh>

      {/* Click wheel — outer ring (interactive) */}
      <mesh
        ref={wheelMeshRef}
        position={[0, WHEEL_Y, D / 2 + 0.004]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={startWheelDrag}
        onPointerEnter={() => { document.body.style.cursor = 'grab' }}
        onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = 'auto' }}
      >
        <cylinderGeometry args={[WHEEL_R, WHEEL_R, 0.008, 64]} />
        <meshPhysicalMaterial color="#303030" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Wheel labels texture (also interactive so entire ring triggers drag) */}
      <mesh
        position={[0, WHEEL_Y, D / 2 + 0.009]}
        onPointerDown={startWheelDrag}
        onPointerEnter={() => { document.body.style.cursor = 'grab' }}
        onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = 'auto' }}
      >
        <planeGeometry args={[WHEEL_R * 2, WHEEL_R * 2]} />
        <meshBasicMaterial map={wheelTexRef.current} transparent alphaTest={0.01} />
      </mesh>

      {/* Separator ring */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.007]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[BTN_R + 0.012, BTN_R + 0.012, 0.004, 64]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Center button */}
      <mesh
        position={[0, WHEEL_Y, D / 2 + 0.010]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={e => { e.stopPropagation(); playClick(audioCtxRef) }}
        onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { document.body.style.cursor = 'auto' }}
      >
        <cylinderGeometry args={[BTN_R, BTN_R, 0.007, 64]} />
        <meshPhysicalMaterial color="#ddddd5" metalness={0.15} roughness={0.2} />
      </mesh>

      {/* Hold switch */}
      <mesh position={[0.14, H / 2 - 0.008, 0]}>
        <boxGeometry args={[0.12, 0.018, D + 0.004]} />
        <meshPhysicalMaterial color="#c0c0b8" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Headphone jack */}
      <mesh position={[-0.14, H / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, D + 0.006, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Dock connector */}
      <mesh position={[0, -(H / 2) + 0.008, 0]}>
        <boxGeometry args={[0.20, 0.018, D + 0.004]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
    </group>
  )
}
