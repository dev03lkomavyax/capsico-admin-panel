import { useRef } from "react";
import { PiCameraPlus } from "react-icons/pi";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";

const calculateTargetSizeMB = (file, reducePercent = 70) => {
  const originalMB = file.size / (1024 * 1024);
  return (originalMB * (100 - reducePercent)) / 100;
};

export default function SingleImageUpload({
  control,
  watch,
  setValue,
  name,
  label, // 🆕 Label prop for image name/title
  compress=false,
  className="",
}) {
  const preview = watch(`${name}Preview`);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validation: only images and max 2MB
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Only PNG, JPG, GIF and JPEG files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    if (compress) {
      try {
        const targetSizeMB = calculateTargetSizeMB(file, 70);
        // Compress image (reduce quality + dimensions)
        const compressedFile = await imageCompression(file, {
          maxSizeMB: targetSizeMB, // target ~1MB
          useWebWorker: true,
        });

        const previewUrl = URL.createObjectURL(compressedFile);
        setValue(name, compressedFile); // Save compressed file to form
        setValue(`${name}Preview`, previewUrl);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    } else {
      const previewUrl = URL.createObjectURL(file);
      setValue(name, file);
      setValue(`${name}Preview`, previewUrl);
    }
  };

  const handleRemove = () => {
    setValue(name, null);
    setValue(`${name}Preview`, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full relative">
      <FormField
        control={control}
        name={name}
        rules={{ required: "This field is required" }}
        render={() => (
          <FormItem>
            {/* 🆕 Display label above image box */}
            {label && (
              <p className="text-sm font-semibold text-[#4A5E6D] mb-2">
                {label}
              </p>
            )}

            {/* <FormLabel className="cursor-pointer w-full"> */}
            <div
              className={cn(
                "border-2 cursor-pointer border-dashed border-[#C2CDD6] mb-3 w-full aspect-square h-72 flex flex-col justify-center items-center rounded-md hover:border-[#1AA6F1]/70 transition relative",
                className
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover aspect-square w-full h-full rounded-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 px-[6px] text-xs hover:bg-red-700 transition"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-[#1AA6F1] px-5 py-4">
                  <PiCameraPlus size={45} />
                  <p className="font-bold text-sm mt-2">Add Photo</p>
                  <p className="font-normal text-xs mt-2 text-muted-foreground">
                    Click to upload
                  </p>
                </div>
              )}
            </div>
            {/* </FormLabel> */}

            <FormControl className="hidden">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpeg,.jpg,.gif"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
