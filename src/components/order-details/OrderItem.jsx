import vegicon from '@/assets/vegicon.png';

const OrderItem = ({ capsico }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className='flex items-center gap-3'>
                {capsico && <img src={vegicon} alt="" />}
                <h3 className='text-sm font-dmSans font-medium text-[#515151]'>Idli 2 nos</h3>
            </div>
            <h3 className="font-inter text-sm font-medium">7</h3>
            <h3 className="font-inter text-sm font-medium">₹230</h3>
        </div>
    )
}

export default OrderItem