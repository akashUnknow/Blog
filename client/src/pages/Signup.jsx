import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignin  } from "@/helper/RouteName";
import { Button } from "@/components/ui/button";
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
import { getEnv } from "@/helper/getEnv";
import { ShowToast } from "@/helper/showToast";
import GoogleLogin from "@/components/GoogleLogin";


const Signup = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(3, "Password must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().refine((data)=>data.password === data.confirmPassword, {
      message: "Passwords do not match", })
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  // registation
  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const data= await response.json();
      if (!response.ok) {
        return ShowToast("error", data.message || "Something went wrong");
        
      }
      navigate(RouteSignin);
      ShowToast("success", "User registered successfully");
    } catch (error) {
      ShowToast("error", error.message || "Something went wrong");
      console.error("Error during registration:", error);
      
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-screen">
      <Card className="w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div>
          <GoogleLogin/>
          <div className="border-1 my-5 flex items-center justify-center ">
            <span className="absolute bg-white text-sm">OR</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                {" "}
                Submit
              </Button>
              <div className="text-center mt-4 flex items-center justify-center gap-2">
                <p>Already have account? </p>
                <Link
                  to={RouteSignin}
                  className="text-blue-500 hover:underline "
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
