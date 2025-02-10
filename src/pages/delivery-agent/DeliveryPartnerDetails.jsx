import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { updatePreview } from '@/utils/updatePreview'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosArrowBack } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { PiCameraPlus } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import call from '@/assets/call.png';
import edit from '@/assets/edit.png';
import avatar from '@/assets/Image-198.png';
import location from '@/assets/location.png';
import sms from '@/assets/sms.png';
import { DeliveryPartnerDetailsSchema } from '@/schema/DeliveryPartnerDetailsSchema'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

const DeliveryPartnerDetails = () => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm({
    resolver: zodResolver(DeliveryPartnerDetailsSchema),
    defaultValues: {
      userImage: "",
      userImagePreview: "",
      fullName: "Prashant Kumar Singh",
      address: "New Delhi India",
      email: "officialprashanttt@gmail.com",
      phone: "8009396321",
      altPhone: "987654321012",
      aadharNumber: "111111110000",
      DLNumber: "TN03013559",
      DLExpiry: new Date(),
      bankName: "BOB,- Retail Banking",
      accountNumber: "1234567890",
      IFSCcode: "BARB0000",
      panCardNumber: "POIUYTR0887",
      maximumSecurityDeposit: "0",
    }
  })
  const { register, control, watch, setValue, getValues } = form;

  const userImageRef = register("userImage");

  const userImage = watch("userImage");

  useEffect(() => {
    updatePreview(userImage, "userImagePreview", setValue);
  }, [form, userImage, setValue]);

  const onSubmit = (data) => {
    console.log("data", data);
  }

  return (
    <AdminWrapper>
      <section>
        <div className='flex justify-between h-14'>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1">
            <IoIosArrowBack className='text-2xl' />
            <span className='font-roboto text-lg font-medium'>Edit info</span>
          </button>
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 bg-white p-5 rounded-lg">
              <div className='flex gap-10'>
                {isEdit ?
                  <FormField
                    control={control}
                    name="userImage"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-40">
                          <FormLabel className="cursor-pointer">
                            {!watch("userImagePreview") &&
                              <div className='border-2 border-dashed border-[#C2CDD6] w-40 h-40 rounded-lg flex flex-col justify-center items-center'>
                                <div className='flex flex-col items-center primary-color border-dashed rounded px-5'>
                                  <PiCameraPlus className='text-[#1AA6F1]' size={45} />
                                  <p className='font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0'>Add Photo</p>
                                </div>
                                <p className='font-normal text-xs mt-2'>or drop files to upload</p>
                              </div>
                            }
                            {watch("userImagePreview") &&
                              <img className='w-40 h-40' src={getValues("userImagePreview")} alt="" />}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" className="placeholder:text-[#3B3B3B] hidden w-full" {...userImageRef} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  :
                  <img className='w-40 h-40 rounded-lg' src={avatar} alt="avatar" />
                }

                <div className='w-full'>
                  <div className='flex w-full justify-between items-center gap-3'>
                    {isEdit ?
                      <FormField
                        control={control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel className="text-lg text-[#3B3B3B] font-bold font-inter">Enter OTP</FormLabel> */}
                            <FormControl>
                              <Input placeholder="" className="placeholder:text-[#3B3B3B] w-80" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      :
                      <h1 className='font-inter text-3xl font-semibold text-[#202020]'>{getValues("fullName")}</h1>
                    }
                    {isEdit ?
                      <MdCancel className='cursor-pointer text-2xl' onClick={() => setIsEdit(false)} />
                      : <img onClick={() => setIsEdit(true)} className='w-5 h-5 cursor-pointer' src={edit} alt="edit" />}
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <div className="flex items-center gap-2">
                      <img className='w-5 h-5' src={location} alt="location" />
                      {isEdit ?
                        <FormField
                          control={control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="" className="placeholder:text-[#3B3B3B] w-80" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        :
                        <p className='font-inter text-[#696969] text-lg'>{getValues("address")}</p>
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <img className='w-5 h-5' src={sms} alt="sms" />
                      {isEdit ?
                        <FormField
                          control={control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enter Email" type="email" className="placeholder:text-[#3B3B3B] w-80" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        :
                        <p className='font-inter text-[#696969] text-lg'>{getValues("email")}</p>
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <img className='w-5 h-5' src={call} alt="call" />
                      {isEdit ?
                        <FormField
                          control={control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enter Phone No." type="number" className="placeholder:text-[#3B3B3B] w-80" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        :
                        <p className='font-inter text-[#696969] text-lg'>{getValues("phone")}</p>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 mt-5">
                <p className='font-roboto text-lg text-[#696969]'>Alternate Mobile Number</p>
                {isEdit ?
                  <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Phone No." type="number" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  :
                  <p className='font-inter text-[#696969] text-lg'>{getValues("altPhone")}</p>
                }
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className='font-roboto text-lg text-[#696969]'>Aadhar Number</p>
                {isEdit ?
                  <FormField
                    control={control}
                    name="aadharNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Aadhar Number" type="number" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  :
                  <p className='font-inter text-[#696969] text-lg'>{`${getValues("aadharNumber").slice(0, 4)} ${getValues("aadharNumber").slice(4, 8)} ${getValues("aadharNumber").slice(8, 12)}`}</p>
                }
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className='font-roboto text-lg text-[#696969]'>DL.Number</p>
                {isEdit ?
                  <FormField
                    control={control}
                    name="DLNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter DL.Number" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  :
                  <p className='font-inter text-[#696969] text-lg'>{getValues("DLNumber")}</p>
                }
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className='font-roboto text-lg text-[#696969]'>DL Expiry</p>
                {isEdit ?
                  <FormField
                    control={form.control}
                    name="DLExpiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        {/* <FormLabel>Date of birth</FormLabel> */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] px-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  :
                  <p className='font-inter text-[#696969] text-lg'>{format(new Date(getValues("DLExpiry")), "yyyy/MM/dd")}</p>
                }
              </div>

              <div className="mt-5 pt-5 border-t">
                <p className='font-roboto text-xl text-[#434343]'>Bank Details</p>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className='font-roboto text-lg text-[#696969]'>Bank Name</p>
                  {isEdit ?
                    <FormField
                      control={control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter Bank Name" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    :
                    <p className='font-inter text-[#696969] text-lg'>{getValues("bankName")}</p>
                  }
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className='font-roboto text-lg text-[#696969]'>Account Number</p>
                  {isEdit ?
                    <FormField
                      control={control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter Account Number" type="number" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    :
                    <p className='font-inter text-[#696969] text-lg'>{getValues("accountNumber")}</p>
                  }
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className='font-roboto text-lg text-[#696969]'>IFSC code</p>
                  {isEdit ?
                    <FormField
                      control={control}
                      name="IFSCcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter IFSC code" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    :
                    <p className='font-inter text-[#696969] text-lg'>{getValues("IFSCcode")}</p>
                  }
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className='font-roboto text-lg text-[#696969]'>Pan Card Number</p>
                  {isEdit ?
                    <FormField
                      control={control}
                      name="panCardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter Pan Card Number" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    :
                    <p className='font-inter text-[#696969] text-lg'>{getValues("panCardNumber")}</p>
                  }
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className='font-roboto text-lg text-[#696969]'>Maximum Security Deposit</p>
                  {isEdit ?
                    <FormField
                      control={control}
                      name="maximumSecurityDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter Maximum Security Deposit" className="placeholder:text-[#3B3B3B] w-60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    :
                    <p className='font-inter text-[#696969] text-lg'>{getValues("maximumSecurityDeposit")}</p>
                  }
                </div>
              </div>

              {isEdit &&
                <div className='flex justify-end mt-5'>
                  <Button className="w-36" type="submit">Submit</Button>
                </div>}
            </form>
          </Form>
        </div>
      </section>
    </AdminWrapper>
  )
}

export default DeliveryPartnerDetails
