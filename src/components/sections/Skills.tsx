import { motion } from 'framer-motion'
import { CV } from '../../data/cv'

export default function Skills() {
  return (
    <section id="skills" style={{ background: '#ffffff', padding: '96px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2.5,
            color: '#aaa',
            margin: '0 0 48px',
          }}
        >
          Skills
        </motion.p>

        {CV.skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.07 }}
            style={{ marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#bbb',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                margin: '0 0 12px',
              }}
            >
              {group.category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.items.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.07 + si * 0.03 }}
                  style={{
                    background: 'rgba(108,92,231,0.09)',
                    color: '#6c5ce7',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '7px 16px',
                    borderRadius: 24,
                    border: '1px solid rgba(108,92,231,0.14)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
