import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    GoogleMap,
    LoadScript,
    Marker
} from "@react-google-maps/api";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
const libraries = ["places", "marker"];

const CreateZone = () => {
  const [zoom, setZoom] = useState(10);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name required."),
        description: z.string().min(1, "Description required."),
        city: z.string().min(1, "City required."),
        radius: z.coerce.number().min(1, "Radius required."),
        cityName: z.string().optional(),
        latitude: z.coerce.number().min(1, {
          message: "Latitude is required",
        }),
        longitude: z.coerce.number().min(1, {
          message: "Longitude is required",
        }),
      })
    ),
    defaultValues: {
      name: "",
      description: "",
      city: "",
      cityName: "",
      latitude: "",
      longitude: "",
      radius: null,
    },
  });

  const { setValue, control } = form;

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const [center, setCenter] = useState({
    lat: 19.8429547,
    lng: 75.2333128,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Create an AdvancedMarkerElement instance
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
        content: "<div style='color: red;'>Hello, World!</div>", // Custom content
      });

      // Add additional marker configuration if needed
    }
  }, [mapRef]);

  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [cities, setCities] = useState([]);
  const { pathname } = useLocation();

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setValue("latitude", place.geometry.location.lat());
        setValue("longitude", place.geometry.location.lng());

        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        center.lat = place.geometry.location.lat();
        center.lng = place.geometry.location.lng();

        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setValue("search", place.name);
      }
    }
  };

  const onMapClick = useCallback(
    (e) => {
      setValue("latitude", e.latLng.lat());
      setValue("longitude", e.latLng.lng());
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    },
    [setValue]
  );

  console.log("markerPosition", markerPosition);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(currentLocation);
        setCenter(currentLocation);
      });
    }
  };

  //   const geocodeCity = (cityName) => {
  //     if (!window.google) return;

  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({ address: cityName }, (results, status) => {
  //       if (status === "OK" && results[0]) {
  //         const location = results[0].geometry.location;

  //         const newCenter = {
  //           lat: location.lat(),
  //           lng: location.lng(),
  //         };

  //         setCenter(newCenter);
  //         setMarkerPosition(newCenter);
  //         setZoom(12); // zoom closer

  //         // ✅ update form values so lat/lng are available in submit
  //         setValue("latitude", newCenter.lat);
  //         setValue("longitude", newCenter.lng);
  //       } else {
  //         console.error("Geocode failed: ", status);
  //       }
  //     });
  //   };

  const geocodeCity = (cityName) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: cityName }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };

        // Center + marker
        setCenter(newCenter);
        setMarkerPosition(newCenter);

        // ✅ Update form values
        setValue("latitude", newCenter.lat);
        setValue("longitude", newCenter.lng);

        // ✅ Fit map to city bounds
        if (mapRef.current && results[0].geometry.viewport) {
          mapRef.current.fitBounds(results[0].geometry.viewport);
        } else {
          setZoom(12); // fallback zoom
        }
      } else {
        console.error("Geocode failed: ", status);
      }
    });
  };

  const {
    res: fetchCitiesRes,
    fetchData: fetchCities,
    isLoading: isCitiesLoading,
  } = useGetApiReq();

  const getCities = () => {
    fetchCities("/availableCities/get-all");
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (fetchCitiesRes?.status === 200 || fetchCitiesRes?.status === 201) {
      console.log("fetchCitiesRes", fetchCitiesRes);
      setCities(fetchCitiesRes?.data?.cities || []);
    }
  }, [fetchCitiesRes]);

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);
    const apiData = {
      name: data.name,
      cityId: data.city,
      type: "circle",
      center: {
        coordinates: [data.longitude, data.latitude],
      },
      radius: data.radius,
      description: data.description,
    };
    fetchData(`/zones/create`, apiData);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("onSubmit res", res);
      navigate("/admin/zones");
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <button
          className="inline-flex gap-1 items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Create Zone
          </h2>
        </button>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white mt-5 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Description..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    City <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const selectedCity = cities.find(
                          (c) => c._id === value
                        );
                        if (selectedCity) {
                          setValue("cityName", selectedCity.city || "");
                          geocodeCity(selectedCity.city); // 👈 use name, not lat/lng
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger disabled={isCitiesLoading}>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cities.map((city) => (
                            <SelectItem
                              key={city?._id}
                              value={city?._id}
                              className="capitalize"
                            >
                              {city.city}
                            </SelectItem>
                          ))}
                          {cities.length === 0 && (
                            <DataNotFound name="Cities" />
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <h3>Mark in map and add radius for zone selection</h3>
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
                loadingElement={<div>Loading...</div>}
                async
              >
                {/* <div className="mb-2">
                  <FormField
                    control={control}
                    name="search"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                        <FormControl>
                          <Autocomplete
                            onLoad={(autocomplete) =>
                              setAutocomplete(autocomplete)
                            }
                            onPlaceChanged={handlePlaceSelect}
                          >
                            <div className="flex border rounded">
                              <Input
                                placeholder="Search for your store here & drop a pin on its location."
                                className="placeholder:text-[#667085] placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                {...field}
                              />
                              <button
                                onClick={detectLocation}
                                type="button"
                                className="text-[#1AA6F1] flex items-center gap-1 px-4 py-2"
                              >
                                <CiLocationOn size={20} />
                                <span className="font-bold">Detect</span>
                              </button>
                            </div>
                          </Autocomplete>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={zoom}
                  onClick={onMapClick}
                  onLoad={(map) => (mapRef.current = map)}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </LoadScript>
              <div className="mt-5 grid grid-cols-2 gap-5">
                <FormField
                  control={control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-[#344054] font-inter"></FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="Latitude"
                          className="placeholder:text-[#667085] placeholder:font-inter"
                          {...field}
                        />
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
                        <Input
                          disabled
                          placeholder="Longitude"
                          className="placeholder:text-[#667085] placeholder:font-inter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="radius"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Radius
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Radius..."
                      type="number"
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={`text-[#111928] font-semibold font-inter opacity-80`}
                          >
                            Type
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select App Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="restaurant">Restaurant</SelectItem>
                                  <SelectItem value="delivery-partner">
                                    Delivery Partner
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

            <Button
              type="submit"
              className="h-11 w-full text-base font-inter"
              variant="capsico"
              disabled={isLoading}
            >
              {isLoading ? "Submiting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </AdminWrapper>
  );
};

export default CreateZone;
