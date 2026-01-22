import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/loginSchema";
import Field from "@/components/shadcnCom/Field";
import { IoEye } from "react-icons/io5";
import { BiSolidHide } from "react-icons/bi";
import usePostApiReq from "@/hooks/usePostApiReq";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { readCookie } from "@/utils/readCookie";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const { res, fetchData, isLoading } = usePostApiReq();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      adminId: "",
      password: "",
    },
  });

  const { control, reset, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log("data", data);
    fetchData("/admin/admin-login", {
      email: data.adminId,
      password: data.password,
    });
  };
  
  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("login res", res);
      navigate("/admin/dashboard");
      localStorage.setItem("adminAccessToken", res?.data?.accessToken);
      localStorage.setItem("admin-status", true);
      Cookies.set("userInfo", JSON.stringify(res?.data?.user), {
        expires: 365,
      });
      Cookies.set("admin-status", true, { expires: 365 });
    }
  }, [res]);

  useEffect(() => {
    // const isAuthenticated = JSON.parse(
    //   localStorage.getItem("admin-status") || false
    // );
    const adminStatus = readCookie("admin-status");
    const isAuthenticated = JSON.parse(JSON.stringify(adminStatus) || "false");
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <section className="flex justify-center items-center w-full h-screen bg-[#4880FF]">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[630px] w-full border-[1px] border-[#B9B9B9] rounded-3xl bg-[#FFFFFF] px-16 py-20"
        >
          <h2 className="text-[#202224] text-[32px] text-center font-bold font-nunito mb-4">
            Login
          </h2>
          <p className="text-[#202224] text-lg text-center font-semibold font-nunito opacity-80">
            Please enter your admin and password to continue
          </p>
          <div className="my-7">
            <Field
              name="adminId"
              title="Admin ID"
              control={control}
              placeholder="Admin ID"
              type="email"
            />
          </div>
          <div className="mb-12 w-full relative">
            <Field
              name="password"
              title="Password"
              control={control}
              placeholder="*************"
              type={`${showPassword ? "password" : "text"}`}
            />
            {showPassword ? (
              <IoEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[52px] right-3 text-gray-500 text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidHide
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[52px] right-3 text-gray-500 text-2xl cursor-pointer"
              />
            )}
            <div className="flex justify-between items-center mt-[6px]">
              <div className="flex justify-start items-center gap-2">
                <Checkbox className="border-[0.6] border-[#A3A3A3] data-[state=checked]:bg-[#FFFFFF] data-[state=checked]:text-[#656565]" />
                <p className="text-[#202224] text-lg font-normal font-nunito opacity-80">
                  Remember Password
                </p>
              </div>
              <p className="text-[#202224] text-lg font-normal font-nunito opacity-60">
                Forget Password?
              </p>
            </div>
          </div>
          <Button type="submit" variant="login" className="h-[56px]">
            Login
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Login;
