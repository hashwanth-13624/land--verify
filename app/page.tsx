'use client';

import React, { useState } from 'react';

// --- (No changes to this interface) ---
interface Land {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  verified: boolean;
}

// --- UPDATED: Added new fields for verification ---
interface ListPropertyFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  panNumber: string;         // NEW
  aadhaarNumber: string;     // NEW
  fullPropertyAddress: string; // RENAMED for clarity
  village: string;           // NEW
  city: string;              // NEW
  taluk: string;             // NEW
  district: string;          // NEW
  surveyNumber: string;      // NEW
  sroLocation: string;       // NEW
  propertyType: string;
  propertySize: string;
  expectedPrice: string;
  message: string;
}

// --- (No changes to this data) ---
const initialLands: Land[] = [
    { id: 1, title: "2 Acre Agricultural Land", location: "Chennai, Tamil Nadu", price: "₹75,00,000", image: "/land1.jpg", verified: true, },
    { id: 2, title: "5 Acre Farmland with Water Access", location: "Bangalore, Karnataka", price: "₹1,20,00,000", image: "/land2.jpg", verified: true, },
    { id: 3, title: "3 Acre Plot Near Highway", location: "Pune, Maharashtra", price: "₹90,00,000", image: "/land3.jpg", verified: false, },
    { id: 4, title: "1.5 Acre Residential Plot", location: "Hyderabad, Telangana", price: "₹65,00,000", image: "/land4.jpg", verified: true, },
];

// --- UPDATED: Added initial empty values for new fields ---
const initialFormData: ListPropertyFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  panNumber: '',
  aadhaarNumber: '',
  fullPropertyAddress: '',
  village: '',
  city: '',
  taluk: '',
  district: '',
  surveyNumber: '',
  sroLocation: '',
  propertyType: '',
  propertySize: '',
  expectedPrice: '',
  message: '',
};


export default function HomePage() {
  const [lands, setLands] = useState<Land[]>(initialLands);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ListPropertyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleListProperty = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleViewDetails = (landId: number) => {
    alert(`Viewing details for property ID: ${landId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- UPDATED: Added new required fields for validation ---
    const requiredFields: (keyof ListPropertyFormData)[] = [
        'fullName', 'email', 'phoneNumber', 'panNumber', 'aadhaarNumber', 
        'fullPropertyAddress', 'village', 'city', 'taluk', 'district', 'surveyNumber', 'sroLocation',
        'propertyType', 'propertySize', 'expectedPrice'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/seller_information", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData(initialFormData);
        alert("Thank you! We have received your application. Our team will contact you soon.");
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
    setIsSubmitting(false);
  };

  // --- (No changes to the main page structure, only the Modal form below) ---
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        {/* ... (content is unchanged) ... */}
         <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">LandVerify</span> Marketplace
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              Browse verified, safe land listings. Avoid fraud and buy with confidence.
            </p>
          </div>
          
          {/* Seller CTA */}
          <div className="text-center">
            <button
              onClick={handleListProperty}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* Listings Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        {/* ... (content is unchanged) ... */}
         <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Verified Land Listings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lands.map((land) => (
              <div
                key={land.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={land.image}
                    alt={land.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmJmZiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlmYTZiNyIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4Ij5MYW5kIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                  />
                  {/* Verification Badge */}
                  <div className="absolute top-3 right-3">
                    {land.verified ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        VERIFIED
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PENDING
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {land.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <span className="mr-2">📍</span>
                    <span>{land.location}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {land.price}
                    </span>
                  </div>
                  
                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(land.id)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section for Sellers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        {/* ... (content is unchanged) ... */}
         <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Want to Sell Your Land?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get it verified and listed today to reach serious buyers.
          </p>
          <button
            onClick={handleListProperty}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            List Your Property
          </button>
        </div>
      </section>

      {/* List Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Application to List Your Property</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* --- SECTION 1: SELLER'S DETAILS --- */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Seller's Details</h3>
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="As per government ID"/>
                    </div>
                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number"/>
                        </div>
                    </div>
                    {/* // NEW SECTION START: PAN and Aadhaar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                PAN Card Number <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="panNumber" name="panNumber" required value={formData.panNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter 10-digit PAN"/>
                        </div>
                        <div>
                            <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Aadhaar Card Number <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="aadhaarNumber" name="aadhaarNumber" required value={formData.aadhaarNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter 12-digit Aadhaar"/>
                        </div>
                    </div>
                    {/* // NEW SECTION END */}
                </div>

                {/* --- SECTION 2: PROPERTY IDENTIFICATION DETAILS --- */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Property Identification Details</h3>
                    {/* // NEW SECTION START */}
                    <div>
                        <label htmlFor="fullPropertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Property Address <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="fullPropertyAddress" name="fullPropertyAddress" required value={formData.fullPropertyAddress} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Door No, Street, Landmark"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                                Village <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="village" name="village" required value={formData.village} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Village name"/>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                City / Town <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="City / Town name"/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="taluk" className="block text-sm font-medium text-gray-700 mb-2">
                                Taluk / Mandal (Sub-District) <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="taluk" name="taluk" required value={formData.taluk} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Taluk or Mandal"/>
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                                District <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="district" name="district" required value={formData.district} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="District name"/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="surveyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Survey Number(s) <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="surveyNumber" name="surveyNumber" required value={formData.surveyNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 123/4, 123/5"/>
                        </div>
                        <div>
                            <label htmlFor="sroLocation" className="block text-sm font-medium text-gray-700 mb-2">
                                Sub-Registrar Office (SRO) <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="sroLocation" name="sroLocation" required value={formData.sroLocation} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Location of SRO"/>
                        </div>
                    </div>
                     {/* // NEW SECTION END */}
                </div>

                {/* --- SECTION 3: BASIC PROPERTY DETAILS --- */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Basic Property Details</h3>
                    {/* Property Type and Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type <span className="text-red-500">*</span>
                            </label>
                            <select id="propertyType" name="propertyType" required value={formData.propertyType} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Select property type</option>
                                <option value="Agricultural">Agricultural Land</option>
                                <option value="Residential">Residential Plot</option>
                                <option value="Commercial">Commercial Plot</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
                                Property Size <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="propertySize" name="propertySize" required value={formData.propertySize} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 2.5 Acres"/>
                        </div>
                    </div>
                    {/* Expected Price */}
                    <div>
                        <label htmlFor="expectedPrice" className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Price <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="expectedPrice" name="expectedPrice" required value={formData.expectedPrice} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="₹ in Lakhs or Crores"/>
                    </div>
                    {/* Message/Description */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message/Description (Optional)
                        </label>
                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Additional details..."/>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onClick={handleCloseModal} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg">
                        {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        {/* ... (content is unchanged) ... */}
         <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 LandVerify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}