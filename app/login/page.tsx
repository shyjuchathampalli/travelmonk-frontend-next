"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginUser, googleLogin } from "@/store/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Show success message after email verification redirect
  useEffect(() => {
    if (searchParams.get("verified")) {
      setSuccess("Email verified successfully. You can login now.");
    }
  }, [searchParams]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      router.push("/");
    } catch (err: any) {
      // Backend error message
      if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    setError("");
    setLoading(true);

    try {
      await dispatch(googleLogin(credential)).unwrap();
      router.push("/");
    } catch (err: any) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-2 text-2xl font-bold text-center">
          Welcome Back
        </h2>

        <p className="mb-6 text-center text-gray-500">
          Login to continue your journey
        </p>

        {/* ✅ SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* ✅ ERROR MESSAGE */}
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Email Login */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              }
            }}
            onError={() =>
              setError("Google authentication failed. Please try again.")
            }
          />
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New to Travel Monk?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}