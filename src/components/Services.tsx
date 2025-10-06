import React from "react";

const Services = () => {
  return (
    <div className="px-4 py-12 md:px-12 lg:px-24 bg-gray-50">
      {/* ====== Latest Service ====== */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Latest Service
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-md overflow-hidden">
          {/* YouTube Preview */}
          <div className="w-full md:w-1/2">
            <iframe
              className="w-full h-64 md:h-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Latest Service"
              allowFullScreen
            ></iframe>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Sunday Service: Walking in Faith
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Join us as we dive into the powerful message of faith and
              perseverance. This week’s service explores how trusting God through challenges
              brings growth and peace.
            </p>
          </div>
        </div>
      </section>

      {/* ====== Upcoming Event ====== */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Upcoming Event
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="w-full md:w-1/2">
            <img
              src="/images/event.jpg"
              alt="Upcoming Event"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Youth Worship Night
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A powerful night of worship, prayer, and fellowship. Come experience God’s presence with friends and family. Don’t miss it!
            </p>
            <div className="mt-4">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Prayer Request Section ====== */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Send Your Prayer Requests
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          We believe in the power of prayer. Share your prayer needs with us, and our dedicated team will stand with you in faith and lift your concerns before God.
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="w-full md:w-1/2">
            <img
              src="/images/prayer.jpg"
              alt="Prayer Request"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Submit a Prayer Request
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Let us join hands in prayer for your needs, healing, and breakthroughs. Your prayer requests are confidential and deeply valued.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Your Prayer Request"
                className="border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
