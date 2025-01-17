import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import ItemComp from '@/components/menu/ItemComp'
import Product from '@/components/menu/Product'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaArrowRight, FaPlus } from 'react-icons/fa6'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function VendorProducts() {

    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    return (
        <AdminWrapper>
            <section className='w-full min-h-screen'>
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex justify-start items-center'>
                        <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Products</h2>
                    </div>
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
                <div className='bg-[#FFFFFF] w-full p-12 rounded-md'>
                    <div className="w-full rounded-lg overflow-hidden flex items-start border border-[#CED7DE]">
                        <div className="left-section relative w-1/3 h-[548px] rounded-tl-lg bg-white border-r border-r-[#CED7DE]">
                            <h3 className="text-[#000000] text-xl font-semibold font-inter px-8 py-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">Categories (7)</h3>
                            <button className="flex w-full items-center gap-3 px-8 py-5 border-b">
                                <FaPlus className="text-[#4A67FF]" />
                                <span className="text-[#4A67FF] text-xl font-semibold font-inter">Add Category</span>
                            </button>
                            <div className="overflow-y-auto h-full pb-[180px]">
                                <ItemComp title={'Combos (3)'} />
                            </div>
                            <button className="text-[#4A67FF] text-xl font-bold font-inter mt-auto bg-white shadow-3xl absolute bottom-0 flex w-full justify-between items-center left-0 px-8 py-5">
                                Go to Add Ons
                                <FaArrowRight className="primary-color" />
                            </button>
                        </div>
                        <div className="right-section w-2/3 bg-white h-full">
                            <h3 className="text-[#000000] text-xl font-semibold font-inter px-8 py-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">Combos (3)</h3>
                            <button className="flex w-full items-center gap-3 px-8 py-5 border-b">
                                <FaPlus className="text-[#4A67FF]" />
                                <span className="text-[#4A67FF] text-xl font-semibold font-inter">Add New Item</span>
                            </button>
                            <Product />
                            <Product />
                            <Product />
                        </div>

                        {/* <AddItemModal
                            isAddItemModalOpen={isAddItemModalOpen}
                            setIsAddItemModalOpen={setIsAddItemModalOpen}
                        /> */}
                    </div>

                    {/* {isOpenCategoryModel &&
                        <CategoryEditModel
                            isOpenCategoryModel={isOpenCategoryModel}
                            setIsOpenCategoryModel={setIsOpenCategoryModel}
                        />
                    }

                    {isOpenSubCategoryModel &&
                        <SubCategoryEditModel
                            isOpenSubCategoryModel={isOpenSubCategoryModel}
                            setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
                        />
                    }

                    {isAddonGroupsModalOpen &&
                        <AddOnGroups
                            isAddonGroupsModalOpen={isAddonGroupsModalOpen}
                            setIsAddonGroupsModalOpen={setIsAddonGroupsModalOpen}
                        />
                    } */}
                </div>
            </section>
        </AdminWrapper>
    )
}

export default VendorProducts