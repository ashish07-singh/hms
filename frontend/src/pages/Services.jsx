import React, { useState } from "react";

const departments = [
  {
    title: "Front Office Management",
    shortDescription: "Comprehensive front office operations including appointment scheduling and patient registration.",
    fullDescription: "Streamline your front office operations with our comprehensive modules covering appointment scheduling, patient registration, front desk management, outpatient services, insurance desk operations, and patient feedback systems.",
    image: "/images/Front-Office-Management.png",
    features: ["Appointment Scheduling", "Patient Registration", "Front Desk Management", "Insurance Desk", "Patient Feedback"],
    additionalInfo: "Our front office modules ensure smooth patient flow and efficient administrative operations."
  },
  {
    title: "Clinical Management",
    shortDescription: "Complete clinical operations from casualty to specialized care units.",
    fullDescription: "Manage all clinical operations efficiently with modules covering casualty management, medical records department (MRD), care desk operations, doctors desk for outpatient and inpatient care, dialysis services, and theatre management.",
    image: "/images/Clinical-operations.png",
    features: ["Casualty Management", "Medical Records", "Care Desk", "Doctors Desk", "Dialysis", "Theatre Management"],
    additionalInfo: "Our clinical modules provide comprehensive tools for healthcare professionals to deliver quality care."
  },
  {
    title: "In-Patient Management",
    shortDescription: "Complete inpatient care management and nursing station operations.",
    fullDescription: "Comprehensive inpatient care management including patient admission, nursing station operations, doctors desk for inpatient care, and complete patient monitoring throughout their stay.",
    image: "/images/In-Patient-Management.png",
    features: ["Patient Admission", "Nursing Station", "Doctors Desk IP", "Patient Monitoring", "Care Coordination"],
    additionalInfo: "Our inpatient modules ensure seamless care coordination and patient safety throughout hospitalization."
  },
  {
    title: "Diagnosis Management",
    shortDescription: "Laboratory, radiology, and diagnostic services management.",
    fullDescription: "Complete diagnostic services management including blood bank operations, laboratory results management, radiology reports, and comprehensive diagnostic workflow management.",
    image: "/images/Diagnosis-Management.png",
    features: ["Blood Bank", "Lab Results", "Radiology Reports", "Diagnostic Workflow", "Result Management"],
    additionalInfo: "Our diagnostic modules ensure accurate and timely delivery of test results and reports."
  },
  {
    title: "General Management",
    shortDescription: "Billing, pharmacy, collection, and store management operations.",
    fullDescription: "Comprehensive general management covering laboratory and general billing, pharmacy billing, collection management, store operations, and indent management for efficient resource utilization.",
    image: "/images/GeneralManagement.png",
    features: ["Lab & General Billing", "Pharmacy Billing", "Collection Management", "Store Management", "Indent Management"],
    additionalInfo: "Our general management modules optimize financial operations and resource management."
  },
  {
    title: "Administration",
    shortDescription: "Administrative operations and comprehensive reporting systems.",
    fullDescription: "Complete administrative control with admin modules, MIS reports, finance and FA interface, and comprehensive administrative tools for hospital management and decision-making.",
    image: "/images/Administration.png",
    features: ["Admin Operations", "MIS Reports", "Finance Interface", "Administrative Control", "Decision Support"],
    additionalInfo: "Our administrative modules provide powerful tools for hospital management and strategic decision-making."
  },
  {
    title: "In-House Management",
    shortDescription: "Housekeeping, laundry, and facility management services.",
    fullDescription: "Complete in-house management including housekeeping operations, laundry services, and facility management to ensure clean and well-maintained hospital environment.",
    image: "/images/In-HouseManagement.png",
    features: ["Housekeeping", "Laundry Services", "Facility Management", "Maintenance", "Quality Control"],
    additionalInfo: "Our in-house management modules ensure high standards of cleanliness and facility maintenance."
  },
  {
    title: "Emergency Management",
    shortDescription: "Comprehensive emergency and casualty management systems.",
    fullDescription: "Complete emergency management including casualty operations, emergency response coordination, critical care management, and emergency patient tracking for optimal emergency care delivery.",
    image: "/images/EmergencyManagement.png",
    features: ["Casualty Management", "Emergency Response", "Critical Care", "Patient Tracking", "Emergency Coordination"],
    additionalInfo: "Our emergency modules ensure rapid response and efficient emergency care delivery."
  },
  {
    title: "Patient Portal",
    shortDescription: "Comprehensive patient self-service portal for enhanced patient experience.",
    fullDescription: "Transform your hospital website into a comprehensive patient platform with online appointment booking, medical record access, test results viewing, and family member management under a common user ID.",
    image: "/images/PatientPortal.png",
    features: ["Online Appointments", "Medical Records", "Test Results", "Family Management", "Digital Services"],
    additionalInfo: "Our patient portal enhances patient experience and reduces administrative workload."
  },
  {
    title: "Mobile App",
    shortDescription: "Patient care appointment booking mobile application.",
    fullDescription: "Seamless mobile experience for patients with easy appointment booking, video consultations, secure payments, lab results access, and family member management through a branded mobile application.",
    image: "/images/MobileApp.png",
    features: ["Appointment Booking", "Video Consultations", "Secure Payments", "Lab Results", "Family Management"],
    additionalInfo: "Our mobile app can be customized for hospital branding and launched on Google Play Store and Apple Store."
  },
  {
    title: "WhatsApp Integration",
    shortDescription: "Advanced WhatsApp integration for enhanced communication.",
    fullDescription: "Comprehensive WhatsApp integration for appointment scheduling, lab result access, invoice sharing, and automated messaging including welcome messages, confirmations, and reminders.",
    image: "/images/WhatsAppIntegration.png",
    features: ["Appointment Scheduling", "Lab Results", "Invoice Sharing", "Automated Messages", "Secure Communication"],
    additionalInfo: "Our WhatsApp integration provides convenient, secure, and cost-effective communication channels."
  },
  {
    title: "Teleconsultation",
    shortDescription: "Vconsult teleconsultation solution for remote healthcare delivery.",
    fullDescription: "Advanced teleconsultation solution with one-to-one video interaction, low bandwidth HD video, seamless EMR integration, payment gateway integration, and automated e-prescription facility.",
    image: "/images/Teleconsultation.png",
    features: ["Video Consultations", "HD Video", "EMR Integration", "Payment Gateway", "E-Prescriptions"],
    additionalInfo: "Our teleconsultation solution enables doctors to consult patients from anywhere, anytime."
  }
];

