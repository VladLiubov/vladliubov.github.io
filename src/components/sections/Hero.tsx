import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import IPhoneScene from '../scene/IPhoneScene'
import { CV } from '../../data/cv'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.6], [0, -50])

  // When the 3D scene is zoomed, collapse the left column so the canvas
  // expands to fill the full hero width → genuine full-screen feel.
  const [sceneZoomed, setSceneZoomed] = useState(false)

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          background: 'radial-gradient(circle, rgba(120,80,255,0.11) 0%, transparent 70%)',
          top: -140,
          right: -80,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(80,160,255,0.09) 0%, transparent 70%)',
          bottom: -100,
          left: -60,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* ── Left text block ────────────────────────────────────── */}
      {/* Outer: controls width collapse */}
      <motion.div
        animate={{ width: sceneZoomed ? '0%' : '44%' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          opacity,
          y,
        }}
      >
        {/* Inner: controls content opacity / slide */}
        <motion.div
          animate={{
            opacity: sceneZoomed ? 0 : 1,
            x: sceneZoomed ? -24 : 0,
          }}
          transition={{ duration: 0.28 }}
          style={{ padding: '0 0 0 8vw', minWidth: '44vw' }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#6c5ce7',
              textTransform: 'uppercase',
              letterSpacing: 2.5,
              margin: '0 0 14px',
            }}
          >
            {CV.role}
          </p>
          <h1
            style={{
              fontSize: 'clamp(38px, 4.5vw, 64px)',
              fontWeight: 800,
              color: '#1a1a2e',
              lineHeight: 1.08,
              margin: '0 0 18px',
              letterSpacing: -1,
            }}
          >
            {CV.name.split(' ')[0]}
            <br />
            {CV.name.split(' ')[1]}
          </h1>
          <div
            style={{
              width: 36,
              height: 3,
              background: 'linear-gradient(to right, #6c5ce7, #a29bfe)',
              borderRadius: 2,
              margin: '0 0 18px',
            }}
          />
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
            {CV.location}
            <span style={{ margin: '0 8px', color: '#ccc' }}>·</span>
            3 yrs experience
          </p>
        </motion.div>
      </motion.div>

      {/* ── 3D canvas — fills remaining width ─────────────────── */}
      <motion.div
        style={{
          opacity,
          flex: 1,
          height: '100%',
          position: 'relative',
        }}
      >
        <IPhoneScene onZoomedChange={setSceneZoomed} />
      </motion.div>

      {/* ── Scroll cue ─────────────────────────────────────────── */}
      {!sceneZoomed && (
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: '#bbb',
            fontSize: 12,
            pointerEvents: 'none',
          }}
        >
          <span>scroll</span>
          <span>↓</span>
        </motion.div>
      )}
    </section>
  )
}
