import { CV } from '../../data/cv'

const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 8vw',
        background: 'rgba(240,244,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(108,92,231,0.08)',
      }}
    >
      <a
        href="#hero"
        style={{ fontSize: 16, fontWeight: 800, color: '#1a1a2e', letterSpacing: -0.3 }}
      >
        {CV.name}
      </a>
      <div style={{ display: 'flex', gap: 32 }}>
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{ fontSize: 14, fontWeight: 600, color: '#555' }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
