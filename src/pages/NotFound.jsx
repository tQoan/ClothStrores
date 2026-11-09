import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 — A quiet detour</span>
      <h1>
        This path has grown <em>over.</em>
      </h1>
      <p>The page you are looking for has drifted out of season.</p>
      <Link className="btn btn-primary" to="/">
        <ArrowLeft size={16} strokeWidth={1.5} />
        Return home
      </Link>
    </section>
  )
}
