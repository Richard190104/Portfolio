import { useEffect, useRef } from "react";
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

  // ✅ refs reset (dôležité pri zmene projektu)
  refs.current = [];

  return (
    <div
      ref={pageRef}
      className={`project-detail-page ${selectedProject ? "slide-in" : "slide-out"}`}
      data-lenis-prevent
      data-lenis-prevent-wheel
    >
      <div className="detail-project-wrapper">
        <div style={{minHeight: '90vh', display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '10px solid gray'}}>
        <h2>{selectedProject.title}</h2>
        <h3>{selectedProject.description}</h3>
        </div>
        {selectedProject.moreDetails.map((detail, index) => (
          <div key={index} className="project-div-text" >
            <p ref={(el) => { refs.current[index] = el; }} className="detailStepBox left">{detail}</p>

            {!!selectedProject.images[index] && (
              <div className="project-images right" ref={(el) => { refs.current[index + selectedProject.moreDetails.length] = el; }}>
                <img
                  src={`${import.meta.env.BASE_URL}${selectedProject.images[index]}`}
                  alt={selectedProject.title}
                />
              </div>
            )}
          </div>
        ))}

        <div className="k">
        <h3>Technologies Used:</h3>
        <div className="project-technologies-detail">
          {selectedProject.technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>

        <button className="close-button" onClick={deselectProject}>
          Back to Projects
        </button>
      </div>
      </div>
    </div>
  );
}
