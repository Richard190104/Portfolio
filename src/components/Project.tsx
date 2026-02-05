import "./Project.css"
import type ProjectInterface from "../interfaces/ProjectInterface";

export default function Project({title, description, Technologies, onSelect}: ProjectInterface) {
    function slideContainer() {
        if (onSelect) {
            onSelect();
        }
    }

    return (
        <>
        <div className="project-box loadable" onClick={slideContainer}>
            <h3>{title}</h3>
            <p>{description}</p>
            {Technologies && Technologies.length > 0 && (
                <div className="project-technologies">
                    {Technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
            )}
        </div>

        </>
    )
}