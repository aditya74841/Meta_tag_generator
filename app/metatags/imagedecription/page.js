// "use client";
// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const FAQ = () => {
//   const [selectImage, setSelectImage] = useState(null);
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         FAQ Structured Data Generator
//       </h1>

//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <div className="mt-5">
//                 <label
//                   htmlFor={"first_name"}
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Select Image"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddItem}
//                 >
//                   Add Item
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="w-full border">
//           <div>
//             <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               <a href="#">
//                 <img
//                   className="rounded-t-lg"
//                   src="/docs/images/blog/image-1.jpg"
//                   alt=""
//                 />
//               </a>
//               <div className="p-5">
//                 <a href="#">
//                   <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                     Noteworthy technology acquisitions 2021
//                   </h5>
//                 </a>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   Here are the biggest enterprise technology acquisitions of
//                   2021 so far, in reverse chronological order.
//                 </p>
//                 <a
//                   href="#"
//                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Read more
//                   <svg
//                     className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 10"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M1 5h12m0 0L9 1m4 4L9 9"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;

"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FAQ = () => {
  const [selectedImage, setSelectedImage] = useState(""); // Define state for selected image
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onloadend = () => {
        // When file is read
        setSelectedImage(reader.result); // Set selected image URL
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div className="px-3">
      <h1 className="text-white text-xl font-bold">
        FAQ Structured Data Generator
      </h1>

      <div className="flex mt-5">
        <div className="w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800">
            <form>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="imageInput"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file" // Change input type to file
                  id="imageInput"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleImageChange} // Handle file selection
                />
              </div>
            </form>
          </div>
        </div>

        <div className="w-full border">
          <div>
            <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {selectedImage ? ( // Check if an image is selected
                <img
                  className="rounded-t-lg"
                  src={selectedImage} // Display selected image
                  alt=""
                />
              ) : (
                // Check if an image is selected
                <img
                  className="rounded-t-lg"
                  src={"/8600_2_10.jpg"} // Display selected image
                  alt=""
                />
              )}
              <div className="p-5">
                {title ? (
                  <p className="mb-3 w-full font-normal text-gray-700 dark:text-gray-400">
                    {title}
                  </p>
                ) : (
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Enter Title...
                  </p>
                )}

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {description ? description : "Enter description..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
