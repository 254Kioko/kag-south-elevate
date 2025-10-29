"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

export default function CCTVPage() {
  useEffect(() => {
    document.title = "CCTV Live View | Admin";
  }, []);

  // Example CCTV stream URLs (replace with your real ones)
  const cameras = [
    { id: 1, name: "Main Entrance", url: "https://your-cctv-url-1.com" },
    { id: 2, name: "Sanctuary", url: "https://your-cctv-url-2.com" },
    { id: 3, name: "Parking Area", url: "https://your-cctv-url-3.com" },
    { id: 4, name: "Office Block", url: "https://your-cctv-url-4.com" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navigation />

      <div className="pt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">CCTV Live Feed</h1>
<Button variant="secondary" onClick={() => history.back()}>            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cameras.map((cam) => (
            <div
              key={cam.id}
              className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg"
            >
              <div className="p-3 border-b border-neutral-800">
                <h2 className="text-lg font-medium">{cam.name}</h2>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={cam.url}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          CCTV monitoring — live feeds secured and mobile-friendly
        </p>
      </div>
    </main>
  );
}
