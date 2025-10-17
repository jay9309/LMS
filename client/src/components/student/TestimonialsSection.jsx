import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {
  return (
    <div className="pb-20 px-8 md:px-0">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3 text-center">
        Hear from our learners as they share their journeys of transformation, success, and how our <br /> 
        platform has made a difference in their lives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 justify-items-center">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="w-full max-w-sm text-sm text-left border border-gray-400/30 pb-8 rounded-2xl bg-white shadow-[0_4px_15px_0] shadow-black/5 
                       overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300/40 
                       hover:border-yellow-400 group"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 bg-gray-100/40 transition-colors duration-300 group-hover:bg-yellow-50">
              <img className="h-14 w-14 rounded-full border-2 border-gray-200 group-hover:border-yellow-400 transition-all duration-300" src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            {/* Stars & Feedback */}
            <div className="p-6 pb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 transform transition-transform duration-300 group-hover:scale-110"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-5 leading-relaxed">{testimonial.feedback}</p>
            </div>

            {/* Read More */}
            <div className="px-6">
              <a
                href="#"
                className="text-blue-500 underline transition-colors duration-300 hover:text-yellow-500 font-medium"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
