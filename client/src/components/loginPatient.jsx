import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiConstants from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginPatient = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(ApiConstants.API_LOGIN_PATIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error(errorData.message || "Failed to log in.");
      }

      const responseData = await response.json();
      Cookies.set("jwt", responseData.token, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
      navigate("/dashboard");

      return responseData;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  return (
    <div className="w-full bg-emerald-100 p-3 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">
          Patient Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username/Email" {...field} />
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
            <h1>
              Not a user? <a href="/signup">SignUp</a>
            </h1>
            <Button type="submit" className="bg-emerald-600 text-white">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPatient;
