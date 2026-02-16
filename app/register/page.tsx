"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { registerUser } from "@/store/authSlice";
import Link from "next/link";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await dispatch(registerUser(form)).unwrap();
      setSuccess(true);
    } catch (err: any) {
      setErrors(err.errors || {});
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Registration Successful 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            We’ve sent a verification link to <br />
            <span className="font-semibold">{form.email}</span>
          </p>

          <p className="text-sm text-gray-500">
            Please verify your email before logging in.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-white"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Create Your Travel Monk Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              name="name"
              placeholder="Full Name"
              className="w-full rounded-md border px-4 py-2"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              className="w-full rounded-md border px-4 py-2"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-md border px-4 py-2"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>

          <div>
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-md border px-4 py-2"
              value={form.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}