"use client";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/welcome.png')", // Put image in /public folder
      }}
    >
      <div className="bg-black/50 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Welcome to the Tourism Company Dashboard
        </h1>
        <p className="text-lg mb-6">
          Manage your tours, update packages, and grow your travel business—all
          in one place!
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
