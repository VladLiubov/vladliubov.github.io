import { useEffect, useRef, useState } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { CV } from '../../data/cv'

// ── iPod Classic 7th gen (Space Grey) — 61.8 × 103.5 × 10.5 mm ──────────────
const W = 0.74
const H = 1.25
const D = 0.12
const R = 0.030   // subtle corner rounding

// Screen — 2.5" landscape 320×240 (4:3), upper portion
const SCR_W = 0.58
const SCR_H = SCR_W * (240 / 320)   // 0.435
const SCR_Y = 0.30

// Click wheel — ~47 mm diameter on 61.8 mm body
const WHEEL_Y = -0.245
const WHEEL_R = 0.268
const BTN_R   = 0.098

const STEPS_PER_REV = 10
const STEP_ANGLE    = (2 * Math.PI) / STEPS_PER_REV

const ITEMS = [
  { label: CV.name,      sub: CV.role },
  { label: 'Experience', sub: 'RIA.com · CML Team · NewTone' },
  { label: 'Skills',     sub: 'Swift · SwiftUI · UIKit · RxSwift' },
  { label: 'Education',  sub: 'KPI Kyiv · Web Academy 2021' },
  { label: 'Contact',    sub: CV.email },
]

// ── Screen texture — two-panel layout (menu left / art right) ─────────────────
function buildScreenTexture(selectedIndex: number): THREE.CanvasTexture {
  const PW = 480, PH = 360
  const canvas = document.createElement('canvas')
  canvas.width  = PW
  canvas.height = PH
  const ctx = canvas.getContext('2d')!

  const MENU_W = 318   // ~2/3 width

  // ── Right panel (album-art placeholder with portfolio accent) ─
  const artW = PW - MENU_W
  const artGrad = ctx.createLinearGradient(MENU_W, 0, PW, PH)
  artGrad.addColorStop(0, '#4a3fa0')
  artGrad.addColorStop(1, '#7c4dbd')
  ctx.fillStyle = artGrad
  ctx.fillRect(MENU_W, 0, artW, PH)

  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle    = 'rgba(255,255,255,0.90)'
  ctx.font         = `bold ${Math.floor(artW * 0.44)}px -apple-system, Arial, sans-serif`
  ctx.fillText('VL', MENU_W + artW / 2, PH / 2 - 6)
  ctx.font         = `${Math.floor(artW * 0.17)}px -apple-system, Arial, sans-serif`
  ctx.fillStyle    = 'rgba(255,255,255,0.55)'
  ctx.fillText('iOS Dev', MENU_W + artW / 2, PH * 0.73)
  ctx.textBaseline = 'alphabetic'

  // ── Header bar ───────────────────────────────────────────────
  const HH = 48
  const hGrad = ctx.createLinearGradient(0, 0, 0, HH)
  hGrad.addColorStop(0,   '#d4d4d4')
  hGrad.addColorStop(0.5, '#bcbcbc')
  hGrad.addColorStop(1,   '#a4a4a4')
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, MENU_W, HH)

  ctx.fillStyle = '#888'
  ctx.fillRect(0, HH - 1, MENU_W, 1)

  ctx.fillStyle = '#111'
  ctx.font      = 'bold 22px -apple-system, Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('iPod', 14, 32)

  ctx.fillStyle = '#333'
  ctx.font      = '15px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('▶', MENU_W - 56, 31)

  // Battery
  ctx.strokeStyle = '#555'
  ctx.lineWidth   = 1.5
  ctx.strokeRect(MENU_W - 48, 17, 30, 15)
  ctx.fillStyle   = '#5ac45a'
  ctx.fillRect(MENU_W - 47, 18, 22, 13)
  ctx.fillStyle   = '#555'
  ctx.fillRect(MENU_W - 18, 22, 3, 7)

  // ── Menu rows ────────────────────────────────────────────────
  const rowH = (PH - HH) / ITEMS.length
  ITEMS.forEach((item, i) => {
    const y   = HH + i * rowH
    const sel = i === selectedIndex

    if (sel) {
      const g = ctx.createLinearGradient(0, y, 0, y + rowH)
      g.addColorStop(0,    '#4a8fe8')
      g.addColorStop(0.48, '#2a6fd8')
      g.addColorStop(0.52, '#1a60cc')
      g.addColorStop(1,    '#1450b8')
      ctx.fillStyle = g
    } else {
      ctx.fillStyle = i % 2 === 0 ? '#f7f7f7' : '#f0f0f0'
    }
    ctx.fillRect(0, y, MENU_W, rowH)

    ctx.fillStyle = sel ? 'rgba(0,30,120,0.28)' : '#d8d8d8'
    ctx.fillRect(0, y + rowH - 1, MENU_W, 1)

    ctx.fillStyle = sel ? 'white' : '#111'
    ctx.font      = 'bold 19px -apple-system, Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(item.label, 14, y + rowH * 0.42)

    ctx.fillStyle = sel ? 'rgba(255,255,255,0.75)' : '#666'
    ctx.font      = '13px -apple-system, Arial, sans-serif'
    ctx.fillText(item.sub, 14, y + rowH * 0.76)

    ctx.fillStyle = sel ? 'rgba(255,255,255,0.70)' : '#bbb'
    ctx.font      = '22px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('›', MENU_W - 12, y + rowH * 0.60)
  })

  return new THREE.CanvasTexture(canvas)
}

