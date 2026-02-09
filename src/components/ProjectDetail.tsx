import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import type ProjectInterface from "../interfaces/ProjectInterface";

export default function ProjectDetail({
  selectedProject,
  deselectProject,
}: {
  selectedProject: ProjectInterface | null;
  deselectProject: () => void;
}) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [swipeX, setSwipeX] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      deselectProject();
    },
    onSwiping: (eventData) => {
      if (eventData.deltaX > 0) {
        setSwipeX(eventData.deltaX);
      }
    },
    onSwiped: () => {
      setSwipeX(0);
    },
    trackMouse: false,
    delta: 30, 
  });

  useEffect(() => {
    const scroller = pageRef.current;
    if (!scroller || !selectedProject) return;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    let raf = 0;

    const getItems = () =>
      refs.current.filter(Boolean) as HTMLElement[]; // ✅ bez dier

    const update = () => {
      const items = getItems();
      if (!items.length) return;

      const scrollTop = scroller.scrollTop;
      const vh = scroller.clientHeight;

      // kde v “obrazovke” má element začať/končiť (tvoje tunovanie)
      const startLine = vh ;
      const endLine = vh * 0.5;

      const fromX = 1800;

      for (const item of items) {
        const itemTop = item.offsetTop; // pozícia vnútri scrolleru

        const startScroll = itemTop - startLine;
        const endScroll = itemTop - endLine;
        const denom = Math.max(1, endScroll - startScroll);

        const t = clamp01((scrollTop - startScroll) / denom);
        const k = smoothstep(t);

        const x = fromX * (1 - k);
        const opacity = k;
        const scale = 0.95 + 0.05 * k;
        if (item.classList.contains("left")) {
          item.style.transform = `translateX(${-x}px) scale(${scale})`;

        } else {
        item.style.transform = `translateX(${x}px) scale(${scale})`;
        }
        item.style.opacity = String(opacity);
      }

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ✅ init + po načítaní obrázkov (layout sa zmení)
    update();
    requestAnimationFrame(update);
    setTimeout(update, 50);
    setTimeout(update, 200);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selectedProject?.title]);

  if (!selectedProject) return null;

  refs.current = [];

  return (
    <div
      {...swipeHandlers}
      ref={pageRef}
      className={`project-detail-page ${selectedProject ? "slide-in" : "slide-out"}`}
      data-lenis-prevent
      data-lenis-prevent-wheel
      style={{
        transform: `translateX(calc(-50% + ${swipeX}px))`,
        opacity: Math.max(0.6, 1 - swipeX / 500),
      }}
    >

      <div className="detail-project-wrapper">
            <button className="close-button-top" onClick={deselectProject}>
              Back to Projects
            </button>
           



        <div className="detail-content-section">
          <div className="detail-left-content">
            <h2>{selectedProject.title}</h2>
            <p className="detail-description">{selectedProject.description}</p>
            {selectedProject.moreDetails.map((detail, index) => (
              <p key={index} className="detail-text">{detail}</p>
            ))}
          </div>

          <div className="detail-right-content">
            <div className="project-technologies-detail">
              <div className="project-tech-tags">
              {selectedProject.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
              </div>
              {selectedProject.project && (
                <button className="view-website-button" onClick={() => window.open(selectedProject.project, '_blank')}>
                    View wsebsite
                </button>
                
              )}
              <button className="view-code-button" onClick={() => window.open(selectedProject.project, '_blank')}>
                    View code
                </button>
                
              
            </div>
          </div>
        </div>
                <div className="detail-images-gallery">
          {selectedProject.images.filter(img => img).map((image, index) => (
            <div key={index} className="gallery-image-block">
              <img
                src={`${import.meta.env.BASE_URL}${image}`}
                alt={`${selectedProject.title} - ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
