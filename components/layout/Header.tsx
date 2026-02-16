"use client";

import Image from "next/image";
import Link from "next/link";
import { Tag, Headset, UserCircle, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <header className="w-full bg-white relative shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/travel-monk-logo.png"
            alt="Travel Monk"
            width={150}
            height={40}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <div className="flex items-center gap-8 text-sm text-gray-700">

          <button className="flex items-center gap-2 hover:text-black transition">
            <Tag className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Offers</span>
          </button>

          <button className="flex items-center gap-2 hover:text-black transition">
            <Headset className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Customer Service</span>
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-800">
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-1 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}