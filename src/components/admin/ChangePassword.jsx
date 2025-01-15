import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { changePasswordSchema } from '@/schema/AddSubAdminSchema'
import { Button } from '../ui/button'

const ChangePassword = () => {

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            changePassword: ''
        }
    })

    const onSubmit = (data) => {
        console.log("data :", data)
        form.reset({
            currentPassword: '',
            changePassword: ''
        })
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className='text-[#397FFE] text-base font-semibold font-inter mt-3 cursor-pointer'>Change password</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <h2 className='text-[#1064FD] text-2xl font-semibold font-inter'>Change Password</h2>
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-inter opacity-80`}>Current Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Current Password" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] font-inter rounded-lg`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="changePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-[#111928] font-semibold font-inter opacity-80`}>Change Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Change Password" className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] font-inter rounded-lg`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='h-11 w-full bg-[#1064FD] hover:bg-[#1064FD] text-base font-inter'>Change Password</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ChangePassword