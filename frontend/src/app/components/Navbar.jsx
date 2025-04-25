"use client";
import Link from "next/link";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-10 flex items-center justify-between text-black">
      <div className="text-2xl font-bold">Travel</div>
      <nav>
        <ul className="flex gap-6 list-none">
          <li>
            <Link
              href="/"
              className="font-normal hover:border-b-2 border-[#ff6b6b] pb-1"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about_us"
              className="font-normal hover:border-b-2 border-[#ff6b6b] pb-1"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="font-normal hover:border-b-2 border-[#ff6b6b] pb-1"
            >
              Services
            </Link>
          </li>
        </ul>
      </nav>
      <button className="bg-[#ff6b6b] text-white px-4 py-2 rounded-full hover:opacity-90 transition">
        Get in Touch
      </button>
    </header>
  );
}

export default Navbar;
