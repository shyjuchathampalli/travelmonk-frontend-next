import Image from "next/image";
import Link from "next/link";
import { Tag, Headset, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Left: Logo */}
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

        {/* Right: Actions */}
        <div className="flex items-center gap-8 text-sm text-gray-700">

          {/* Offers */}
          <button className="flex items-center gap-2 hover:text-black transition">
            <Tag className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Offers</span>
          </button>

          {/* Customer Service */}
          <button className="flex items-center gap-2 hover:text-black transition">
            <Headset className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Customer Service</span>
          </button>

          {/* Login / Signup */}
          <button className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 hover:bg-blue-100 transition">
            <UserCircle className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-700">
              Log in / Sign up
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
