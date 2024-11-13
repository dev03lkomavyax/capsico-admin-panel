import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { UpdateAdminProfileSchema } from "@/schema/UpdateAdminProfileSchema"
import { updatePreview } from "@/utils/updatePreview"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { CiUser } from "react-icons/ci"

const UpdateAdminProfile = () => {
    const form = useForm({
        resolver: zodResolver(UpdateAdminProfileSchema),
        defaultValues: {
            profileImg: '',
            adminID: '',
            name: '',
            phoneNumber: '',
            email: '',
        }
    })

    const { control, reset, handleSubmit, watch, register, setValue } = form

    const profileImgRef = register("profileImg");

    const profileImg = watch("profileImg");

    useEffect(() => {
        updatePreview(profileImg, "profileImgPreview", setValue);
    }, [form, profileImg, setValue]);

    const onSubmit = (data) => {
        console.log('data', data)
    }

    return (
        <section className=' bg-[#F5F7FA] min-h-screen p-5 flex justify-center'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[480px] w-full border-[1px] border-[#B9B9B9] rounded-xl bg-[#FFFFFF] px-5 py-4">
                    <h2 className='text-[#1064FD] text-2xl text-left font-bold font-nunito mb-4'>Profile</h2>

                    <div className="flex flex-col justify-center items-center">
                        <div className="h-32 w-32 rounded-full flex justify-center items-center bg-[#F0F0F0]">
                            {watch("profileImgPreview") ?
                                <img className="w-full h-full rounded-full" src={watch("profileImgPreview")} alt="" />
                                : <CiUser className="text-6xl text-[#676767]" />}
                        </div>
                        <FormField
                            control={control}
                            name="profileImg"
                            render={({ field }) => (
                                <FormItem className="z-20">
                                    <FormLabel className="cursor-pointer bg-[#E3EDFF] py-2 rounded-md px-4 hover:bg-[#c6d6f3] mt-4 inline-block w-28 font-inter text-[#1064FD] font-semibold">
                                        Edit Profile
                                    </FormLabel>
                                    <FormControl className="hidden">
                                        <Input multiple={true} type="file" accept='.png,.jpeg,.jpg' {...profileImgRef} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="adminID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Admin ID</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} placeholder="Admin ID" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
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
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Admin Name" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
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
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Email Address</FormLabel>
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
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-[#111928] font-semibold font-nunito opacity-80`}>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] rounded-lg mt-4`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button type="submit" className='h-11 w-full mt-5 bg-[#1064FD] hover:bg-[#1064FD] text-base'>Update</Button>
                </form>
            </Form>
        </section>
    )
}

export default UpdateAdminProfile