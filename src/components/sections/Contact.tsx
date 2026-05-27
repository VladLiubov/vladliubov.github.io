import { motion } from 'framer-motion'
import { CV } from '../../data/cv'

interface ItemProps {
  label: string
  value: string
  href?: string
}

function ContactItem({ label, value, href }: ItemProps) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#bbb',
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {href ? (
        <a href={href} style={{ fontSize: 15, color: '#6c5ce7', fontWeight: 600 }}>
          {value}
        </a>
      ) : (
        <div style={{ fontSize: 15, color: '#1a1a2e', fontWeight: 600 }}>{value}</div>
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ background: '#ffffff', padding: '96px 0 120px' }}>
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
          Contact
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(108,92,231,0.1)',
            borderRadius: 18,
            padding: '36px 40px',
            boxShadow: '0 2px 16px rgba(100,80,200,0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 28,
          }}
        >
          <ContactItem label="Location" value={CV.location} />
          <ContactItem label="Email" value={CV.email} href={`mailto:${CV.email}`} />
          <ContactItem label="Phone" value={CV.phone} href={`tel:${CV.phone}`} />
          <ContactItem label="LinkedIn" value="vladyslav-liubov" href={CV.linkedin} />
          <ContactItem label="GitHub" value="vladliubov" href={CV.github} />
          <ContactItem label="Languages" value={CV.languages.join(' · ')} />
        </motion.div>
      </div>
    </section>
  )
}
