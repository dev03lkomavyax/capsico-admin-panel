import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
// import CategoryEditModel from '../models/CategoryEditModel'
// import SubCategoryEditModel from '../models/SubCategoryEditModel'
import { BiTrash } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'

const ItemComp = ({ title }) => {

    const [addFoodBtn, setAddFoodBtn] = useState(true)
    const [exitingBtn, setExitingBtn] = useState(true)
    const [addSublevel, setAddSublevel] = useState(true)

    const [isOpena, setIsOpena] = useState(true);
    const [isOpenb, setIsOpenb] = useState(false);
    const [isOpenc, setIsOpenc] = useState(false);

    const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false)
    const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false)

    const toggleOpena = () => {
        setIsOpena(!isOpena);
    };

    const toggleOpenb = () => {
        setIsOpenb(!isOpenb);
    };

    const toggleOpenc = () => {
        setIsOpenc(!isOpenc);
    };

    return (
        <div>
            {/* #F2F4F7 */}
            <div onClick={() => setIsOpenb(!isOpenb)} className="w-full flex items-center hover:bg-[#F7FAFF]  justify-between border-b-2 pl-10 pr-5 py-5 group cursor-pointer">
                <h3 className="text-[#000000] text-xl font-medium font-inter">{title}</h3>
                <div className='flex items-center gap-8'>
                    <div className='hidden group-hover:flex gap-4'>
                        <FiEdit2 onClick={() => setIsOpenCategoryModel(true)} className="seven-color text-lg cursor-pointer" />
                        <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer" />
                    </div>
                    <IoIosArrowDown className={`seven-color text-xl cursor-pointer transform transition-transform duration-200 ${isOpenb && "rotate-180 duration-200"}`} />
                </div>
            </div>

            {isOpenb &&
                <div className="">
                    <div className="w-full flex items-center justify-between pl-20 pr-5 py-4 border-b-2 group hover:bg-[#F7FAFF]">
                        <h3 className="text-[#000000] text-xl font-medium font-inter">{title}</h3>
                        <div className='flex items-center gap-8'>
                            <div className='hidden group-hover:flex gap-4'>
                                <FiEdit2 onClick={() => setIsOpenSubCategoryModel(true)} className="seven-color text-lg cursor-pointer" />
                                <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <button className="flex w-full items-center gap-3 px-5 py-4 pl-10 border-b" onClick={() => setIsOpenSubCategoryModel(true)}>
                        <FaPlus className="text-[#4A67FF] text-lg" />
                        <span className="text-[#4A67FF] text-xl font-medium font-inter">Add SubCategory</span>
                    </button>
                </div>
            }


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
            } */}
        </div>
    )
}

export default ItemComp
