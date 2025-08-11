import React from "react";
import { Link } from 'react-router-dom';
import Services from "./Services";

function Home() {
  return (
    <div id="home">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-3000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Healthcare with 
            <span className="block text-cyan-200">Strategic Management</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-90">
            <span className="font-semibold">TAJPE Consulting</span> delivers cutting-edge hospital management solutions 
            that optimize operations, enhance patient care, and maximize efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              to="/contact" 
              className="group border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center justify-center"
            >
              <span>Get in Touch</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>42+ Comprehensive Modules</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>550+ Clients Worldwide</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose TAJPE Consulting?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our data-driven approach transforms hospital operations and patient care delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">42+</div>
              <div className="text-gray-600 font-medium">Comprehensive Modules</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">550+</div>
              <div className="text-gray-600 font-medium">Clients Worldwide</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-gray-600 font-medium">Hospital Versions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Sets TAJPE Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the comprehensive features that make TAJPE the preferred choice for hospital management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Modules</h3>
              <p className="text-gray-600 leading-relaxed">
                42+ modules covering every aspect of hospital operations from appointment scheduling to discharge management.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Scalable Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from 4 versions: Clinic, Pro (up to 50 beds), Prime (up to 100 beds), and Premium (200+ beds).
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Proven Track Record</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted by 550+ clients worldwide with 30+ years of experience in healthcare technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Implementation Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Proven Implementation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure seamless integration and maximum ROI.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-teal-200 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 md:space-y-0">
              {/* Item 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Needs Assessment</h3>
                  <p className="text-gray-600">
                    Comprehensive evaluation of your current systems, workflows, and pain points.
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center relative z-10">
                  <span className="font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  {/* Empty on this side */}
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  {/* Empty on this side */}
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center relative z-10">
                  <span className="font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Solution Design</h3>
                  <p className="text-gray-600">
                    Customized system architecture tailored to your hospital's specific requirements.
                  </p>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Implementation</h3>
                  <p className="text-gray-600">
                    Phased rollout with minimal disruption to your daily operations.
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center relative z-10">
                  <span className="font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  {/* Empty on this side */}
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  {/* Empty on this side */}
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center relative z-10">
                  <span className="font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Training & Support</h3>
                  <p className="text-gray-600">
                    Comprehensive staff training and ongoing support for continuous improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Transformative Benefits for Your Hospital
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How our consulting services drive measurable improvements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-teal-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Operational Efficiency</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Reduce administrative workload by up to 40%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Streamline patient flow and bed management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Automate routine processes</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-teal-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Performance</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Reduce billing errors by up to 90%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Improve revenue cycle management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Optimize resource utilization</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-teal-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Patient Care Quality</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Reduce patient wait times by 30-50%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Improve clinical decision support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Enhance patient safety and outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we've helped hospitals like yours achieve transformational results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Regional Medical Center</h3>
                <p className="text-gray-600 mb-4">
                  A 200-bed hospital reduced patient discharge times by 35% and improved bed turnover rate by 28% within 6 months of implementation.
                </p>
                <div className="flex items-center">
                  <div className="text-teal-600 font-bold">Key Results:</div>
                  <div className="ml-4 text-sm text-gray-600">
                    <span className="block">• 35% faster discharges</span>
                    <span className="block">• 28% better bed utilization</span>
                    <span className="block">• $2.4M annual savings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Urban Specialty Clinic</h3>
                <p className="text-gray-600 mb-4">
                  A specialty clinic reduced no-show rates by 42% and increased patient satisfaction scores from 78% to 94% with our appointment management system.
                </p>
                <div className="flex items-center">
                  <div className="text-teal-600 font-bold">Key Results:</div>
                  <div className="ml-4 text-sm text-gray-600">
                    <span className="block">• 42% fewer no-shows</span>
                    <span className="block">• 94% patient satisfaction</span>
                    <span className="block">• 20% revenue increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hospital Operations?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
            Schedule a free consultation with our experts to discuss your specific needs and challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-teal-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              <span>Get Started Today</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              <span>Learn More</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Services />
    </div>
  );
}

export default Home;