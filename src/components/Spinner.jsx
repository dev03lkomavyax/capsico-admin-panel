import { CgSpinner } from 'react-icons/cg'

const Spinner = ({ size = 30 }) => {
  return (
    <div className='flex justify-center w-full py-5'>
      <CgSpinner size={size} className="mt-1 animate-spin" />
    </div>
  )
}

export default Spinner