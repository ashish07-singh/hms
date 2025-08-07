import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    department: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND_URL}/api/contact/submit`, form);
      if (res.status === 201) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          department: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
    }
  };


  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      rating: 5,
      text: "TAJPE has transformed our hospital operations completely. The comprehensive modules cover every aspect of patient care and administration. Highly recommended!"
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "As a hospital administrator, TAJPE has streamlined our processes significantly. The patient portal and mobile app features have greatly enhanced patient satisfaction."
    },
    {
      name: "Dr. Ahmed Hassan",
      rating: 5,
      text: "The WhatsApp integration and teleconsultation features have revolutionized how we connect with patients. TAJPE's support team is exceptional."
    },
    {
      name: "Maria Rodriguez",
      rating: 5,
      text: "We've been using TAJPE for 3 years now. The scalability and comprehensive modules make it perfect for hospitals of any size. Excellent ROI!"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Contact Information */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact TAJPE</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with TAJPE for Hospital Management System demonstrations, consultations, 
            or any healthcare technology-related inquiries. Our dedicated team is here to help you transform your hospital operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            {submitted ? (
              <div className="bg-green-100 text-green-700 p-6 rounded-lg text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold">Thank you for reaching out!</p>
                <p>We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                                         <option value="">Select Module</option>
                     <option value="front-office">Front Office Management</option>
                     <option value="clinical">Clinical Management</option>
                     <option value="inpatient">In-Patient Management</option>
                     <option value="diagnosis">Diagnosis Management</option>
                     <option value="general">General Management</option>
                     <option value="administration">Administration</option>
                     <option value="patient-portal">Patient Portal</option>
                     <option value="mobile-app">Mobile App</option>
                     <option value="whatsapp">WhatsApp Integration</option>
                     <option value="teleconsultation">Teleconsultation</option>
                     <option value="demo">Request Demo</option>
                  </select>
                </div>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 font-semibold"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                                         <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                     <p className="text-gray-600">INDIA: +91 9048767111</p>
                     <p className="text-gray-600">UAE: +971 56 690 7222</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                                         <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                       <p className="text-gray-600">sales@tajpe.com</p>
                  <p className="text-gray-600">support@tajpe.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                                         <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                                       <p className="text-gray-600">
                    TAJPE<br />
                    9/826/ C, 11-12 5th Floor, Meda,<br />
                    Seaport Airport Road, Kakkanad,<br />
                    Kochi – 682 030, Ernakulam, India
                  </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                                         <h4 className="font-semibold text-gray-800 mb-1">Working Hours</h4>
                     <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                     <p className="text-gray-600">Support: support@tajpe.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
                     <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
             What Our Clients Say
           </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
