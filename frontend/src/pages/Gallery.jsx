import React, { useState } from "react";

const Gallery = () => {
  const [category, setCategory] = useState("all");


  const galleryItems = [
    {
      id: 1,
      category: "modules",
      image: "/images/hospital_management.webp",
      title: "Front Office Management",
      description: "Comprehensive appointment scheduling and patient registration system",
    },
    {
      id: 2,
      category: "modules",
      image: "/images/clinic-mng.png",
      title: "Clinical Management",
      description: "Complete clinical operations from casualty to specialized care units",
    },
    {
      id: 3,
      category: "team",
      image: "/images/support.jpg",
      title: "Expert Support Team",
      description: "Our dedicated technical support and implementation specialists",
    },
    {
      id: 4,
      category: "modules",
      image: "/images/gallery-patient-room.jpg",
      title: "In-Patient Management",
      description: "Complete inpatient care management and nursing station operations",
    },
    {
      id: 5,
      category: "modules",
      image: "/images/recovery.jpg",
      title: "Diagnosis Management",
      description: "Laboratory, radiology, and diagnostic services management",
    },
    {
      id: 6,
      category: "features",
      image: "/images/gallery-patient-care.jpg",
      title: "Patient Portal",
      description: "Comprehensive patient self-service portal for enhanced experience",
    },
    {
      id: 7,
      category: "modules",
      image: "/images/gallery-emergency.jpg",
      title: "Emergency Management",
      description: "Comprehensive emergency and casualty management systems",
    },
    {
      id: 8,
      category: "modules",
      image: "/images/laboratory.jpg",
      title: "General Management",
      description: "Billing, pharmacy, collection, and store management operations",
    },
    {
      id: 9,
      category: "team",
      image: "/images/specialist.jpg",
      title: "Technical Specialists",
      description: "Expert consultations with our implementation specialists",
    },
    {
      id: 10,
      category: "modules",
      image: "/images/pharmasy.jpg",
      title: "Administration",
      description: "Administrative operations and comprehensive reporting systems",
    },
    {
      id: 11,
      category: "features",
      image: "/images/mobile-app.webp",
      title: "Mobile App",
      description: "Patient care appointment booking mobile application",
    },
    {
      id: 12,
      category: "features",
      image: "/images/recovery.jpg",
      title: "WhatsApp Integration",
      description: "Advanced WhatsApp integration for enhanced communication",
    },
  ];

  const filteredItems =
    category === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === category);

  return (
    <div className="py-14 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">TAJPE Modules & Features</h2>
      <p className="text-xl text-gray-600 max-w-3xl mb-7 mx-auto">
            Explore our comprehensive Hospital Management System modules, features, and meet our dedicated 
            technical support team at TAJPE.
          </p>

      <div className="flex justify-center mb-8 flex-wrap gap-2">
        {["all", "modules", "features", "team"].map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full border font-medium transition ${
              category === cat
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-teal-100 hover:text-teal-600"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Gallery;
