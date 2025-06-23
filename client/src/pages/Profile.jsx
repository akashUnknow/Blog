import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "@/helper/getEnv";
import { ShowToast } from "@/helper/showToast";
import { IoCameraOutline } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import Dropzone, { useDropzone } from "react-dropzone";
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
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";

const Profile = () => {
  const [filePreview, setFilePreview] = useState(null);
  const user = useSelector((state) => state.user);
  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/get-user/${user._id}`,
    {
      method: "GET",
      credentials: "include",
    },
    []
  );
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    password: z.string(),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name || "",
        email: userData.user.email || "",
        bio: userData.user.bio || "",
        password: "", // Password should not be pre-filled for security reasons
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/user/update/${user._id}`,
        {
          method: "post",
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return ShowToast("error", data.message || "Something went wrong");
      }
      dispatch(setUser(data.user));
      ShowToast("success", "User registered successfully");
    } catch (error) {
      ShowToast("error", error.message || "Something went wrong");
      console.error("Error during registration:", error);
    }
  }

  const handelFileSelection = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      ShowToast("error", "Please select a file");
      return;
    }
    const file = acceptedFiles[0];
    const preview=URL.createObjectURL(file);
    setFilePreview(preview);
  }

  if (loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone onDrop={(acceptedFiles) => handelFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-24 h-24 relative group">
                  <AvatarImage src={filePreview? filePreview:userData?.user.avatar} />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 rounded-full group-hover:flex hidden cursor-pointer">
                    <IoCameraOutline className="" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
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
                  name="bio"
                  type="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your Bio" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
