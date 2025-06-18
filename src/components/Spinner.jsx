import { cn } from '@/lib/utils'
import { CgSpinner } from 'react-icons/cg'

const Spinner = ({ size = 30, className }) => {
  return (
    <div className={cn("flex justify-center w-full py-5", className)}>
      <CgSpinner size={size} className="mt-1 animate-spin" />
    </div>
  )
}

export default Spinner