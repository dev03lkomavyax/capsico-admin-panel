import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { addMenuSchema } from '@/schema/restaurantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import Variants from '@/components/restaurant/Variants'
import ServingInfo from '@/components/restaurant/ServingInfo'
import MapAddOn from '@/components/restaurant/MapAddOn'
import AdditionalDetails from '@/components/restaurant/AdditionalDetails'

const AddMenu = () => {

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(addMenuSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      foodType: "",
      serviceType: "",
      itemName: "",
      itemName: "",
      itemName: "",
      itemName: "",
      itemName: "",
      itemName: "",
    }
  })
  const { control } = form
  return (
    <section className='border-[1px] bg-[#E0E2E7] px-10 py-10 w-full h-full min-h-screen'>
      <div className='flex justify-start items-center mb-4'>
        <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant </h2>
      </div>
      <div className='bg-[#FFFFFF]'>
        <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
          <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
        </div>
        <div className='mb-4 py-10'>
          <h3 className='text-[#000000] text-xl font-semibold font-inter px-10'>Basic Details</h3>
          <div>
            <Form {...form}>
              <form className='w-full'>
                <div className='px-10 space-y-5 py-6'>
                  <FormField
                    control={control}
                    name="itemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Item Name</FormLabel>
                        <FormControl>
                          { /* Your form field */}
                          <Input type="text" placeholder="Enter Dish name" className='h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="itemDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Item Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Add a Detailed description explaining the dish" className='min-h-[163px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field}></Textarea>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-8'>
                    <FormField
                      control={control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] text-[#969696] text-base font-normal font-inter'>
                                <SelectValue placeholder="Delivery" className='rounded-lg' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">m@example.com</SelectItem>
                              <SelectItem value="m@google.com">m@google.com</SelectItem>
                              <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="menuCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Menu Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] text-[#969696] text-base font-normal font-inter'>
                                <SelectValue placeholder="Combos" className='rounded-lg' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">m@example.com</SelectItem>
                              <SelectItem value="m@google.com">m@google.com</SelectItem>
                              <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className=' space-y-5 border-y-[1px] border-y-[#C8C8C8] px-10 py-6'>
                  <div className='bg-[#F7FAFF] rounded-lg px-5 py-4'>
                    <p className='text-[#000000] text-base font-semibold font-inter'>Customers trust brands with fair pricing</p>
                    <p className='text-[#757575] text-sm font-normal font-inter'>Keep same prices across menus offered for online ordering.</p>
                  </div>
                  <FormField
                    control={control}
                    name="bestPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Base price</FormLabel>
                        <FormControl>
                          { /* Your form field */}
                          {/* <Input /> */}
                          <Input type="text" placeholder="Enter base price of dish" className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field}></Input>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="packagingCharges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Packagng charges</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter packaging charges" className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field}></Input>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='bg-[#F7FAFF] rounded-lg px-5 py-4'>
                    <p className='text-[#000000] text-base font-semibold font-inter'>Customers trust brands with fair pricing</p>
                  </div>
                </div>
                <Variants />
                <AdditionalDetails />
                <MapAddOn />
                <ServingInfo form={form} />
              </form>
            </Form>
          </div>
        </div>
        <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
          <button className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
          <button className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF]'>Save changes</button>
        </div>
      </div>
    </section>
  )
}

export default AddMenu