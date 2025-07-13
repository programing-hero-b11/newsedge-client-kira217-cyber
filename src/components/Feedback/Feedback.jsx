import React from "react";

export const Feedback = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <h1 className="flex justify-center items-center font-bold text-4xl mb-8">Our Mission</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Step Text Section */}
        <div className="grid gap-6 md:grid-cols-2 md:col-span-2 lg:col-span-3">
          {/* Step 1 */}
          <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-indigo-50">
            <div className="flex items-center mb-1">
              <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded bg-purple-600">
                1
              </span>
              <p className="text-lg font-semibold sm:text-base">Our Mission</p>
            </div>
            <p className="text-sm text-gray-900">
              At <strong>NewsEdge</strong>, we strive to deliver fast, unbiased,
              and accurate news that matters. From politics to entertainment—we
              bring everything under one digital roof.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-teal-50">
            <div className="flex items-center mb-1">
              <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded bg-teal-500">
                2
              </span>
              <p className="text-lg font-semibold sm:text-base">
                Latest Articles
              </p>
            </div>
            <p className="text-sm text-gray-900">
              Stay updated with real-time trending articles. From breaking
              headlines to deep-dive reports—we ensure you don’t miss what’s
              shaping the world today.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-teal-50">
            <div className="flex items-center mb-1">
              <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded bg-purple-600">
                3
              </span>
              <p className="text-lg font-semibold sm:text-base">
                Verified Sources
              </p>
            </div>
            <p className="text-sm text-gray-900">
              Every article is backed by verified sources. Our editorial team
              cross-checks facts and relies on authentic data to maintain
              journalistic integrity.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded lg:p-5 lg:transition lg:duration-300 lg:hover:bg-indigo-50">
            <div className="flex items-center mb-1">
              <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs font-medium text-white rounded bg-teal-500">
                4
              </span>
              <p className="text-lg font-semibold sm:text-base">
                Meet the Team
              </p>
            </div>
            <p className="text-sm text-gray-900">
              Our newsroom is powered by a diverse team of journalists,
              analysts, and content creators who are committed to transparency,
              truth, and timely reporting.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative md:col-span-2 lg:col-span-2">
          <img
            className="inset-0 object-cover object-bottom w-full h-56 rounded shadow-lg lg:absolute lg:h-full"
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="News Team"
          />
        </div>
      </div>
    </div>
  );
};
