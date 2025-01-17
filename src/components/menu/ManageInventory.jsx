import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import ProductInventory from './ProductInventory'
import Spinner from '../Spinner'
import DataNotFound from '../DataNotFound'
import useGetApiReq from '@/hooks/useGetApiReq'
import ItemComp from './ItemComp'
import { BsSearch } from 'react-icons/bs'

const ManageInventory = ({ allCategories }) => {
    const [foodItemsInfo, setFoodItemsInfo] = useState("");
    const [categoryId, setCategoryId] = useState(allCategories[0]?._id || "");
     const [searchQuery, setSearchQuery] = useState("");

    const { res, fetchData, isLoading } = useGetApiReq();

    const getFoodItems = () => {
        fetchData(`/restaurant/category/${categoryId}/food`);
    }

    useEffect(() => {
        categoryId && getFoodItems();
    }, [categoryId])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("get food items res", res);
            // setFoodItems(res?.data?.data);
            const { categoryInfo, itemsByCategory, totalItems } = res?.data?.data;

            setFoodItemsInfo({
                categoryInfo,
                totalItems,
                itemsByCategory: itemsByCategory[categoryInfo.name],
            });
        }
    }, [res])

    console.log("foodItems", foodItemsInfo);


    return (
        <div>
            <div className='flex justify-start items-center -ml-4 mt-5'>
                <BsSearch className='relative left-8 text-[#1D1929]' />
                <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
            </div>
            <div className="w-full rounded-lg overflow-hidden h-[500px] flex items-start border border-[#CED7DE] my-5">
                <div className="left-section relative w-1/3 h-full rounded-tl-lg bg-white border-r border-r-[#CED7DE]">
                    <h3 className=" class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">Categories</h3>
                    <div className="overflow-y-auto h-full pb-[180px]">
                        {allCategories?.map((category) => (
                            <ItemComp setCategoryId={setCategoryId} key={category?._id} category={category} />
                        ))}

                        {allCategories.length === 0 && isLoading &&
                            <Spinner />
                        }

                        {allCategories.length === 0 && !isLoading &&
                            <DataNotFound name="Categories" />
                        }
                    </div>
                </div>
                {categoryId &&
                    <div className="right-section w-2/3 bg-white h-full">
                        {foodItemsInfo && <h3 className=" class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">{foodItemsInfo?.categoryInfo?.name} ({foodItemsInfo?.totalItems})</h3>}
                        {foodItemsInfo?.itemsByCategory?.map((foodItem) => (
                            <ProductInventory
                                key={foodItem?._id}
                                foodItem={foodItem}
                            />
                        ))}
                    </div>}
            </div>
        </div>
    )
}

export default ManageInventory