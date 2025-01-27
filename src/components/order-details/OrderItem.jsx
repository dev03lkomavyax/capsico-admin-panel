import vegicon from '@/assets/vegicon.png';

const OrderItem = ({ capsico, items }) => {
    return (
        <>
            {
                items?.length > 0 && items.map((item, index) => {
                    return (
                        <div key={index} className="grid grid-cols-3 gap-3">
                            <div className='flex items-center gap-3'>
                                {capsico && <img src={vegicon} alt="" />}
                                <h3 className='text-sm font-dmSans font-medium text-[#515151]'>{item?.name}</h3>
                            </div>
                            <h3 className="font-inter text-sm font-medium">{item?.quantity}</h3>
                            <h3 className="font-inter text-sm font-medium">₹{item?.itemTotal}</h3>
                        </div>
                    )
                })
            }
        </>
    )
}

export default OrderItem