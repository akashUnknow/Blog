import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "@/helper/RouteName";
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
import { useDispatch } from "react-redux";
import GoogleLogin from "@/components/GoogleLogin";
import { setUser } from "@/redux/user/user.slice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return ShowToast("error", data.message || "Something went wrong");
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      ShowToast("success", "User registered successfully");
    } catch (error) {
      ShowToast("error", error.message || "Something went wrong");
      console.error("Error during registration:", error);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-screen">
      <Card className="w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div>
          <GoogleLogin />
          <div className="border-1 my-5 flex items-center justify-center ">
            <span className="absolute bg-white text-sm">OR</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                type="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Password" {...field} />
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
                <p>dont&apos;t have account? </p>
                <Link
                  to={RouteSignup}
                  className="text-blue-500 hover:underline "
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
