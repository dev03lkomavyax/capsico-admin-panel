import React, { useState } from 'react'
import { FiEdit2, FiPlusCircle } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
// import CategoryEditModel from '../models/CategoryEditModel'
// import SubCategoryEditModel from '../models/SubCategoryEditModel'
import { BiTrash } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import SubCategoryEditModel from './SubCategoryEditModel'

const ItemComp = ({ category, getCategories, setCategoryId = () => { } }) => {
    const { name, id, subcategories, itemCount } = category;

    const [isOpenb, setIsOpenb] = useState(false);

    const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false)
    const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false)

    const haddleSubCategory = () => {
        setIsOpenSubCategoryModel(true)
    }

    const handleClick = () => {
        setIsOpenb(!isOpenb)
        setCategoryId(id)
    }

    return (
        <div>
            {/* #F2F4F7 */}
            <div onClick={handleClick} className="w-full flex items-center hover:bg-[#F7FAFF] justify-between border-b-2 p-5 py-3 group cursor-pointer">
                <h3 className="text-[#000000] font-medium font-inter">{name} ({itemCount})</h3>
                <div className='flex items-center gap-8'>
                    <div className='hidden group-hover:flex gap-4'>
                        <FiEdit2 onClick={() => setIsOpenCategoryModel(true)} className="seven-color text-lg cursor-pointer" />
                        <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer" />
                    </div>
                    <IoIosArrowDown className={`seven-color text-xl cursor-pointer transform transition-transform duration-200 ${isOpenb && "rotate-180 duration-200"}`} />
                </div>
            </div>

            {isOpenb &&
                <div className="flex flex-col">
                    {subcategories.map((subcategory, index) => {
                        return (
                            <div key={subcategory.id} className="w-full group flex items-center justify-between pl-9 pr-5 py-4 border-b-2 group hover:bg-[#F7FAFF]">
                                <h3 className="seven-color class-base1">{subcategory.name} ({subcategory?.itemCount})</h3>

                                <div className='hidden items-center gap-8 group-hover:flex'>
                                    <div className='hidden group-hover:flex gap-4'>
                                        <FiEdit2 onClick={() => setIsOpenSubCategoryModel(true)} className="seven-color text-lg cursor-pointer" />
                                        <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <button className="flex w-full items-center gap-3 px-5 py-3 pl-10 border-b" onClick={haddleSubCategory}>
                        <FiPlusCircle className="primary-color text-lg" />
                        <span className="class-base1 primary-color">Add SubCategory</span>
                    </button>
                </div>
            }


            {/* {isOpenCategoryModel &&
                <CategoryEditModel
                    isOpenCategoryModel={isOpenCategoryModel}
                    setIsOpenCategoryModel={setIsOpenCategoryModel}
                />
            } */}

            {isOpenSubCategoryModel &&
                <SubCategoryEditModel
                    id={id}
                    isOpenSubCategoryModel={isOpenSubCategoryModel}
                    setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
                    getCategories={getCategories}
                />
            }
        </div>
    )
}

export default ItemComp
