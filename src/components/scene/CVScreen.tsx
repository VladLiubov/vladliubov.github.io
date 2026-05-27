import { Html } from '@react-three/drei'
import { CV } from '../../data/cv'

// Screen dimensions in Three.js units (must match IPhoneModel screen plane)
const SCREEN_W = 0.67   // W - 0.05
const SCREEN_H = 1.40   // H - 0.07
const SCREEN_Z = 0.047  // D / 2 + 0.002

// We render at PX_W CSS pixels wide; scale converts to Three.js units
const PX_W = 300

const scale = SCREEN_W / PX_W

const pill = {
  background: 'rgba(108,92,231,0.12)',
  color: '#5a4fcf',
  fontSize: 10,
  fontWeight: 600,
  padding: '3px 9px',
  borderRadius: 20,
  display: 'inline-block',
  margin: '2px 2px 2px 0',
} as const

const sectionHead = {
  fontSize: 9,
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: 1,
  color: '#aaa',
  margin: '14px 0 6px',
}

export default function CVScreen() {
  return (
    <Html
      transform
      occlude
      position={[0, 0.025, SCREEN_Z]}
      scale={scale}
      style={{
        width: `${PX_W}px`,
        height: `${Math.round((SCREEN_H / SCREEN_W) * PX_W)}px`,
        background: '#f8f8fa',
        borderRadius: 6,
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: '"Inter", -apple-system, sans-serif',
        padding: '18px 14px 24px',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      {/* Name + role */}
      <div style={{ fontSize: 17, fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2 }}>
        {CV.name}
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#6c5ce7', textTransform: 'uppercase', letterSpacing: 1, margin: '3px 0 10px' }}>
        {CV.role}
      </div>
      <div style={{ fontSize: 10, color: '#888', marginBottom: 12, lineHeight: 1.5 }}>
        {CV.profile}
      </div>

      {/* Experience */}
      <div style={sectionHead}>Experience</div>
      {CV.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e' }}>
            {exp.role} · {exp.company}
          </div>
          <div style={{ fontSize: 9, color: '#6c5ce7', margin: '1px 0 4px' }}>
            {exp.period}{exp.city ? ` · ${exp.city}` : ''}
          </div>
          <ul style={{ paddingLeft: 12, margin: 0 }}>
            {exp.bullets.map((b, j) => (
              <li key={j} style={{ fontSize: 9, color: '#555', marginBottom: 2, lineHeight: 1.5 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Skills */}
      <div style={sectionHead}>Skills</div>
      {CV.skills.map((group) => (
        <div key={group.category} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: '#aaa', fontWeight: 600, marginBottom: 3 }}>
            {group.category}
          </div>
          <div>
            {group.items.map((skill) => (
              <span key={skill} style={pill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Contact */}
      <div style={sectionHead}>Contact</div>
      <div style={{ fontSize: 10, color: '#555', lineHeight: 1.8 }}>
        <div>📍 {CV.location}</div>
        <div>✉️ {CV.email}</div>
        <div>📞 {CV.phone}</div>
      </div>
    </Html>
  )
}
