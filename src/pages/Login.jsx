import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const Login = () => {
    return (
        <section className='flex justify-center items-center w-full h-screen bg-slate-400'>
            <div className='max-w-[630px] w-full border-[1px] border-[#B9B9B9] rounded-3xl bg-[#FFFFFF] px-16 py-20'>
                <h2 className='text-[#202224] text-[32px] text-center font-bold font-nunito mb-4'>Login</h2>
                <p className='text-[#202224] text-lg text-center font-semibold font-nunito opacity-80'>Please enter your admin and password to continue</p>
                <div className='my-7'>
                    <Label className={`text-[#202224] text-lg font-semibold font-nunito opacity-80`}>Admin ID</Label>
                    <Input type='email' placeholder='Admin Id' className={`h-[56px] placeholder:text-[#A6A6A6] text-lg font-semibold font-nunito border-[1px] border-[#D8D8D8] bg-[#F1F4F9] rounded-lg mt-4`} />
                </div>
                <div className='mb-12'>
                    <Label className={`text-[#202224] text-lg font-semibold font-nunito opacity-80`}>Password</Label>
                    <Input type='email' placeholder='*************' className={`h-[56px] placeholder:text-[#A6A6A6] text-lg font-semibold font-nunito border-[1px] border-[#D8D8D8] bg-[#F1F4F9] rounded-lg mt-4`} />
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start items-center gap-2 mt-[6px]'>
                            <Checkbox/>
                            <p className='text-[#202224] text-lg font-normal font-nunito opacity-80'>Remember Password</p>
                        </div>
                        <p className='text-[#202224] text-lg font-normal font-nunito opacity-60'>Forget Password?</p>
                    </div>
                </div>
                <button className='h-[56px] w-full text-[#FFFFFF] text-xl font-bold font-nunito rounded-lg bg-[#1064FD] opacity-90'>Login</button>
            </div>
        </section>
    )
}

export default Login
