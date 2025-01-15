import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'

const reviews = [
    {
        image: "https://picsum.photos/48",
        name: "James Kowalski",
        position: "Head Marketing",
        date: "24 June 2020",
        content: "We recently had dinner with friends at David CC and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
        rating: 3.5,
        tags: [{ label: "Excelent", color: "pink" }]
    },
    {
        image: "https://picsum.photos/48",
        name: "Samuel Hawkins",
        position: "Head Marketing",
        date: "24 June 2020",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
        rating: 4.8,
        tags: [
            { label: "Recomended", color: "pink" },
            { label: "Great", color: "orange" }
        ]
    },
    {
        image: "https://picsum.photos/48",
        name: "Samuel Hawkins",
        position: "Head Marketing",
        date: "24 June 2020",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
        rating: 4.8,
        tags: [
            { label: "Recomended", color: "pink" },
            { label: "Great", color: "orange" }
        ]
    }
];


function Reviews() {
    const [searchQuery, setSearchQuery] = useState('')
    const [reviewData, setReviewData] = useState(reviews)
    const navigate = useNavigate()

    return (
        <AdminWrapper>
            <section className='px-0 py-0 w-full h-full min-h-screen'>
                <div className='flex justify-start items-center'>
                    <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Review </h2>
                </div>
                <div className='flex justify-between items-center w-full my-5'>
                    <div className='flex justify-start items-center -ml-4'>
                        <BsSearch className='relative left-8 text-[#1D1929]' />
                        <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
                    </div>
                    <div className='flex justify-between items-center w-[230px]'>
                        <Select>
                            <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">All</SelectItem>
                                    <SelectItem value="newOrder">New Order</SelectItem>
                                    <SelectItem value="preparedry">Prepared</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                <SelectValue placeholder="Today" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='bg-[#FFFFFF] w-full px-9 rounded-lg'>
                    <div className='flex justify-between items-start py-5 w-full'>
                        <div>
                            <h3 className='text-[#2E2E2E] text-2xl font-semibold font-inter'>Others review</h3>
                            <p className='text-[#5A5A5A] text-base font-normal font-inter'>Here is customer review about restaurants</p>
                        </div>
                        <Select>
                            <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#6D6C6E] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                <SelectValue placeholder="Latest" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {reviewData.length > 0 && reviewData.map((e, i) => {
                        return <div key={i} className='flex justify-start gap-4 w-full py-5'>
                            <img src={e.image} className='w-12 h-12 rounded-3xl' alt="" />
                            <div className='w-full'>
                                <div className='flex justify-between w-full'>
                                    <div className='w-1/2'>
                                        <h5 className='text-[#868D93] text-[15px] font-semibold font-inter mb-[6px]'>{e.name}</h5>
                                        <p className='text-[#CACCCF] text-xs font-semibold font-inter mb-4'>{e.position} {e.date}</p>
                                    </div>
                                    <div className='flex justify-center gap-4 w-1/2'>
                                        <button className='text-[#FEAF9E] text-xs font-semibold font-inter bg-[#FEEFEC] rounded-[12px] h-7 px-4'>{e.tags.map((e) => e.label)}</button>
                                        <button className='text-[#FEAF9E] text-xs font-semibold font-inter bg-[#FEEFEC] rounded-[12px] h-7 px-4'>{e.tags.map((e) => e.label)}</button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-start w-full'>
                                    <p className='text-[#2B2B2B] text-sm font-medium font-inter max-w-[60%] pb-4'>{e.content}</p>
                                    <div className='-mt-5'>
                                        <p className='text-[#707880] text-2xl font-semibold font-inter text-center'>4.5</p>
                                        <ReactStars edit={false} count={5} value={e.rating} color2='blue' size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </section>
        </AdminWrapper>
    )
}

export default Reviews