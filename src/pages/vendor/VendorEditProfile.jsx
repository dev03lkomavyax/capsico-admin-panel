import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { editProfileSchema } from '@/schema/vendorSchema'
import BankDetails from '@/components/vendor/BankDetails'
import ContactInfo from '@/components/vendor/ContactInfo'
import ProductInfo from '@/components/vendor/ProductInfo'
import BusinessInfo from '@/components/vendor/BusinessInfo'
import { useNavigate } from 'react-router-dom'

function VendorEditProfile() {

    const [pageNumber, setpageNumber] = useState(1)
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            businessName: "",
            foodCategory: "",
            title: "",
            businessAddress: "",
            streetAddress: "",
            city: "",
            state: "",
            pincode: "",
            email: "",
            phoneNumber: "",
            gstin: "",
            fssaiLicense: "",
            panNumber: "",
            numberOfEmployees: "",
            yearsOfOperation: "",
            bankName: "",
            branchAddress: "",
            accountNumber: "",
            ifscCode: "",
            productTitle: "",
            productRangeDescription: "",
            deliveryRadius: "",
            specialRequests: "",
        }
    })

    const onSubmit = (data) => {
        console.log("data:", data)
        form.reset({
            businessName: "",
            foodCategory: "",
            title: "",
            businessAddress: "",
            streetAddress: "",
            city: "",
            state: "",
            pincode: "",
            email: "",
            phoneNumber: "",
            gstin: "",
            fssaiLicense: "",
            panNumber: "",
            numberOfEmployees: "",
            yearsOfOperation: "",
            bankName: "",
            branchAddress: "",
            accountNumber: "",
            ifscCode: "",
            productTitle: "",
            productRangeDescription: "",
            deliveryRadius: "",
            specialRequests: "",
        })
    }

    return (
        <section className='border-[1px] bg-[#F5F7FA] px-16 py-10 w-full'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex justify-start items-center'>
                    <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Vendor</h2>
                </div>
            </div>
            <div className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full min-h-screen">
                        {pageNumber === 1 && <BusinessInfo form={form} />}
                        {pageNumber === 2 && <ContactInfo form={form} />}
                        {pageNumber === 3 && <BankDetails form={form} />}
                        {pageNumber === 4 && <ProductInfo form={form} />}
                        <div className='flex justify-end gap-6'>
                            {pageNumber > 1 && <button onClick={() => setpageNumber(pageNumber - 1)} className='border-[1px] border-[#1064FD] rounded-lg h-12 w-28 text-[#1064FD] text-base font-medium font-dm bg-[#FFFFFF] hover:bg-[#f7f7f7]'>Previous</button>}
                            {pageNumber < 4 && <button onClick={() => setpageNumber(pageNumber + 1)} className='border-[1px] border-[#1064FD] rounded-lg h-12 w-28 text-[#FFFFFF] text-base font-medium font-dm bg-[#1064FD] hover:bg-[#1063fde5]'>Next</button>}
                            {pageNumber === 4 && <button className='border-[1px] border-[#1064FD] rounded-lg h-12 w-28 text-[#FFFFFF] text-base font-medium font-dm bg-[#1064FD] hover:bg-[#1063fde5]' type="submit">Save</button>}
                        </div>
                        {/* <Button >Submit</Button> */}
                    </form>
                </Form>
            </div>
        </section>
    )
}

export default VendorEditProfile