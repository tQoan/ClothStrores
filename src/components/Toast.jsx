import { Check } from 'lucide-react'
import { useStore } from '../store'

export default function Toast() {
  const { toast } = useStore()

  if (!toast) return null

  return (
    <div className="toast" role="status" key={toast.id}>
      <span className="toast-icon">
        <Check size={14} strokeWidth={2} />
      </span>
      <span>{toast.message}</span>
    </div>
  )
}
