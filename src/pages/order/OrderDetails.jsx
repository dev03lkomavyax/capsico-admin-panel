import avatar from "@/assets/Image-120.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import History from "@/components/order-details/History";
import OrderItem from "@/components/order-details/OrderItem";
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { OrderSchema } from "@/schema/OrderSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa6';
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const libraries = ["places", "marker"];

// const status = "Delivered";
const status = "Preparing";
// const status = "New order";
// const status = "Cancelled";

const capsico = true;
// const capsico = false;

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]


const OrderDetails = () => {
    const containerStyle = {
        width: '100%',
        height: '280px'
    };
    const [deliveryAgent, setDeliveryAgent] = useState("");
    const [open, setOpen] = useState(false);

    const [center, setCenter] = useState({
        lat: 19.8429547,
        lng: 75.2333128
    })

    const [minute, setMinute] = useState(1);

    const form = useForm({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            otp: "",
            temperature: "",
        }
    })
    const { register, control, watch, setValue, getValues } = form;

    const onSubmit = (data) => {
        console.log("data", data);
    }

    return (
        <AdminWrapper>
            <section>
                <div className='flex justify-between h-14'>
                    <div>
                        <div className="flex items-center gap-1">
                            <IoIosArrowBack className='text-2xl' />
                            <span className='font-roboto text-lg font-medium'>Order ID #1264903 </span>
                        </div>
                        <span className='text-sm text-[#5F5F5F] font-roboto'>Orders/orders details</span>
                    </div>
                    <Button className={`${status === "Delivered" ? "text-[#167316] bg-[#CEFFCA]" : status === "Preparing" ? "text-[#787A23] bg-[#F7FFCA]" : status === "Cancelled" ? "text-[#BF1010] bg-[#FFE7E7]" : "text-[#6223B5] bg-[#E1CAFF]"} h-[54px] w-[167px] text-xl hover:text-[#167316] hover:bg-[#CEFFCA]`}>{status}</Button>
                </div>

                {/* h-[calc(100vh-56px)] */}
                <div className="grid grid-cols-[26%_71%] gap-[3%] mt-5 h-screen">
                    <div className='rounded-lg bg-white px-4 py-10'>
                        <div className="flex justify-center flex-col items-center">
                            <img className="w-32 h-32 rounded-full" src={avatar} alt="avatar" />
                            <h2 className='font-medium font-roboto mt-3 text-xl'>Leon Barrows</h2>
                            <p className="font-roboto text-[#838383] text-sm">Customer</p>
                            {status === "Preparing" &&
                                <Button className="w-full text-white bg-[#1064FD] mt-2 hover:bg-[#1064FD]">Order ready in 10:19</Button>
                            }
                            {status === "New order" &&
                                <div className="border rounded-lg p-3 w-full">
                                    <h5 className="font-inter -mt-[6px] font-medium text-[10px] text-[#666666]">Enter food preparation time</h5>
                                    <div className="flex justify-between w-full items-center mt-2 px-4 py-1 border rounded-lg">
                                        <FaMinus onClick={() => setMinute((prev) => prev - 1)} className="cursor-pointer text-2xl" />
                                        <p className="font-medium font-dmSans text-[#515151]">{minute} mins</p>
                                        <FaPlus onClick={() => setMinute((prev) => prev + 1)} className="cursor-pointer text-2xl" />
                                    </div>
                                    <div className="mt-2 grid grid-cols-[40%_58%] gap-[2%]">
                                        <Button className="w-full font-dmSans font-normal bg-[#F05542] hover:bg-[#e84f3b] text-white hover:text-white rounded-lg">Reject</Button>
                                        <Button className="w-full font-dmSans font-normal bg-[#1064FD] hover:bg-[#255fcb] to-40% text-white rounded-lg">Accept in 02:19</Button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col mt-12">
                            <h2 className="font-roboto text-sm mb-2">History</h2>
                            <History status={status} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='rounded-lg bg-white p-4 px-6 flex justify-between items-center'>
                            <div>
                                <span className="text-sm font-roboto">{capsico ? "Restaurant Details" : "Vendor Details"}</span>
                                <h2 className="font-inter text-xl font-medium mt-3">Adiyaman Hotel</h2>
                                <span className="font-inter text-[#565656]">462 Cortney Glens, Berkshire</span>
                            </div>
                            <div>
                                <Button variant="ghost" className="text-xl font-inter font-semibold hover:bg-transparent text-[#003CFF] hover:text-[#003CFF]">View</Button>
                            </div>
                        </div>
                        <div className='rounded-lg bg-white mt-5 p-4 px-6'>
                            <div className="grid grid-cols-3 gap-3">
                                <h2 className="font-inter text-sm font-medium">Items</h2>
                                <h2 className="font-inter text-sm font-medium">Oty</h2>
                                <h2 className="font-inter text-sm font-medium">Price</h2>
                            </div>
                            <div className="flex flex-col gap-3 mt-3">
                                <OrderItem capsico={capsico} />
                                <OrderItem capsico={capsico} />
                                <OrderItem capsico={capsico} />
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                                <h3 className='font-roboto font-medium flex gap-1 items-center text-[#515151]'>
                                    Total amount
                                    {status === "New order" &&
                                        <div className="bg-[#FFEFB5] text-black font-inter rounded-lg text-[10px] font-semibold flex justify-center px-2 py-[3px]">
                                            PAID
                                        </div>
                                    }
                                </h3>
                                <div></div>
                                <h3 className="font-roboto text-[#515151] font-medium">₹390</h3>
                            </div>
                        </div>
                        <div className='rounded-lg bg-white mt-5 p-4 px-6'>
                            {status !== "Cancelled" &&
                                <>
                                    <h2 className="font-roboto font-semibold">Track Order</h2>
                                    <div className="grid grid-cols-[60%_38%] gap-[2%] mt-3">
                                        <div>
                                            <LoadScript
                                                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                                libraries={libraries}
                                                loadingElement={<div>Loading...</div>}
                                                async
                                            >
                                                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                                                    <Marker
                                                        position={center}
                                                    />
                                                </GoogleMap>

                                            </LoadScript>
                                        </div>
                                        <div>
                                            <div className="border rounded-lg p-4 h-auto">
                                                <h4 className="text-sm font-medium font-inter text-[#515151] -mt-2">Delivery Partner info</h4>


                                                {status === "New order" &&
                                                    <div className="mt-3">
                                                        <h2 className="text-xs font-inter text-[#1D1D1D] font-medium">Delivery partner will be assigned shortly. </h2>
                                                        <p className="font-inter text-[10px] text-[#7C7C7C]">The delivery partner will be assigned after Restaurant accept the order. </p>
                                                    </div>
                                                }

                                                {!deliveryAgent ?
                                                    <Popover open={open} onOpenChange={() => setOpen(!open)}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={open}
                                                                className="w-full mt-4 h-9 px-4 justify-between"
                                                            >
                                                                {deliveryAgent
                                                                    ? frameworks.find((framework) => framework.value === deliveryAgent)?.label
                                                                    : "Select"}
                                                                <IoIosArrowDown />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[300px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search Name" className="h-9" />
                                                                <CommandList>
                                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {frameworks.map((framework) => (
                                                                            <CommandItem
                                                                                key={framework.value}
                                                                                value={framework.value}
                                                                                onSelect={(currentValue) => {
                                                                                    setDeliveryAgent(currentValue === deliveryAgent ? "" : currentValue)
                                                                                    setOpen(false)
                                                                                }}
                                                                                className="flex justify-between items-center"
                                                                            >
                                                                                <div className="flex gap-2 items-center">
                                                                                    <img className='w-6 h-6 rounded-full bg-blue-200' src="" alt="" />
                                                                                    <h3 className='text-[10px]'>Corey Gislason</h3>
                                                                                </div>
                                                                                <p className='font-semibold text-[10px] text-[#003CFF]'>Available Now</p>
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>

                                                    : <>
                                                        {status !== "New order" &&
                                                            <>
                                                                <div className="flex justify-between items-center gap-2 mt-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 rounded-full bg-[#A4CAFE] flex justify-center items-center text-white font-inter">R</div>
                                                                        <div className="flex flex-col justify-center">
                                                                            <h4 className="text-sm font-inter">Roberts</h4>
                                                                            <p className="text-[10px] font-inter -mt-[1px]">ID: 2478950</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <h4 className="text-xs font-inter">Rating</h4>
                                                                        <p className="font-inter -mt-[1px] flex items-center gap-1">
                                                                            <span className="text-sm text-[#FFA901]">4.8</span>
                                                                            <FaStar className="text-[#FFA901]" />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-3 items-center mt-3">
                                                                    <FiPhone />
                                                                    <span className="text-xs font-inter">Mobile No: (704) 555-0127</span>
                                                                </div>
                                                                <div className="flex gap-3 items-center mt-2">
                                                                    <GrLocation />
                                                                    <span className="text-xs font-inter">Locality : R.N Nagar, Gorakhpur</span>
                                                                </div>
                                                                <Button variant="ghost" size="sm" className="text-sm font-inter mt-2 font-medium hover:bg-transparent p-0 text-[#003CFF] hover:text-[#003CFF]">View more</Button>
                                                            </>}
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3">
                                                                <div className='w-full'>
                                                                    <FormField
                                                                        control={control}
                                                                        name="otp"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <FormLabel className="text-lg text-[#3B3B3B] font-bold font-inter">Enter OTP</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input type="number" placeholder="" className="placeholder:text-[#3B3B3B] w-full" {...field} />
                                                                                    </FormControl>
                                                                                </div>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="mt-2">
                                                                    <FormField
                                                                        control={control}
                                                                        name="temperature"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-sm text-[#3B3B3B] font-inter">Enter Balaji’s Body temperature</FormLabel>
                                                                                <FormControl>
                                                                                    <div className='w-full grid grid-cols-2 mt-3 gap-5'>
                                                                                        <Input placeholder="98.4° F" className="placeholder:text-[#3B3B3B] w-full" {...field} />
                                                                                        <Button type="submit" className="w-full rounded-xl hover:text-white bg-[#1064FD] hover:bg-[#225ac1]">Submit</Button>
                                                                                    </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </form>
                                                        </Form>
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {status === "Cancelled" &&
                                <div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-inter font-medium text-sm text-[#515151]">Reason</h3>
                                        <p className="font-inter text-xs text-[#7C7C7C]">order placed by mistake</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </AdminWrapper>
    )
}

export default OrderDetails