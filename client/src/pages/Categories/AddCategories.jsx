import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignin } from "@/helper/RouteName";
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
import slugify from "slugify";

const AddCategories = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(3, "Password must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  useEffect(() => {
    const categoryName=form.watch('name')
    if(categoryName){
      const slug=slugify(categoryName,{lower:true})
      form.setValue("slug", slug);
    }
  });

  // registation
  async function onSubmit(values) {
    // try {
    //   const response = await fetch(
    //     `${getEnv("VITE_API_BASE_URL")}/auth/register`,
    //     {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     }
    //   );
    //   const data = await response.json();
    //   if (!response.ok) {
    //     return ShowToast("error", data.message || "Something went wrong");
    //   }
    //   navigate(RouteSignin);
    //   ShowToast("success", "User registered successfully");
    // } catch (error) {
    //   ShowToast("error", error.message || "Something went wrong");
    //   console.error("Error during registration:", error);
    // }
  }
  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategories;
