import "./Project.css"
import type ProjectInterface from "../interfaces/ProjectInterface";

export default function Project({title, description, technologies, onSelect}: ProjectInterface) {
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
            {technologies && technologies.length > 0 && (
                <div className="project-technologies">
                    {technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
            )}
        </div>

        </>
    )
}