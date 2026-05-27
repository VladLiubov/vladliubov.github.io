import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { CV } from '../../data/cv'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
}

const card: CSSProperties = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(108,92,231,0.1)',
  borderRadius: 14,
  padding: '20px 26px',
  marginBottom: 16,
  boxShadow: '0 2px 16px rgba(100,80,200,0.06)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
}

export default function Education() {
  return (
    <section id="education" style={{ background: '#f7f8fc', padding: '96px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <motion.p
          {...fadeUp}
          style={{
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2.5,
            color: '#aaa',
            margin: '0 0 48px',
          }}
        >
          Education & Courses
        </motion.p>

        {CV.education.map((item, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08 }} style={card}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
                {item.degree}
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>{item.institution}</div>
            </div>
            <div style={{ fontSize: 13, color: '#6c5ce7', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {item.period}
            </div>
          </motion.div>
        ))}

        {CV.courses.map((item, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.55, delay: (CV.education.length + i) * 0.08 }}
            style={card}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>{item.institution}</div>
            </div>
            <div style={{ fontSize: 13, color: '#6c5ce7', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {item.period}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
