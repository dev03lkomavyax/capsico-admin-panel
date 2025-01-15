import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import ReactPagination from '@/components/pagination/ReactPagination'
import Capsico from '@/components/application-request/Capsico'
import Quickly from '@/components/application-request/Quickly'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const data = [
    {
        restaurantID: "1264903",
        restaurantName: "PIYUsh",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    }
]

const ApplicationRequest = () => {
    const [selectTab, setSelectTab] = useState('capsico')

    const navigate = useNavigate()

    const handleValueChange = (value) => {
        if (value === 'remove') {

        } else if (value === 'detail') {
            navigate('/admin/restaurant/dashboard')
        }
    }

    return (
        <section className='border-[1px] bg-[#F5F7FA] px-16 py-10 w-full min-h-screen'>
            <div className='flex justify-start items-center mb-8'>
                <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Application</h2>
            </div>
            <div className='flex justify-between'>
                <section className='flex justify-start items-center mb-8'>
                    <button onClick={() => setSelectTab('capsico')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'capsico' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                        <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Capsico</h6>
                        <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#FF6F03] w-[22px] h-[22px] rounded-[7px]'>20</p>
                    </button>
                    <button onClick={() => setSelectTab('quickly')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'quickly' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                        <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Quickly</h6>
                        <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#ABABAB] w-[22px] h-[22px] rounded-[7px]'>48</p>
                    </button>
                </section>
                {selectTab === 'capsico' &&
                    <Button
                        className="bg-blue-600 w-40 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        onClick={()=> navigate("/admin/application-request/add-restaurant")}
                    >
                        <Plus className="w-4 h-4" />
                        Add Restaurant
                    </Button>
                }
                {selectTab === 'quickly' &&
                    <Button
                        className="bg-blue-600 w-40 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        <Plus className="w-4 h-4" />
                        Add Vendor
                    </Button>
                }
            </div>
            {selectTab === 'capsico' &&
                <Capsico />
            }
            {selectTab === 'quickly' &&
                <Quickly />
            }
        </section>
    )
}

export default ApplicationRequest