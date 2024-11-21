import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddSubAdminSchema } from "@/schema/AddSubAdminSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const AddSubAdmin = () => {
    const form = useForm({
        resolver: zodResolver(AddSubAdminSchema),
        defaultValues: {
            position: '',
            access: '',
            name: '',
            phoneNumber: '',
            email: '',
            password: ''
        }
    })

    const { control, reset, handleSubmit } = form
    const [isShowPassword, setIsShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log('data', data)
        // reset({
        //     position: '',
        //     password: ''
        // })
    }
    const navigate = useNavigate()

    return (
        <section className=' bg-[#F5F7FA] px-16 py-10 w-full min-h-screen space-y-10'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex justify-start items-center'>
                    <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Add Sub Admin</h2>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[730px] mx-auto w-full border-[1px] border-[#B9B9B9] rounded-xl bg-[#FFFFFF] px-5 py-4">
                    <h2 className='text-[#1064FD] text-2xl text-left font-bold font-nunito mb-4'>Add sub admin</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Position</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="flex justify-between bg-[#f6f6fb] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                                <SelectValue placeholder="Manager" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Manager">Manager</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="access"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Access granted</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="flex justify-between bg-[#f6f6fb] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                                <SelectValue placeholder="Read & write" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Read & write">Read & write</SelectItem>
                                                <SelectItem value="Read">Read</SelectItem>
                                                <SelectItem value="Write">Write</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full Name" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10- digit number" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email address" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type={isShowPassword ? "text" : "password"} placeholder="*************" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
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
                    </div>

                    <Button type="submit" className='h-11 w-full mt-20 bg-[#1064FD] hover:bg-[#1064FD] text-base'>Add</Button>
                </form>
            </Form>
        </section>
    )
}

export default AddSubAdmin