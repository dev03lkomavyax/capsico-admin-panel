import { Checkbox } from '@/components/ui/checkbox';
import React, { useRef, useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiCameraPlus } from "react-icons/pi";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { uploadDocumentSchema } from '@/schema/restaurantSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const Restaurant = () => {

    const form = useForm({
        resolver: zodResolver(uploadDocumentSchema),
        defaultValues: {
            panNumber: "",
            nameOnCard: "",
            address: "",
            fssaCertificate: ""
        }
    })
    const { control } = form
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    //   const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //       console.log("Selected file:", file.name);
    //     }
    //   };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            setSelectedFile(file);
        } else {
            alert("Please select an image or a PDF file.");
            setSelectedFile(null);
        }
    };
    return (
        <section className='p-6 w-full bg-[green]'>
            <div className='flex justify-start items-center mb-8'>
                <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
            </div>
            {/* <div className='w-full border-[1px] border-[#C2CDD6] rounded-lg p-[30px] bg-[#FFFFFF]'>

            </div> */}
            <div className='flex flex-col gap-5'>
                <div className='w-full border-[1px] border-[#C2CDD6] rounded-lg px-5 py-9 bg-[#FFFFFF]'>
                    <p className='text-[#4A5E6D] text-base font-bold font-inter mb-8'>Choose options for your restaurant</p>
                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Pure veg
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Food Court
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Dessert Shop
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Beverage Shop
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Fast Food
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Pure veg
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Casual food stall
                            </label>
                        </div>
                        <button className='w-full text-[#1AA6F1] text-xl text-start font-normal font-inter'>
                            + View More
                        </button>
                    </div>
                </div>
                <div className='w-full border-[1px] border-[#C2CDD6] rounded-lg px-5 py-9 bg-[#FFFFFF]'>
                    <p className='text-[#4A5E6D] text-base font-bold font-inter mb-2'>Choose options for your restaurant</p>
                    <p className='text-[#4A5E6D] text-xs font-normal font-inter mb-8'>Pick options which best describe food you serve</p>
                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <button className='w-full text-[#1AA6F1] text-xl text-start font-normal font-inter'>
                            + View More
                        </button>
                    </div>
                </div>
                <div className='w-full border-[1px] border-[#C2CDD6] rounded-lg px-5 py-9 bg-[#FFFFFF]'>
                    <p className='text-[#4A5E6D] text-base font-bold font-inter mb-2'>Restaurant Working Hours</p>
                    <p className='text-[#4A5E6D] text-xs font-normal font-inter mb-8'>Set restaurant opening and closing hours</p>
                    <Select>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>North America</SelectLabel>
                                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Europe & Africa</SelectLabel>
                                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                <SelectItem value="west">
                                    Western European Summer Time (WEST)
                                </SelectItem>
                                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Asia</SelectLabel>
                                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                <SelectItem value="ist_indonesia">
                                    Indonesia Central Standard Time (WITA)
                                </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Australia & Pacific</SelectLabel>
                                <SelectItem value="awst">
                                    Australian Western Standard Time (AWST)
                                </SelectItem>
                                <SelectItem value="acst">
                                    Australian Central Standard Time (ACST)
                                </SelectItem>
                                <SelectItem value="aest">
                                    Australian Eastern Standard Time (AEST)
                                </SelectItem>
                                <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>South America</SelectLabel>
                                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB] w-5 h-5' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Monday
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Checkbox id="terms" className='data-[state=checked]:bg-[#1A56DB] data-[state=checked]:border-[#1A56DB]' />
                            <label
                                htmlFor="terms"
                                className="text-[#667085] text-xl font-normal font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Bakery
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full border-[1px] border-[#C2CDD6] rounded-lg px-5 py-9 bg-[#FFFFFF]'>
                <h3 className='text-[#4A5E6D] text-base font-bold font-inter mb-2'>Menu Images</h3>
                <p className='text-[#4A5E6D] text-xs font-normal font-inter mb-8'>Your menu will be displayed directly to customers on Capsico</p>
                <Input type='file' ref={fileInputRef} onChange={handleFileChange} className='hidden' />
                <div onClick={handleBoxClick} className='h-[230px] w-full border-[1px] border-[#C2CDD6] border-dashed rounded-lg flex flex-col justify-center items-center gap-3'>
                    <div className='flex flex-col justify-center items-center border-[1px] border-[#000000] rounded-[5px] border-dashed px-4 py-1'>
                        <PiCameraPlus className='text-[#1AA6F1] text-5xl' />
                        <p className='text-[#1AA6F1] text-sm font-bold font-inter'>Add Photo</p>
                    </div>
                    <p className='text-[#000000] text-xs font-normal font-inter'>or drop files to upload</p>
                </div>
                {selectedFile && (
                    <div className="mt-4 text-center text-gray-700">
                        <p className="font-medium">Selected File:</p>
                        <p>{selectedFile.name}</p>
                    </div>
                )}
            </div>

            <div className='border-[1px] border-[#9F9F9F] rounded-lg'>
                <h2 className='text-[#000000] text-2xl font-normal font-inter'>Upload Legal Documents</h2>
                <Form {...form}>
                    <FormField
                        control={control}
                        name="abc"
                        render={() => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

        </section>
    )
}

export default Restaurant
