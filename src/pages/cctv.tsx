"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const CCTVPage = () => {
  useEffect(() => {
    document.title = "CCTV Live View | Admin";
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navigation />

      <div className="pt-16 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">CCTV Live View</h1>
        <p className="text-gray-400 mb-6 text-center">
          Real-time camera feed (mobile friendly)
        </p>

        {/* CCTV feed */}
        <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://your-cctv-stream-url.com"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>

        <div className="mt-8">
          <Button variant="secondary" onClick={() => history.back()}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CCTVPage;
