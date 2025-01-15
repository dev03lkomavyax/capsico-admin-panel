import { CgSpinner } from "react-icons/cg"

const BackdropLoader = () => {
    return (
        <div className="flex w-full justify-center fixed top-0 left-0 z-[99999] items-center h-screen bg-black/30">
            <CgSpinner size={40} className="mt-1 animate-spin" />
        </div>
    )
}

export default BackdropLoader