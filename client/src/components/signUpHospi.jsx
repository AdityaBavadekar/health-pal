import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiConstants from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  mobileNumber: z.string().length(10, {
    message: "Mobile number must be exactly 10 digits.",
  }),
  licenseData: z.string().min(2, {
    message: "License data must be at least 2 characters.",
  }),
});

const SignupHospital = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(ApiConstants.API_REGISTER_HOSPITAL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register hospital.");
      }

      const responseData = await response.json();
      Cookies.set("jwt", responseData.token, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-emerald-100 p-3">
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        {/* <h1 className="text-3xl font-bold text-emerald-600 mb-6">
          Hospital Signup
        </h1> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Mobile Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LicenseData</FormLabel>
                  <FormControl>
                    <Input placeholder="licenseData" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LicenseData</FormLabel>
                  <FormControl>
                    <Input placeholder="licenseData" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-1 md:col-span-2">
              <Button
                type="submit"
                className="bg-emerald-600 text-white w-full"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupHospital;
