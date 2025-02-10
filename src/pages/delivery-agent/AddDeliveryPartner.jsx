import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import { ImageCompo, ShowImageCompo } from '@/components/ImageComponent'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { AddDeliveryPartnerSchema } from '@/schema/AddDeliveryPartner'
import { updatePreview } from '@/utils/updatePreview'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddDeliveryPartner = () => {
  const [isCalender, setIsCalender] = useState(false)

  // Sample data - in a real app, this would come from an API
  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"]
  const cities = ["Mumbai", "Bangalore", "Chennai", "New Delhi"]
  const vehicles = ["Three-Wheeler", "Cycle", "Bike"]

  const form = useForm({
    resolver: zodResolver(AddDeliveryPartnerSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      aadharCardNumber: "",
      panCardNumber: "",
      drivingLicenseNumber: "",
      expiryDate: "",
      state: "",
      city: "",
      pincode: "",
      vehicle: "",
      uploadPhoto: "",
      uploadAadhar: "",
      uploadPan: "",
      uploadLicense: ""
    }
  })

  const { register, handleSubmit, control, reset, watch, setValue, getValues } = form

  const handleCalander = (date)=>{
    form.setValue("expiryDate", date)
    setIsCalender(false)
  }

  const uploadPhotoImg = register("uploadPhoto")
  const uploadAadharImg = register("uploadAadhar")
  const uploadPanImg = register("uploadPan")
  const uploadLicenseImg = register("uploadLicense")
  const uploadPhotoImgWatch = watch("uploadPhoto")
  const uploadAadharImgWatch = watch("uploadAadhar")
  const uploadPanImgWatch = watch("uploadPan")
  const uploadLicenseImgWatch = watch("uploadLicense")

  useEffect(() => {
    updatePreview(uploadLicenseImgWatch, "uploadPhotoImgPreview", setValue);
    updatePreview(uploadAadharImgWatch, "uploadAadharImgPreview", setValue);
    updatePreview(uploadPanImgWatch, "uploadPanImgPreview", setValue);
    updatePreview(uploadLicenseImgWatch, "uploadLicenseImgPreview", setValue);
  }, [form, uploadPhotoImgWatch,uploadAadharImgWatch, uploadPanImgWatch, uploadLicenseImgWatch, setValue]);


  const onSubmit = () => {
    console.log("Form submitted:", data)
  }
  return (
    <AdminWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormField
            control={form.control}
            name="uploadPhoto"
            render={({ field }) => (
              <FormItem className="w-[350px]">
                {watch("uploadPhotoImgPreview") && <ShowImageCompo name="uploadPhoto" field={"uploadPhotoImgPreview"} setValue={setValue} watch={watch} title={"Photo"} />}
                <FormLabel>
                  {!watch("uploadPhotoImgPreview") && <ImageCompo title={"Photo"} />}
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...uploadPhotoImg} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#606060] text-sm font-sans font-normal">Name</FormLabel>
                <FormControl className="h-12">
                  <Input type="text" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Email address</FormLabel>
                  <FormControl className="h-12">
                    <Input type="email" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Mobile Number</FormLabel>
                  <FormControl className="h-12">
                    <Input type="number" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="aadharCardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#606060] text-sm font-sans font-normal">Aadhar card number</FormLabel>
                <FormControl className="h-12">
                  <Input type="number" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="uploadAadhar"
            render={({ field }) => (
              <FormItem className="w-[350px]">
                {watch("uploadAadharImgPreview") && <ShowImageCompo name="uploadAadhar" field={"uploadAadharImgPreview"} setValue={setValue} watch={watch} title={"Aadhar Photo"} />}
                <FormLabel>
                  {!watch("uploadAadharImgPreview") && <ImageCompo title={"Aadhar Photo"} />}
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...uploadAadharImg} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="panCardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#606060] text-sm font-sans font-normal">Pan card number</FormLabel>
                <FormControl className="h-12">
                  <Input type="text" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField
            control={form.control}
            name="uploadPan"
            render={({ field }) => (
              <FormItem className="w-[350px]">
                {watch("uploadPanImgPreview") && <ShowImageCompo name="uploadPan" field={"uploadPanImgPreview"} setValue={setValue} watch={watch} title={"Pan Photo"} />}
                <FormLabel>
                  {!watch("uploadPanImgPreview") && <ImageCompo title={"Pan Photo"} />}
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...uploadPanImg} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name="drivingLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Driving license number</FormLabel>
                  <FormControl className="h-12">
                    <Input type="text" className="text-[#606060] text-sm font-sans font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Expiry Date</FormLabel>
                  <FormControl>
                    <Popover open={isCalender} onOpenChange={setIsCalender}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal px-4 h-12",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "dd-MM-yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={handleCalander} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="uploadLicense"
            render={({ field }) => (
              <FormItem className="w-[350px]">
                {watch("uploadLicenseImgPreview") && <ShowImageCompo name="uploadLicense" field={"uploadLicenseImgPreview"} setValue={setValue} watch={watch} title={"License Photo"} />}
                <FormLabel>
                  {!watch("uploadLicenseImgPreview") && <ImageCompo title={"License Photo"} />}
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...uploadLicenseImg} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="h-12">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state.toLowerCase()}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="h-12">
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Pincode</FormLabel>
                  <FormControl className="h-12">
                    <Input type="number" className="text-[#606060] text-sm font-sans font-normal" {...field} maxLength={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#606060] text-sm font-sans font-normal">Vehicle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="h-12">
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle} value={vehicle.toLowerCase()}>
                          {vehicle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" className="w-24 flex justify-center items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </AdminWrapper>
  )
}

export default AddDeliveryPartner