const Services = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const handleLearnMore = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            TAJPE Comprehensive Modules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            42+ modules for end-to-end hospital efficiency. Choose the right modules for your healthcare facility to achieve functional stability and operational excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 relative">
          {departments.map((department, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
                             {/* Image Section */}
               <div className="relative h-96 overflow-hidden bg-gray-100">
                 <img 
                   src={department.image} 
                   alt={department.title}
                   className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                 <div className="absolute bottom-4 left-4 text-2xl">{department.icon}</div>
               </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {department.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {department.shortDescription}
                </p>
              </div>
              
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleLearnMore(idx)}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-all duration-300 font-semibold"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}

          {/* Overlay for expanded card */}
          {expandedIdx !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30 transition-all duration-300">

              <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                                     {/* Image Header */}
                   <div className="relative h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
                     <img 
                       src={departments[expandedIdx].image} 
                       alt={departments[expandedIdx].title}
                       className="w-full h-full object-cover object-top"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 flex items-center">
                       <div className="text-2xl mr-4">{departments[expandedIdx].icon}</div>
                       <h3 className="text-2xl font-bold text-white">
                         {departments[expandedIdx].title}
                       </h3>
                     </div>
                    <button
                      onClick={() => setExpandedIdx(null)}
                      className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold bg-black/30 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {departments[expandedIdx].fullDescription}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-teal-700 text-lg">Key Services:</h4>
                    {departments[expandedIdx].features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border-l-4 border-teal-500">
                    <h4 className="font-semibold text-teal-800 mb-3 text-lg">Department Highlights:</h4>
                    <p className="text-gray-700 leading-relaxed text-lg">{departments[expandedIdx].additionalInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Services Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Optional Modules for Enhanced Operations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Diagnostic Services</h4>
              <p className="text-sm text-gray-600">Advanced imaging and laboratory testing</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">24/7 Emergency</h4>
              <p className="text-sm text-gray-600">Round-the-clock emergency medical care</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Patient Care</h4>
              <p className="text-sm text-gray-600">Comprehensive patient care and support</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Preventive Care</h4>
              <p className="text-sm text-gray-600">Health screenings and preventive medicine</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
