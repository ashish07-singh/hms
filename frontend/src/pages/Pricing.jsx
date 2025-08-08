import React from 'react';

const Pricing = () => {
  const modules = [
    { name: "Centralized Appointment System", basic: true, pro: true, prime: true, premium: true },
    { name: "Outpatient Management", basic: true, pro: true, prime: true, premium: true },
    { name: "Care Desk", basic: true, pro: true, prime: true, premium: true },
    { name: "Doctors Desk OP", basic: true, pro: true, prime: true, premium: true },
    { name: "Admin", basic: true, pro: true, prime: true, premium: true },
    { name: "SMS Management", basic: true, pro: true, prime: true, premium: true },
    { name: "Reports", basic: true, pro: true, prime: true, premium: true },
    { name: "Lab & General Billing", basic: false, pro: true, prime: true, premium: true },
    { name: "Lab Results", basic: false, pro: true, prime: true, premium: true },
    { name: "Pharmacy Management", basic: false, pro: true, prime: true, premium: true },
    { name: "Medical Record Department", basic: false, pro: true, prime: true, premium: true },
    { name: "Nursing Station", basic: false, pro: true, prime: true, premium: true },
    { name: "Collection", basic: false, pro: true, prime: true, premium: true },
    { name: "Radiology Reports & Appointment", basic: false, pro: true, prime: true, premium: true },
    { name: "Indent", basic: false, pro: true, prime: true, premium: true },
    { name: "Store Management", basic: false, pro: true, prime: true, premium: true },
    { name: "Emergency Management (Casualty)", basic: false, pro: true, prime: true, premium: true },
    { name: "Inpatient Management", basic: false, pro: false, prime: true, premium: true },
    { name: "Doctor's Desk IP", basic: false, pro: false, prime: true, premium: true },
    { name: "Theatre Management", basic: false, pro: false, prime: true, premium: true },
    { name: "Insurance", basic: false, pro: false, prime: true, premium: true },
    { name: "Discharge Summary", basic: false, pro: false, prime: true, premium: true },
    { name: "House Keeping", basic: false, pro: false, prime: true, premium: true },
    { name: "MIS Reports", basic: false, pro: false, prime: true, premium: true },
    { name: "Finance & FA Interface", basic: false, pro: false, prime: false, premium: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TAJPE Hospital Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock new heights of excellence with TAJPE's Comprehensive Modules aiding to operations of hospitals of any size.
          </p>
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            CHOOSE THE RIGHT VERSION FOR YOUR HOSPITAL
          </h2>
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Modules</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">TAJPE Clinic Basic</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">TAJPE Pro<br/><span className="text-xs">(up to 50 bedded hospitals)</span></th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">TAJPE Prime<br/><span className="text-xs">(up to 100 bedded hospitals)</span></th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">TAJPE Premium<br/><span className="text-xs">(for 200 beds and above)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {modules.map((module, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {module.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {module.basic ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {module.pro ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {module.prime ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {module.premium ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnote */}


        

         {/* Additional Information */}
         <div className="mt-12 grid md:grid-cols-2 gap-8">
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="text-xl font-semibold text-gray-900 mb-4">
               Why Choose TAJPE?
             </h3>
             <ul className="space-y-2 text-gray-600">
               <li>• 42+ comprehensive modules for end-to-end efficiency</li>
               <li>• Scalable solutions for hospitals of any size</li>
               <li>• 30+ years of industry experience</li>
               <li>• Trusted by 550+ clients worldwide</li>
               <li>• 24/7 technical support</li>
               <li>• Complete implementation and training</li>
             </ul>
           </div>

           <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="text-xl font-semibold text-gray-900 mb-4">
               Get Started Today
             </h3>
             <p className="text-gray-600 mb-4">
               Contact our sales team for detailed pricing information and to schedule a personalized demonstration of TAJPE Hospital Management System.
             </p>
             <div className="space-y-2 text-sm">
               <p><strong>Email:</strong> sales@tajpe.com</p>
               <p><strong>India:</strong> +91 9048767111</p>
               <p><strong>UAE:</strong> +971 56 690 7222</p>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
