import React, { useState, useEffect } from "react";
import "./home.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Consulting People Grow Up Their Business Idea",
    subtitle: "Lorem ipsum dolor sit amet, ligula magna at etiam aliquet venenatis. Vitae sit felis donec, suscipit tortor et sapien donec ac nec.",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    title: "Build The Future With Innovation",
    subtitle: "Nam vel eu amet, vitae sit felis donec suscipit tortor et sapien donec ac nec lorem ipsum dolor.",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "Transform Your Vision Into Reality",
    subtitle: "Ligula magna at etiam aliquet venenatis vitae sit felis donec suscipit tortor et sapien donec.",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" style={{ backgroundImage: `url(${slides[current].image})` }}>
      <div className="overlay"></div>

      <div className="hero-content">
        <h1>{slides[current].title}</h1>
        <p>{slides[current].subtitle}</p>

        <div className="buttons">
          <button className="btn btn-primary">Learn More →</button>
          <button className="btn btn-secondary">Contact Us →</button>
        </div>

        <div className="scroll-indicator">
          {slides.map((_, i) => (
            <span key={i} className={i === current ? "active" : ""}></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
