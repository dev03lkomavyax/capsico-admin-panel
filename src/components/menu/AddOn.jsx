import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FiUpload } from 'react-icons/fi'
import EggIcon from '../customIcons/EggIcon'
import NonVegIcon from '../customIcons/NonVegIcon'
import VegIcon from '../customIcons/VegIcon'
// import ItemImageUploadModal from './ItemImageUploadModal'

const AddOn = ({ control, handlePropertyRemove, index }) => {
    const [isUploadImageModal, setIsUploadImageModal] = useState(false);

    return (
        <div className='grid grid-cols-[80px_1fr_70px_1fr_30px] items-center gap-4'>
            <button type='button' onClick={() => setIsUploadImageModal(true)} className='border rounded-lg flex flex-col gap-1 justify-center items-center h-20 p-3'>
                <FiUpload className='text-4xl primary-color' />
                <span className='primary-color class-base4'>Upload</span>
            </button>
            <div>
                <FormField
                    control={control}
                    name={`addOnName${index}`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add on name</FormLabel>
                            <FormControl>
                                <FormControl>
                                    <Input placeholder="Enter name"  {...field} />
                                </FormControl>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={control}
                    name={`foodType${index}`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="opacity-0">w</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent className="min-w-[70px]">
                                        <SelectItem value="veg" className="w-[70px] pl-7">
                                            <VegIcon />
                                        </SelectItem>
                                        <SelectItem value="non-veg" className="w-[70px] pl-7">
                                            <NonVegIcon />
                                        </SelectItem>
                                        <SelectItem value="egg" className="w-[70px] pl-7">
                                            <EggIcon />
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={control}
                    name={`price${index}`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter price" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className=''>
                <BiTrash onClick={() => handlePropertyRemove(index)} className="text-[#E4626F] text-2xl mt-2 cursor-pointer" />
            </div>
            {/* {isUploadImageModal &&
                <ItemImageUploadModal
                    isItemImageUploadModalOpen={isUploadImageModal}
                    setIsItemImageUploadModalOpen={setIsUploadImageModal}
                />
            } */}
        </div>
    )
}

export default AddOn