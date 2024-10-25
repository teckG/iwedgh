import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


// Forms
import { z } from "zod"


const formSchema = z.object({
  firstname: z.string().max(20).min(3, {
    required_error: "First name is required",
    message: "First name must be at least 3 characters long.",
  }),
  lastname: z.string().max(20).min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  email: z.string().email().toLowerCase({
    required_error: "Email is required",
    message: "Email is not valid.",
  }),
  password: z.string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(20, { message: "Password must be no more than 20 characters long" })
  .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must include at least one number" })
  .regex(/[\W_]/, { message: "Password must include at least one special character" }),
  confirmPassword: z.string().refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the error on confirmPassword
  })


})


const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 gap-8">

<div className="col flex-1">
      {/* First Name */}
      <div>
        <label htmlFor="firstname" className="block text-sm text-white font-bold">
          First Name
        </label>
        <input
          id="firstname"
          {...register('firstname')}
          className="mt-1 w-full border-2 block border-gray-500 rounded-md shadow-sm p-2"
        />
        {errors.firstname && (
          <p className="mt-2 text-sm text-red-600">{errors.firstname.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastname" className="block text-sm text-white font-bold">
          Last Name
        </label>
        <input
          id="lastname"
          {...register('lastname')}
          className="mt-1 w-full border-2 block  border-gray-500 rounded-md shadow-sm p-2"
        />
        {errors.lastname && (
          <p className="mt-2 text-sm text-red-600">{errors.lastname.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-white font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 w-full border-2 block  border-gray-500 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      </div>
      <div className="col flex-1">

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm text-white font-bold text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 w-full border-2 block  border-gray-500 rounded-md shadow-sm p-2"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm text-white font-bold text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="mt-1 w-full border-2 block  border-gray-500 rounded-md shadow-sm p-2"
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="p-12   bg-green-500 w-full text-white py-3 mt-6 rounded-md font-bold">
        Register
      </button>
      </div>
    </form>

    <p className='pt-8'>Are you a vendor? Kindly click the link below to register and get your service listed on our platform</p>
    <a className='text-blue-500' href="#linktogoogleform">Link to Google Form</a>
    </div>
  );
};

export default RegistrationForm;

