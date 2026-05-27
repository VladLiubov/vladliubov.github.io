import { Html } from '@react-three/drei'
import { CV } from '../../data/cv'

const SCREEN_W = 0.67
const SCREEN_H = 1.40
const SCREEN_Z = 0.047
const PX_W = 300
const PX_H = Math.round((SCREEN_H / SCREEN_W) * PX_W)
const scale = SCREEN_W / PX_W

export default function CVScreen() {
  return (
    <Html
      transform
      position={[0, 0.025, SCREEN_Z]}
      scale={scale}
      style={{
        width: `${PX_W}px`,
        height: `${PX_H}px`,
        background: '#f2f2f7',
        borderRadius: 6,
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      {/* Status bar */}
      <div style={{
        padding: '12px 18px 4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        fontWeight: 700,
        color: '#000',
        letterSpacing: 0,
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="black">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
            <rect x="3.5" y="4.5" width="2.5" height="6.5" rx="0.5" />
            <rect x="7" y="2" width="2.5" height="9" rx="0.5" />
            <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="black" />
            <path d="M2.5 6c1.5-1.5 3.4-2.4 5.5-2.4s4 .9 5.5 2.4" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 3.5C2 1.3 4.8 0 8 0s6 1.3 8 3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <div style={{
              width: 20, height: 10, border: '1px solid rgba(0,0,0,0.35)',
              borderRadius: 2.5, padding: '1.5px', position: 'relative',
            }}>
              <div style={{ width: '80%', height: '100%', background: '#34C759', borderRadius: 1 }} />
            </div>
            <div style={{ width: 1.5, height: 4.5, background: 'rgba(0,0,0,0.4)', borderRadius: '0 1px 1px 0' }} />
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{
        padding: '0 16px 10px',
        fontSize: 17,
        fontWeight: 700,
        color: '#000',
        textAlign: 'center',
        letterSpacing: -0.4,
      }}>
        Portfolio
      </div>

      {/* Profile card */}
      <div style={{
        margin: '0 14px 14px',
        background: 'white',
        borderRadius: 18,
        padding: '20px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #6c5ce7, #a29bfe)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 800,
          color: 'white',
          marginBottom: 10,
          boxShadow: '0 4px 14px rgba(108,92,231,0.4)',
          letterSpacing: -1,
        }}>
          VL
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#000', letterSpacing: -0.4, lineHeight: 1.2 }}>
          {CV.name}
        </div>
        <div style={{ fontSize: 12, color: '#6c5ce7', fontWeight: 600, marginTop: 2, letterSpacing: -0.2 }}>
          {CV.role}
        </div>
        <div style={{
          marginTop: 8,
          background: '#f2f2f7',
          borderRadius: 20,
          padding: '3px 10px',
          fontSize: 10,
          color: '#636366',
          fontWeight: 500,
        }}>
          📍 {CV.location}
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[
            { icon: '✉️', label: 'email' },
            { icon: '📞', label: 'call' },
            { icon: '💼', label: 'linkedin' },
            { icon: '🐙', label: 'github' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: '#eef2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}>
                {icon}
              </div>
              <span style={{ fontSize: 9, color: '#6c5ce7', fontWeight: 600, textTransform: 'lowercase' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <SectionLabel>Experience</SectionLabel>
      <div style={{ margin: '0 14px 14px', background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {CV.experience.map((exp, i) => (
          <div key={i} style={{
            padding: '10px 14px',
            borderBottom: i < CV.experience.length - 1 ? '0.5px solid #e5e5ea' : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 8,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#000', letterSpacing: -0.2 }}>
                {exp.company}
              </div>
              <div style={{ fontSize: 10, color: '#6c5ce7', fontWeight: 500, marginTop: 1 }}>
                {exp.role}
              </div>
            </div>
            <div style={{ fontSize: 9, color: '#8e8e93', textAlign: 'right', flexShrink: 0, lineHeight: 1.4 }}>
              {exp.period}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <SectionLabel>Skills</SectionLabel>
      <div style={{ margin: '0 14px 14px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {CV.skills.flatMap((g) => g.items).map((skill) => (
          <span
            key={skill}
            style={{
              background: '#eef2ff',
              color: '#6c5ce7',
              fontSize: 10,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 20,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Education */}
      <SectionLabel>Education</SectionLabel>
      <div style={{ margin: '0 14px 14px', background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {[...CV.education, ...CV.courses].map((item, i, arr) => (
          <div key={i} style={{
            padding: '10px 14px',
            borderBottom: i < arr.length - 1 ? '0.5px solid #e5e5ea' : 'none',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#000' }}>
              {'degree' in item ? item.degree : item.name}
            </div>
            <div style={{ fontSize: 10, color: '#636366', marginTop: 1 }}>
              {item.institution} · {item.period}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <SectionLabel>Contact</SectionLabel>
      <div style={{ margin: '0 14px 24px', background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {[
          { icon: '✉️', value: CV.email, color: '#007AFF' },
          { icon: '📞', value: CV.phone, color: '#007AFF' },
          { icon: '🌍', value: CV.location, color: '#000' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '11px 14px',
            borderBottom: i < 2 ? '0.5px solid #e5e5ea' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 11, color: item.color, fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </Html>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{
      margin: '0 18px 6px',
      fontSize: 11,
      fontWeight: 600,
      color: '#6c6c70',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}>
      {children}
    </div>
  )
}
