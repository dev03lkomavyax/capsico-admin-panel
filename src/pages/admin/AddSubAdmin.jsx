import AdminWrapper from "@/components/admin-wrapper/AdminWrapper"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { permissions } from "@/constants/permissions"
import usePostApiReq from "@/hooks/usePostApiReq"
import { AddSubAdminSchema } from "@/schema/AddSubAdminSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const AddSubAdmin = () => {
    const form = useForm({
      resolver: zodResolver(AddSubAdminSchema),
      defaultValues: {
        position: "manager",
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        cityName: "",
        permissions: {
          dashboard: "none",
          subAdmin: "none",
          customer: "none",
          restaurant: "none",
          vendor: "none",
          deliveryAgent: "none",
          deliveryCharge: "none",
          order: "none",
          review: "none",
          offer: "none",
          applicationRequest: "none",
          deliveryCharges: "none",
          zones: "none",
          notifications: "none",
          tickets: "none",
          content: "none",
        },
      },
    });

    const { control, reset, handleSubmit } = form
    const [isShowPassword, setIsShowPassword] = useState(false);

    const { res, fetchData, isLoading } = usePostApiReq()

    const onSubmit = (data) => {
        console.log('data', data)
        // reset({
        //     position: '',
        //     password: ''
        // })
        const apiData = {
            position: data.position,
            name: data.name,
            phone: Number(data.phoneNumber),
            email: data.email,
            cityName:data.cityName,
            password: data.password,
            permissions: data.permissions,
        }
        fetchData(`/admin/create-subAdmin`, apiData);
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("create sunAdmin", res.data)
            navigate('/admin/sub-admin')
        }
    }, [res])

    return (
        <AdminWrapper>
            <section className='px-0 py-0 w-full'>
                {/* <div className='flex justify-between items-center mb-8'>
                    <div className='flex justify-start items-center'>
                        <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Add Sub Admin</h2>
                    </div>
                </div> */}
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto w-full border-[1px] border-[#B9B9B9] rounded-xl bg-[#FFFFFF] px-5 py-4">
                        <div className='flex gap-1 items-center mb-4'>
                            <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#1064FD] text-3xl cursor-pointer' />
                            <h2 className='text-[#1064FD] text-2xl text-left font-bold font-nunito'>Add sub admin</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <FormField
                                control={control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Position</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="flex justify-between bg-[#F9FAFB] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                                    <SelectValue placeholder="Select Position" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="support">Support</SelectItem>
                                                    <SelectItem value="analyst">Analyst</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Phone number</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="10- digit number" className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email address" className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={isShowPassword ? "text" : "password"} placeholder="*************" className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg `} {...field} />
                                                {isShowPassword ?
                                                    <FaEyeSlash onClick={() => setIsShowPassword(false)} className='absolute text-gray-600 right-3 bottom-3 cursor-pointer text-lg' />
                                                    : <FaEye onClick={() => setIsShowPassword(true)} className='absolute text-gray-600 right-3 bottom-3 cursor-pointer text-lg' />
                                               
                                                }
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                      <FormField
                                control={control}
                                name="cityName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>CityName</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="CityName" className={`placeholder:text-[#A6A6A6] bg-[#F9FAFB] rounded-lg mt-4`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Label className="text-sm font-medium inline-block mt-5">Permissions</Label>

                        <div className="grid grid-cols-6 gap-3 mt-1">
                            {permissions.map((permission) => (
                                <FormField
                                    key={permission.value}
                                    control={control}
                                    name={`permissions.${permission.value}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium capitalize">{permission.label}</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl className={`bg-[#F9FAFB] border-[#D1D5DB] rounded-lg`}>
                                                        <SelectTrigger className="w-full text-[#6B7280] text-sm font-normal font-inter">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="none">None</SelectItem>
                                                            <SelectItem value="read">Read</SelectItem>
                                                            <SelectItem value="read&write">Read and Write</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        <div className='flex justify-end'>
                            <Button type="submit" className='h-11 w-[190px] mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base'>Add</Button>
                        </div>
                    </form>
                </Form>
            </section>
        </AdminWrapper>
    )
}

export default AddSubAdmin