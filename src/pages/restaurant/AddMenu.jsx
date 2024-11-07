import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { addMenuSchema } from '@/schema/restaurantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AddMenu = () => {

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
        <MdKeyboardArrowLeft className='text-[#000000] text-4xl' />
        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant </h2>
      </div>
      <div className='bg-[#FFFFFF]'>
        <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
          <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
        </div>
        <div className='px-10 border-b-[1px] border-b-[#CDCDCD]'>
          <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>
          <div>
            <Form {...form}>
              <form className='w-full'>
                <FormField
                  control={control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Item Name</FormLabel>
                      <FormControl>
                        { /* Your form field */}
                        <Input placeholder="Enter Dish name" className='h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field} />
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
                        { /* Your form field */}
                        {/* <Input /> */}
                        <Textarea placeholder="Add a Detailed description explaining the dish" className='min-h-[163px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field}></Textarea>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2'>
                  <FormField
                    control={control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className='min-h-[163px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' />
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
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className='min-h-[163px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' />
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