import img from '@/assets/Image-120.png'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'

const Review = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/admin/reviews/123")} className='grid grid-cols-[48px_1fr] gap-4 border-b pb-6 cursor-pointer'>
            <img src={img} className='w-12 h-12 rounded-full' />
            <div>
                <div className='w-full grid grid-cols-[1fr_200px] gap-5'>
                    <div className='grid grid-cols-[70%_28%] gap-[2%]'>
                        <div>
                            <div className="">
                                <h2 className='font-inter font-semibold text-[#7B8289]'>James Kowalski</h2>
                                <p className='font-inter text-xs font-semibold text-[#CBCDD0]'>Head Marketing 24 June 2020</p>
                            </div>
                            <p className='font-inter mt-5 text-sm font-medium text-[#2B2B2B'>We recently had dinner with friends at David CC and we all walked away with a great experience.
                                Good food, pleasant environment, personal attention through all the evening. Thanks to the team
                                and we will be back!
                            </p>
                        </div>
                        <div className='flex gap-3 flex-wrap'>
                            <div className="bg-[#FEF0ED] text-xs font-inter font-semibold text-[#FEAC9A] h-7 w-auto rounded-full px-4 flex items-center">Excelent</div>
                        </div>

                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className='font-inter text-2xl font-semibold text-[#747B83]'>3.5</h3>
                        <ReactStars
                            count={5}
                            value={4}
                            size={28}
                            edit={false}
                            color1={'#d3d6e4'}
                            color2={'#2e4cdf'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review