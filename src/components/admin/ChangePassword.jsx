/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { changePasswordSchema } from "@/schema/AddSubAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ChangePassword = ({
  isChangePassword,
  setIsChangePassword,
  subadminId,
}) => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      changePassword: "",
    },
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { res, fetchData, isLoading } = usePatchApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);
    fetchData(`/admin/change-password?subAdminId=${subadminId}`, {
      password: data.changePassword,
    });
    form.reset();
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("change password res", res);
      setIsChangePassword(false);
    }
  }, [res, setIsChangePassword]);

  return (
    <Dialog open={isChangePassword} onOpenChange={setIsChangePassword}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-[#1064FD] text-2xl font-semibold font-inter">
              Change Password
            </h2>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Current Password"
                        className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] font-inter rounded-lg`}
                        {...field}
                      />
                      {showOldPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowOldPassword(false)}
                          className="text-[#A6A6A6] cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowOldPassword(true)}
                          className="text-[#A6A6A6] cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                        />
                      )}
                    </div>
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
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        className={`placeholder:text-[#A6A6A6] bg-[#f6f6fb] font-inter rounded-lg`}
                        {...field}
                      />
                      {showNewPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowNewPassword(false)}
                          className="text-[#A6A6A6] cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowNewPassword(true)}
                          className="text-[#A6A6A6] cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-11 w-full bg-[#1064FD] hover:bg-[#1064FD] text-base font-inter"
              disabled={isLoading}
            >
              Change Password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
