import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { CV } from '../../data/cv'

// iPod Classic 6th gen proportions (in Three.js units)
const W = 0.74
const H = 1.25
const D = 0.12
const R = 0.022

// Screen area
const SCR_W = 0.60
const SCR_H = 0.45   // 4:3 ratio
const SCR_Y = 0.30

// Click wheel
const WHEEL_Y = -0.22
const WHEEL_R = 0.20
const BTN_R = 0.088

function buildScreenTexture() {
  const PW = 480, PH = 360
  const canvas = document.createElement('canvas')
  canvas.width = PW
  canvas.height = PH
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#e0e0e0'
  ctx.fillRect(0, 0, PW, PH)

  // Header bar
  const HH = 52
  const hGrad = ctx.createLinearGradient(0, 0, 0, HH)
  hGrad.addColorStop(0, '#2e2e2e')
  hGrad.addColorStop(1, '#1a1a1a')
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, PW, HH)

  // Back chevron
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '20px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('◀', 10, 34)

  // Title
  ctx.fillStyle = 'white'
  ctx.font = 'bold 22px -apple-system, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Portfolio', PW / 2, 34)

  // Battery indicator
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(PW - 42, 18, 28, 16)
  ctx.fillStyle = '#5ac45a'
  ctx.fillRect(PW - 41, 19, 20, 14)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillRect(PW - 14, 23, 3, 8)

  // Menu rows
  const items = [
    { label: CV.name, sub: CV.role, selected: true },
    { label: 'Experience', sub: 'RIA.com · CML Team · NewTone' },
    { label: 'Skills', sub: 'Swift · SwiftUI · UIKit · RxSwift' },
    { label: 'Education', sub: 'KPI Kyiv · Web Academy 2021' },
    { label: 'Contact', sub: CV.email },
  ]

  const rowH = (PH - HH) / items.length

  items.forEach((item, i) => {
    const y = HH + i * rowH

    if (item.selected) {
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

    // Separator
    ctx.fillStyle = item.selected ? 'rgba(0,40,100,0.2)' : '#cccccc'
    ctx.fillRect(0, y + rowH - 1, PW, 1)

    // Label
    ctx.fillStyle = item.selected ? 'white' : '#111111'
    ctx.font = 'bold 20px -apple-system, Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(item.label, 16, y + rowH * 0.40)

    // Sub-label
    ctx.fillStyle = item.selected ? 'rgba(255,255,255,0.76)' : '#606060'
    ctx.font = '15px -apple-system, Arial, sans-serif'
    ctx.fillText(item.sub, 16, y + rowH * 0.72)

    // Chevron
    ctx.fillStyle = item.selected ? 'rgba(255,255,255,0.6)' : '#b0b0b0'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('›', PW - 14, y + rowH * 0.57)
  })

  return new THREE.CanvasTexture(canvas)
}

function buildWheelTexture() {
  const S = 512
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')!
  const cx = S / 2, cy = S / 2

  // Outer wheel ring
  ctx.clearRect(0, 0, S, S)

  // Draw the wheel circle labels
  const r = S * 0.43
  ctx.fillStyle = 'rgba(160,160,160,0.9)'
  ctx.font = `bold ${S * 0.075}px -apple-system, Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // MENU (top)
  ctx.fillText('MENU', cx, cy - r * 0.72)
  // ◀◀ (left)
  ctx.font = `bold ${S * 0.085}px sans-serif`
  ctx.fillText('◀◀', cx - r * 0.72, cy)
  // ▶▶ (right)
  ctx.fillText('▶▶', cx + r * 0.72, cy)
  // ▶❙❙ (bottom)
  ctx.font = `bold ${S * 0.075}px -apple-system, Arial, sans-serif`
  ctx.fillText('▶❙', cx, cy + r * 0.72)

  return new THREE.CanvasTexture(canvas)
}

interface Props {
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

export default function IPhoneModel({ onPointerEnter, onPointerLeave }: Props) {
  const screenTex = useMemo(() => buildScreenTexture(), [])
  const wheelTex = useMemo(() => buildWheelTexture(), [])

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
      <mesh position={[0, SCR_Y, D / 2 + 0.003]}>
        <planeGeometry args={[SCR_W, SCR_H]} />
        <meshBasicMaterial map={screenTex} />
      </mesh>

      {/* Click wheel — dark outer ring with label texture */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.004]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[WHEEL_R, WHEEL_R, 0.008, 64]} />
        <meshPhysicalMaterial color="#303030" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Wheel label texture plane (floats just above the wheel) */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.009]}>
        <planeGeometry args={[WHEEL_R * 2, WHEEL_R * 2]} />
        <meshBasicMaterial map={wheelTex} transparent alphaTest={0.01} />
      </mesh>

      {/* Separator ring between outer wheel and center button */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.007]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[BTN_R + 0.012, BTN_R + 0.012, 0.004, 64]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Center button */}
      <mesh position={[0, WHEEL_Y, D / 2 + 0.010]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[BTN_R, BTN_R, 0.007, 64]} />
        <meshPhysicalMaterial color="#ddddd5" metalness={0.15} roughness={0.2} />
      </mesh>

      {/* Hold switch (top right) */}
      <mesh position={[0.14, H / 2 - 0.008, 0]}>
        <boxGeometry args={[0.12, 0.018, D + 0.004]} />
        <meshPhysicalMaterial color="#c0c0b8" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Headphone jack (top left) */}
      <mesh position={[-0.14, H / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, D + 0.006, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Dock connector (bottom) */}
      <mesh position={[0, -(H / 2) + 0.008, 0]}>
        <boxGeometry args={[0.20, 0.018, D + 0.004]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
    </group>
  )
}