// ── Wheel label texture ───────────────────────────────────────────────────────
function buildWheelTexture(): THREE.CanvasTexture {
  const S = 512
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = S
  const ctx = canvas.getContext('2d')!
  const cx = S / 2, cy = S / 2, r = S * 0.37

  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle    = 'rgba(190,190,190,0.72)'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = `bold ${S * 0.066}px -apple-system, Arial, sans-serif`
  ctx.fillText('MENU', cx, cy - r)

  ctx.font = `bold ${S * 0.074}px sans-serif`
  ctx.fillText('◀◀', cx - r, cy)
  ctx.fillText('▶▶', cx + r, cy)

  ctx.font = `bold ${S * 0.066}px sans-serif`
  ctx.fillText('▶❙', cx, cy + r)

  return new THREE.CanvasTexture(canvas)
}

// ── Click sound ───────────────────────────────────────────────────────────────
function playClick(audioCtxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    const ctx  = audioCtxRef.current
    const len  = Math.floor(ctx.sampleRate * 0.018)
    const buf  = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    }
    const src  = ctx.createBufferSource()
    src.buffer = buf
    const gain      = ctx.createGain()
    gain.gain.value = 0.28
    src.connect(gain)
    gain.connect(ctx.destination)
    src.start()
  } catch (_) {}
}

// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  onPointerEnter?:    () => void
  onPointerLeave?:    () => void
  onWheelDragChange?: (dragging: boolean) => void
}

