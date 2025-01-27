import { Button } from '@/components/ui/button'
import { EditProfileSchema1 } from '@/schema/restaurantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CiLocationOn } from "react-icons/ci"
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const libraries = ["places", "marker"];

const EditProfile1 = ({ setPage, restaurant }) => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(EditProfileSchema1),
        defaultValues: {
            restaurantName: "",
            restaurantAddress: "",
            latitude: "",
            longitude: "",
            phoneNumber: "",
            phoneNumber2: "",
            STDCode: "",
            landlineNumber: "",
            fullName: "",
            email: "",
            samePhoneNumber: false,
            receiveUpdate: false,
        }
    })

    const { register, control, watch, setValue, getValues, reset } = form;
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)

    const { basicInfo, location,partnerDetails } = restaurant || {};

    useEffect(() => {
        reset({
            restaurantName: basicInfo?.name || "",
            restaurantAddress: location?.addressLine || "",
            latitude: location?.coordinates[1] || "",
            longitude: location?.coordinates[0] || "",
            phoneNumber: basicInfo?.phone || "",
            phoneNumber2: partnerDetails?.phone || "",
            STDCode: "",
            landlineNumber: "",
            fullName: partnerDetails?.name || "",
            email: partnerDetails?.email || "",
            samePhoneNumber: false,
            receiveUpdate: false,
        })
    }, [restaurant])

    const samePhoneNumber = watch("samePhoneNumber");

    useEffect(() => {
        samePhoneNumber ? setValue("phoneNumber2", getValues("phoneNumber")) : setValue("phoneNumber2", "");
    }, [samePhoneNumber, setValue, getValues]);


    const containerStyle = {
        width: '50%',
        height: '300px'
    };

    const [center, setCenter] = useState({
        lat: 19.8429547,
        lng: 75.2333128
    })

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;

            // Create an AdvancedMarkerElement instance
            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: center,
                map: map,
                content: "<div style='color: red;'>Hello, World!</div>" // Custom content
            });

            // Add additional marker configuration if needed
        }
    }, [mapRef]);

    const [markerPosition, setMarkerPosition] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                setValue("latitude", place.geometry.location.lat())
                setValue("longitude", place.geometry.location.lng())

                setCenter({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                })
                center.lat = place.geometry.location.lat()
                center.lng = place.geometry.location.lng()

                setMarkerPosition({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
                setValue("search", place.name);
            }
        }
    };

    const onMapClick = useCallback((e) => {
        setValue("latitude", e.latLng.lat())
        setValue("longitude", e.latLng.lng())
        setMarkerPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    }, []);

    console.log("markerPosition", markerPosition);

    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setValue("latitude", position.coords.latitude)
                setValue("longitude", position.coords.longitude)
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setMarkerPosition(currentLocation);
                // mapRef.current.panTo(currentLocation);
            });
        }
    }


    const onSubmit = (data) => {
        console.log("data", data);
        setPage((prev) => prev + 1);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
                    <div>
                        <div className="flex justify-between gap-2 mb-8">
                            <button onClick={() => navigate(-1)} className='flex justify-start items-center'>
                                <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
                            </button>
                            <Button size="lg" className="w-20 bg-[#1064FD]" type="submit">Save</Button>
                        </div>
                        <div className='border border-[#C2CDD6] rounded-md px-8 py-6'>
                            <h3 className='text-xl font-bold text-[#4A5E6D]'>Restaurant Information</h3>
                            <p className='text-lg font-normal text-[#92A5B5]'>Restaurant name. address. contact no., owner details</p>
                            <div className='mt-5'>
                                <FormField
                                    control={control}
                                    name="restaurantName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" text-[#344054] font-inter">Restaurant Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Adiyaman Hotel" className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='mt-5'>
                                    <FormField
                                        control={control}
                                        name="restaurantAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-[#344054] font-inter">Restaurant Complete address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="5/230 Adnan street, Gorakhpur - 273 001" className="placeholder:text-[#667085] placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='mt-5'>
                                    <p className='class-xl4 text-[#637D92]'>Please accurately place the pin at your outlet’s location on the map.</p>
                                    <p className='class-lg3 text-[#A8A8A8] mt-2'>This will assist your customers and Capsico riders in finding your store easily.</p>



                                    <div className='mt-5'>
                                        <LoadScript
                                            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                            libraries={libraries}
                                            loadingElement={<div>Loading...</div>}
                                            async
                                        >
                                            <div className='mb-2'>
                                                <FormField
                                                    control={control}
                                                    name="search"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                                                            <FormControl>
                                                                <Autocomplete
                                                                    onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                                                                    onPlaceChanged={handlePlaceSelect}
                                                                >
                                                                    <div className='flex border rounded'>
                                                                        <Input placeholder="Search for your store here & drop a pin on its location." className="placeholder:text-[#667085] placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                                                        <button onClick={detectLocation} type='button' className="text-[#1AA6F1] flex items-center gap-1 px-4 py-2">
                                                                            <CiLocationOn size={20} />
                                                                            <span className='font-bold'>Detect</span>
                                                                        </button>
                                                                    </div>
                                                                </Autocomplete>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={center}
                                                zoom={10}
                                                onClick={onMapClick}
                                                onLoad={(map) => mapRef.current = map}
                                            >
                                                {markerPosition && <Marker position={markerPosition} />}
                                            </GoogleMap>
                                        </LoadScript>
                                    </div>
                                    <p className='class-lg4 text-[#666666] mt-4'>Or directly enter the co-ordinates</p>
                                </div>

                                <div className='mt-5 grid grid-cols-2 gap-5'>
                                    <FormField
                                        control={control}
                                        name="latitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Latitude" className="placeholder:text-[#667085] placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="longitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Longitude" className="placeholder:text-[#667085] placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
                            <h3 className='text-xl font-bold text-[#4A5E6D]'>Contact number at Restaurant</h3>
                            <p className='text-lg font-normal text-[#92A5B5]'>Your customers can call this number for general inquiries.</p>
                            <div className='mt-5'>
                                <FormField
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" text-[#344054] font-inter">Phone Number</FormLabel>
                                            <FormControl>
                                                <div className='grid grid-cols-2 gap-4'>
                                                    <div className='flex gap-0 border rounded w-full'>
                                                        <Select className="">
                                                            <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
                                                                <SelectValue placeholder="India" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="india">India</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Input placeholder="+91 (98XXX XXXXX)" className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                                    </div>
                                                    <Button type="button" onClick={() => setIsOtpModalOpen(true)} disabled={watch("phoneNumber")?.length !== 10} variant="capsico" className="disabled:bg-[#E1E1E1] w-[30%]">Verify</Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <p className='class-lg4 text-[#666666] mt-5'>Or Want to share Landline number</p>

                                <div className='mt-5 grid grid-cols-2 gap-4'>
                                    <div className='grid grid-cols-[20%_78%] items-center gap-4'>
                                        <FormField
                                            control={control}
                                            name="STDCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel className=" text-[#344054] font-inter"></FormLabel> */}
                                                    <FormControl>
                                                        <Input placeholder="STD Code" className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="landlineNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel className=" text-[#344054] font-inter"></FormLabel> */}
                                                    <FormControl>
                                                        <div className='flex gap-4'>
                                                            <Input placeholder="Landline number" className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button disabled={true} variant="capsico" className="disabled:bg-[#E1E1E1] h-10 w-[30%]">Verify</Button>
                                </div>
                            </div>
                        </div>

                        <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
                            <h3 className='text-xl font-bold text-[#4A5E6D]'>Restaurant Owner Details</h3>
                            <p className='text-lg font-normal text-[#92A5B5]'>These will be used to share communications related to revenue.</p>

                            <FormField
                                control={control}
                                name="samePhoneNumber"
                                render={({ field }) => (
                                    <FormItem className="flex gap-3 items-center">
                                        <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="h-5 w-5"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-[#667085] class-lg1">
                                                Same as restaurant mobile number
                                            </FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='mt-5'>
                                <FormField
                                    control={control}
                                    name="phoneNumber2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" text-[#344054] font-inter">Phone Number</FormLabel>
                                            <FormControl>
                                                <div className='grid grid-cols-2 gap-4'>
                                                    <div className='flex gap-0 border rounded w-full'>
                                                        <Select className="">
                                                            <SelectTrigger className="w-[100px] border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="india">India</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Input placeholder="+91 (98XXX XXXXX)" className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                                    </div>
                                                    {!watch("samePhoneNumber") && <Button type="button" onClick={() => setIsOtpModalOpen(true)} disabled={watch("phoneNumber2")?.length !== 10} variant="capsico" className="disabled:bg-[#E1E1E1] w-[30%]">Verify</Button>}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='mt-5'>
                                    <FormField
                                        control={control}
                                        name="receiveUpdate"
                                        render={({ field }) => (
                                            <FormItem className="flex gap-3 items-center">
                                                <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="h-5 w-5"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="class-lg1 text-[#667085]">
                                                        Yes, I am interested in receiving important updates and notifications from Capsico through WhatsApp.
                                                    </FormLabel>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mt-5 grid grid-cols-2 w-[66%] gap-5'>
                                    <FormField
                                        control={control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-[#344054] font-inter">Restaurant Owner Full name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Adiyaman Kumar" className="placeholder:text-[#667085] placeholder:font-inter" {...field} />
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
                                                <FormLabel className=" text-[#344054] font-inter">Restaurant Owner email address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@company.com" className="placeholder:text-[#667085] placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* {isOtpModalOpen &&
                            <OtpModal
                                isOtpModalOpen={isOtpModalOpen}
                                setIsOtpModalOpen={setIsOtpModalOpen}
                            />
                        } */}
                    </div>

                </form>
            </Form>
        </div>
    )
}

export default EditProfile1