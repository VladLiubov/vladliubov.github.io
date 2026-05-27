import { motion } from 'framer-motion'
import { CV } from '../../data/cv'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: '#f7f8fc', padding: '96px 0' }}>
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
          Experience
        </motion.p>

        {/* Timeline container */}
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 5,
              top: 8,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, #6c5ce7 0%, rgba(108,92,231,0.08) 100%)',
            }}
          />

          {CV.experience.map((exp, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ position: 'relative', marginBottom: 24 }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: -28,
                  top: 12,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: i === 0 ? '#6c5ce7' : '#c5bef7',
                  boxShadow: i === 0 ? '0 0 0 4px rgba(108,92,231,0.18)' : 'none',
                }}
              />

              {/* Card */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(108,92,231,0.1)',
                  borderRadius: 14,
                  padding: '22px 26px',
                  boxShadow: '0 2px 16px rgba(100,80,200,0.06)',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
                  {exp.role} · {exp.company}
                </div>
                <div style={{ fontSize: 13, color: '#6c5ce7', marginBottom: 14 }}>
                  {exp.period}
                  {exp.city ? ` · ${exp.city}` : ''}
                </div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={{ fontSize: 14, color: '#555', marginBottom: 6, lineHeight: 1.65 }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
