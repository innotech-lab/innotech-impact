"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "../../i18n";
import "./circular-testimonials.css";

const MotionDiv = motion.div;

function calculateGap(width) {
  const minWidth = 640;
  const maxWidth = 1100;
  const minGap = 34;
  const maxGap = 72;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) {
  const t = useT();
  const items = useMemo(() => testimonials.filter(Boolean), [testimonials]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(900);
  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const colorName = colors.name ?? "var(--paper)";
  const colorDesignation = colors.designation ?? "var(--lime)";
  const colorTestimony = colors.testimony ?? "#b9c4bf";
  const colorArrowBg = colors.arrowBackground ?? "var(--lime)";
  const colorArrowFg = colors.arrowForeground ?? "var(--night)";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "var(--paper)";
  const fontSizeName = fontSizes.name ?? "clamp(1.3rem, 2.2vw, 2rem)";
  const fontSizeDesignation = fontSizes.designation ?? "0.72rem";
  const fontSizeQuote = fontSizes.quote ?? "1rem";

  const total = items.length;
  const activeTestimonial = items[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [total]);

  useEffect(() => {
    if (!imageContainerRef.current || typeof ResizeObserver === "undefined") {
      return undefined;
    }
    const observer = new ResizeObserver(() => {
      setContainerWidth(imageContainerRef.current?.offsetWidth ?? 900);
    });
    observer.observe(imageContainerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || total < 2) return undefined;
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(autoplayIntervalRef.current);
  }, [autoplay, total]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  if (!total) return null;

  const getImageStyle = (index) => {
    const gap = calculateGap(containerWidth);
    const offset = (index - activeIndex + total) % total;
    const isActive = index === activeIndex;
    const isLeft = offset === total - 1;
    const isRight = offset === 1;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
      };
    }
    if (isLeft || isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "none",
        transform:
          "translateX(" +
          (isLeft ? "-" + gap : gap) +
          "px) translateY(-" +
          gap * 0.65 +
          "px) scale(0.82) rotateY(" +
          (isLeft ? 12 : -12) +
          "deg)",
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none" };
  };

  return (
    <div className="circular-testimonials">
      <div className="circular-testimonials__grid">
        <div className="circular-testimonials__images" ref={imageContainerRef}>
          {items.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="circular-testimonials__image"
              style={getImageStyle(index)}
            />
          ))}
        </div>
        <div className="circular-testimonials__content">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <p
                className="circular-testimonials__designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <p
                className="circular-testimonials__quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote}
              </p>
            </MotionDiv>
          </AnimatePresence>
          <div className="circular-testimonials__arrows">
            <button
              type="button"
              aria-label={t("Article récent précédent")}
              onClick={handlePrev}
              style={{ backgroundColor: colorArrowBg, color: colorArrowFg }}
            >
              <FaArrowLeft size={15} />
            </button>
            <button
              type="button"
              aria-label={t("Article récent suivant")}
              onClick={handleNext}
              style={{ backgroundColor: colorArrowBg, color: colorArrowFg }}
            >
              <FaArrowRight size={15} />
            </button>
          </div>
          <span className="circular-testimonials__hint" style={{ color: colorArrowHoverBg }}>
            {t("Utilisez les flèches ou les touches ← →")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