export default function IPhoneModel({ onPointerEnter, onPointerLeave, onWheelDragChange }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const screenMeshRef = useRef<THREE.Mesh>(null)
  const wheelMeshRef  = useRef<THREE.Mesh>(null)
  const isDragging    = useRef(false)
  const lastAngle     = useRef<number | null>(null)
  const angleAcc      = useRef(0)
  const audioCtxRef   = useRef<AudioContext | null>(null)

  const screenTexRef  = useRef(buildScreenTexture(0))
  const wheelTexRef   = useRef(buildWheelTexture())

  const { gl, camera } = useThree()

  useEffect(() => {
    if (!screenMeshRef.current) return
    const newTex = buildScreenTexture(selectedIndex)
    const mat    = screenMeshRef.current.material as THREE.MeshBasicMaterial
    if (mat.map) mat.map.dispose()
    mat.map          = newTex
    mat.needsUpdate  = true
    screenTexRef.current = newTex
  }, [selectedIndex])

  function computeAngle(e: PointerEvent): number {
    if (!wheelMeshRef.current) return 0
    const worldPos = new THREE.Vector3()
    wheelMeshRef.current.getWorldPosition(worldPos)
    const proj = worldPos.clone().project(camera)
    const rect = gl.domElement.getBoundingClientRect()
    const sx   = ((proj.x + 1) / 2) * rect.width  + rect.left
    const sy   = ((-proj.y + 1) / 2) * rect.height + rect.top
    return Math.atan2(e.clientY - sy, e.clientX - sx)
  }

  function startWheelDrag(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    isDragging.current = true
    lastAngle.current  = computeAngle(e.nativeEvent as PointerEvent)
    angleAcc.current   = 0
    onWheelDragChange?.(true)
    document.body.style.cursor = 'grabbing'

    const canvas = gl.domElement

    function onMove(ev: PointerEvent) {
      if (!isDragging.current || lastAngle.current === null) return
      const cur = computeAngle(ev)
      let delta = cur - lastAngle.current
      if (delta >  Math.PI) delta -= 2 * Math.PI
      if (delta < -Math.PI) delta += 2 * Math.PI
      lastAngle.current  = cur
      angleAcc.current  += delta

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
      lastAngle.current  = null
      onWheelDragChange?.(false)
      document.body.style.cursor = 'auto'
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup',   onUp)
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup',   onUp)
  }

  return (
    <group onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>

      {/* ── Body — dark space-grey aluminium ───────────────────── */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={6}>
        <meshPhysicalMaterial
          color="#252525"
          metalness={0.75}
          roughness={0.16}
          envMapIntensity={3.0}
          clearcoat={0.60}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>

      {/* ── Screen bezel ──────────────────────────────────────── */}
      <mesh position={[0, SCR_Y, D / 2 + 0.0015]}>
        <planeGeometry args={[SCR_W + 0.022, SCR_H + 0.022]} />
        <meshBasicMaterial color="#080808" />
      </mesh>

      {/* ── Screen ─────────────────────────────────────────────── */}
      <mesh ref={screenMeshRef} position={[0, SCR_Y, D / 2 + 0.003]}>
        <planeGeometry args={[SCR_W, SCR_H]} />
        <meshBasicMaterial map={screenTexRef.current} />
      </mesh>

      {/* ── Click wheel — main dark disc (draggable outer ring) ── */}
      <mesh
        ref={wheelMeshRef}
        position={[0, WHEEL_Y, D / 2 + 0.005]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={startWheelDrag}
        onPointerEnter={() => { document.body.style.cursor = 'grab' }}
        onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = 'auto' }}
      >
        <cylinderGeometry args={[WHEEL_R, WHEEL_R, 0.009, 72]} />
        <meshPhysicalMaterial color="#1a1a1a" metalness={0.20} roughness={0.60} />
      </mesh>

      {/* ── Wheel label overlay (MENU / ◀◀ / ▶▶ / ▶❙) ─────────── */}
      <mesh
        position={[0, WHEEL_Y, D / 2 + 0.011]}
        onPointerDown={startWheelDrag}
        onPointerEnter={() => { document.body.style.cursor = 'grab' }}
        onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = 'auto' }}
      >
        <planeGeometry args={[WHEEL_R * 2, WHEEL_R * 2]} />
        <meshBasicMaterial map={wheelTexRef.current} transparent alphaTest={0.01} />
      </mesh>

      {/* ── Separator ring (between outer ring and centre btn) ─── */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.007]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[BTN_R + 0.013, BTN_R + 0.013, 0.005, 72]} />
        <meshBasicMaterial color="#0c0c0c" />
      </mesh>

      {/* ── Centre button ──────────────────────────────────────── */}
      <mesh
        position={[0, WHEEL_Y, D / 2 + 0.012]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={e => { e.stopPropagation(); playClick(audioCtxRef) }}
        onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { document.body.style.cursor = 'auto' }}
      >
        <cylinderGeometry args={[BTN_R, BTN_R, 0.007, 72]} />
        <meshPhysicalMaterial color="#2e2e2e" metalness={0.10} roughness={0.30} />
      </mesh>

      {/* ── Hold switch (top right) ────────────────────────────── */}
      <mesh position={[W * 0.28, H / 2 - 0.006, 0]}>
        <boxGeometry args={[0.14, 0.016, D + 0.004]} />
        <meshPhysicalMaterial color="#383838" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ── Headphone jack (top left) ──────────────────────────── */}
      <mesh position={[-W * 0.28, H / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.019, 0.019, D + 0.006, 16]} />
        <meshBasicMaterial color="#111" />
      </mesh>

      {/* ── 30-pin dock connector (bottom) ─────────────────────── */}
      <mesh position={[0, -(H / 2) + 0.007, 0]}>
        <boxGeometry args={[0.24, 0.016, D + 0.004]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  )
}
