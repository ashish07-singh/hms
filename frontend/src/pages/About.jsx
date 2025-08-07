import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-teal-600">TAJPE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Pioneering healthcare technology for over 30 years, TAJPE has revolutionized hospital management 
            through our comprehensive Hospital Management System. We've empowered 550+ healthcare facilities worldwide with 
            comprehensive, scalable solutions that drive operational excellence and superior patient care.
          </p>
        </div>

        {/* Company Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 1994, TAJPE began with a vision to transform healthcare 
              operations through innovative technology. What started as a small team of healthcare technology 
              enthusiasts has grown into a global leader in Hospital Management Systems.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Over three decades, we've evolved from basic hospital software to a comprehensive 
              Hospital Management System that serves healthcare facilities of all sizes, from small clinics 
              to large multi-specialty hospitals with 200+ beds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our journey has been marked by continuous innovation, deep understanding of healthcare workflows, 
              and unwavering commitment to customer success. Today, our Hospital Management System stands as a testament to our 
              expertise and dedication to healthcare excellence.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Key Milestones</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1994</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Company Founded</h4>
                  <p className="text-gray-600 text-sm">Started with healthcare technology vision</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2005</div>
                <div>
                  <h4 className="font-semibold text-gray-800">First HMS Launch</h4>
                  <p className="text-gray-600 text-sm">Introduced comprehensive hospital management solution</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2015</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Advanced HMS Launch</h4>
                  <p className="text-gray-600 text-sm">Revolutionary HMS with 42+ modules</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2024</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Global Expansion</h4>
                  <p className="text-gray-600 text-sm">550+ clients across India, UAE, and beyond</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-teal-50 p-8 rounded-lg border-l-4 border-teal-600">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To unlock new heights of excellence in hospital operations through comprehensive, scalable, 
              and innovative healthcare technology solutions. We empower hospitals of any size to achieve 
              operational efficiency, reduce costs, and deliver superior patient care through our 
              cutting-edge Hospital Management System.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-gray-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the global leader in hospital management systems, revolutionizing healthcare operations 
              through cutting-edge technology, comprehensive modules, and proven track record of success 
              across diverse healthcare facilities worldwide. We envision a future where every hospital 
              operates with maximum efficiency and patient satisfaction.
            </p>
          </div>
        </div>

        {/* TAJPE HMS Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About TAJPE HMS</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Comprehensive Solution</h3>
              <p className="text-gray-600">
                TAJPE offers 42+ modules covering every aspect of hospital operations, from patient 
                registration to discharge, ensuring complete digital transformation.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Scalable Architecture</h3>
              <p className="text-gray-600">
                Four versions designed for different hospital sizes: Clinic (Basic), Pro (50 beds), 
                Prime (100 beds), and Premium (200+ beds).
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Advanced Security</h3>
              <p className="text-gray-600">
                Enterprise-grade security with role-based access, data encryption, and compliance 
                with healthcare data protection standards.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose TAJPE?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">30+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Years Experience</h3>
              <p className="text-gray-600 text-sm">Three decades of healthcare technology expertise</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">550+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Happy Clients</h3>
              <p className="text-gray-600 text-sm">Trusted by healthcare facilities worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">42+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Modules</h3>
              <p className="text-gray-600 text-sm">Comprehensive hospital management modules</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">24/7</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock technical assistance</p>
            </div>
          </div>
        </div>

        {/* Technology Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Technology Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Integration Capabilities</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>200+ models of medical laboratory equipment interfaced</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Third-party application integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Legacy system migration and compatibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>API-first architecture for seamless connectivity</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Features</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Business Intelligence with Power BI integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>WhatsApp integration for patient communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Teleconsultation with video calling capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Mobile applications for patients and staff</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Client Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-600">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-600 font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Multi-Specialty Hospital</h4>
                  <p className="text-gray-600 text-sm">200+ beds, Mumbai</p>
                </div>
              </div>
              <p className="text-gray-700">
                "TAJPE transformed our operations completely. Patient wait times reduced by 60% 
                and administrative efficiency improved dramatically."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Cardiac Care Center</h4>
                  <p className="text-gray-600 text-sm">100 beds, Delhi</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The integration with our cardiac equipment was seamless. Real-time data flow 
                has revolutionized our diagnostic processes."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Pediatric Hospital</h4>
                  <p className="text-gray-600 text-sm">50 beds, Bangalore</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Patient portal and mobile app features have greatly improved parent satisfaction. 
                Appointment booking is now effortless."
              </p>
            </div>
          </div>
        </div>

        {/* Global Presence */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Global Presence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-teal-700 mb-4">India</h3>
              <p className="text-gray-700 mb-4">
                Our headquarters in Kochi, Kerala serves as the innovation hub where we develop 
                cutting-edge healthcare solutions. With offices across major cities, we provide 
                comprehensive support to healthcare facilities nationwide.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">📍 Kochi, Kerala</span>
                <span>📞 +91 9048767111</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-4">UAE</h3>
              <p className="text-gray-700 mb-4">
                Our Abu Dhabi office serves the Middle East region, providing localized support 
                and solutions tailored to the unique healthcare requirements of the region.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">📍 Abu Dhabi</span>
                <span>📞 +971 56 690 7222</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-teal-600 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hospital?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 550+ healthcare facilities that trust TAJPE for their digital transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Request Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
