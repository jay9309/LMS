import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/student/Footer';
import Hero from '../../components/student/Hero';
import Companies from '../../components/student/Companies';
import CoursesSection from '../../components/student/CoursesSection';
import TestimonialsSection from '../../components/student/TestimonialsSection';
import CallToAction from '../../components/student/CallToAction';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we arrived here with a scroll target (from Navbar/Footer), scroll to it
    const targetId = location.state && location.state.scrollTo;
    if (targetId) {
      // small delay to let the page render
      const t = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // clear the navigation state so backward/forward doesn't trigger again
        navigate(location.pathname, { replace: true, state: null });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [location, navigate]);

  // header height used for scroll-margin (match navbar height). adjust if needed
  const navOffset = 76;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center space-y-0 text-center relative z-0">
        <section id="home" style={{ scrollMarginTop: `${navOffset}px` }} className="w-full">
          <Hero />
        </section>

        <section id="companies" style={{ scrollMarginTop: `${navOffset}px` }} className="w-full">
          <Companies />
        </section>

        <section id="courses" style={{ scrollMarginTop: `${navOffset}px` }} className="w-full">
          <CoursesSection />
        </section>

        <section id="testimonials" style={{ scrollMarginTop: `${navOffset}px` }} className="w-full">
          <TestimonialsSection />
        </section>

        <section id="cta" style={{ scrollMarginTop: `${navOffset}px` }} className="w-full">
          <CallToAction />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
