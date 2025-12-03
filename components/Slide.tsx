import React, { useEffect, useRef, useState } from 'react';

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Slide: React.FC<SlideProps> = ({ children, className = "", id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when scrolling away (optional)
        }
      },
      { threshold: 0.3 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section 
      id={id}
      ref={ref} 
      className={`h-screen w-full snap-start flex flex-col items-center justify-center p-8 relative overflow-hidden ${className}`}
    >
      <div className={`transition-all duration-1000 w-full max-w-6xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {children}
      </div>
    </section>
  );
};

export default Slide;