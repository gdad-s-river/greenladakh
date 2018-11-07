import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#DCEDC8',
      position: 'absolute',
      width: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0.5,
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
