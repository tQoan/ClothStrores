import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link } from 'react-router-dom'
import { Theme } from '@astryxdesign/core/theme'
import { LinkProvider } from '@astryxdesign/core/Link'
import App from './App'
import { themes, defaultThemeSlug } from './astryx-themes'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Theme theme={themes[defaultThemeSlug]} mode="light">
        <LinkProvider component={Link}>
          <App />
        </LinkProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
