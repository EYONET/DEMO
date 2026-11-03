"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function ServiceCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const interactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionPreference.matches);

    function handleMotionPreferenceChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    return () => {
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsPageVisible(!document.hidden);
    }

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const track = viewport?.firstElementChild;
    if (
      !viewport ||
      !firstGroup ||
      !track ||
      prefersReducedMotion ||
      isHovered ||
      isFocused ||
      isInteracting ||
      !isInView ||
      !isPageVisible
    ) {
      return;
    }

    let cycleWidth = 0;
    const measureCycle = () => {
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      cycleWidth = firstGroup.getBoundingClientRect().width + gap;
      if (cycleWidth > 0 && viewport.scrollLeft >= cycleWidth) {
        viewport.scrollLeft %= cycleWidth;
      }
    };
    const resizeObserver = new ResizeObserver(measureCycle);
    resizeObserver.observe(firstGroup);
    measureCycle();

    let lastTimestamp = 0;
    let animationFrame = 0;
    const step = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }
      const elapsed = Math.min(timestamp - lastTimestamp, 100);
      lastTimestamp = timestamp;

      if (!document.hidden && cycleWidth > 0) {
        viewport.scrollLeft += (80 * elapsed) / 1000;
        if (viewport.scrollLeft >= cycleWidth) {
          viewport.scrollLeft %= cycleWidth;
        }
      }

      animationFrame = window.requestAnimationFrame(step);
    };
    animationFrame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [
    isFocused,
    isHovered,
    isInView,
    isInteracting,
    isPageVisible,
    prefersReducedMotion,
  ]);

  useEffect(
    () => () => {
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
    },
    [],
  );

  function move(direction: -1 | 1) {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const firstCard = firstGroup?.firstElementChild;
    const track = viewport?.firstElementChild;
    if (!(viewport && firstGroup && firstCard instanceof HTMLElement && track)) {
      return;
    }

    const style = window.getComputedStyle(firstGroup);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const cycleWidth =
      firstGroup.getBoundingClientRect().width +
      (Number.parseFloat(window.getComputedStyle(track).columnGap) || 0);
    let target = viewport.scrollLeft + direction * (firstCard.offsetWidth + gap);
    if (target < 0 && cycleWidth > 0) {
      target += cycleWidth;
    }

    pauseForInteraction();
    viewport.scrollTo({ left: target, behavior: "smooth" });
  }

  function pauseForInteraction() {
    setIsInteracting(true);
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
    }
    interactionTimer.current = setTimeout(() => {
      setIsInteracting(false);
      interactionTimer.current = null;
    }, 2500);
  }

  return (
    <div className="crown-service-carousel">
      <div className="crown-service-carousel-controls">
        <button
          className="crown-slider-button"
          type="button"
          aria-label="Previous services"
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="crown-slider-button"
          type="button"
          aria-label="Next services"
          onClick={() => move(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div
        ref={viewportRef}
        className="crown-service-carousel-viewport"
        role="region"
        aria-label="Cleaning services"
        aria-roledescription="carousel"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (
            !(
              event.relatedTarget instanceof Node &&
              event.currentTarget.contains(event.relatedTarget)
            )
          ) {
            setIsFocused(false);
          }
        }}
        onPointerDownCapture={pauseForInteraction}
        onPointerMoveCapture={(event) => {
          if (event.buttons > 0 || event.pointerType === "touch") {
            pauseForInteraction();
          }
        }}
        onWheelCapture={pauseForInteraction}
      >
        <div className="crown-service-carousel-track">
          <div
            ref={firstGroupRef}
            className="crown-service-carousel-group crown-service-grid"
          >
            {children}
          </div>
          <div
            className="crown-service-carousel-group crown-service-grid"
            aria-hidden="true"
            inert
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
