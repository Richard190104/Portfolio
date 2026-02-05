import { useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi'
import AnimatedBackground from './components/AnimatedBackground'
import "devicon/devicon.min.css";
import './App.css'
import Project from './components/Project';
import projects from "../src/assets/jsons/projects.json";
import "./ProjectDetail.css";
function App() {
  const skillsIcons = [
    "devicon-html5-plain colored",        // HTML/CSS
    "devicon-css3-plain colored",

    "devicon-javascript-plain colored",   // JavaScript

    "devicon-python-plain colored",       // Python

    "devicon-java-plain colored",         // Java

    "devicon-c-plain colored",            // C

    "devicon-mysql-plain colored",        // SQL (alebo postgres)

    "devicon-react-original colored",     // React

    "devicon-nodejs-plain colored",       // Node.js

    "devicon-quasar-plain colored"        // Quasar
  ];

  const skillDescriptions = [
  <>
    <i
      className="devicon-html5-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>HTML5</b>: I started learning HTML in high school by creating{" "}
    <b>simple web pages</b>. I enjoyed building something visual and seeing the
    results immediately. It was my first step into web development and it
    motivated me to keep learning.
  </>,

  <>
    <i
      className="devicon-css3-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>CSS3</b>: CSS was key to improving the design of the websites I built. I
    learned the basics alongside HTML to create{" "}
    <b>visually appealing layouts</b>. Since then, I’ve created many static
    websites using only HTML + CSS to explore its potential and possibilities.
  </>,

  <>
    <i
      className="devicon-javascript-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>JavaScript</b>: I first encountered JavaScript a year before I started
    university. My motivation was simple—make websites dynamic. While working on
    my projects, I realized I needed <b>JavaScript</b>. After learning the basics, I
    got hooked and enrolled in a JavaScript class at university to strengthen my
    understanding of the fundamentals.
  </>,

  <>
    <i
      className="devicon-python-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>Python</b>: Python was the first programming language I chose to learn.
    I started with simple “Hello, world!” programs and gradually moved to more
    complex algorithms and AI models. I’ve worked on many Python projects — both
    <b>personal and university-related</b> - constantly improving my skills and
    knowledge.
  </>,

  <>
    <i
      className="devicon-java-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>Java</b>: I first learned the basics of <b>object-oriented programming</b> in
    Python, then expanded my knowledge in Java. I worked on school projects that
    required OOP principles and I also learned fundamental design patterns.
  </>,

  <>
    <i
      className="devicon-c-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>C</b>: I first encountered C at university, where I learned pointers and
    advanced data structures such as <b>linked lists</b> and <b>heaps</b>. I completed an
    introductory course and later moved on to <b>data structures and algorithms </b>
    using C.
  </>,

  <>
    <i
      className="devicon-mysql-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>SQL</b>: I Completed several advanced SQL queries in my second year on university as a school projects. These included window functions, query optimization, indexing, and more. 
    I’m comfortable using SQL for database design, querying, and data
    manipulation—writing JOINs, aggregations, and working with relational data
    efficiently. 
  </>,

  <>
    <i
      className="devicon-react-original colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>React</b>: After simple HTML + CSS + JavaScript projects, I wanted to build more
    complex web applications. React’s component-based architecture made it easy
    to manage state and build <b>interactive UIs</b>. I’ve built several projects with
    React, gaining experience with <b>hooks</b>, <b>context</b>, and <b>routing</b>. I also worked on a school project using <b>React Native</b>,
    which helped me understand mobile app development concepts.
  </>,

  <>
    <i
      className="devicon-nodejs-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>Node.js</b>: I used Node.js couple of times for <b>server-side development</b>—building APIs,
    handling asynchronous logic, and integrating services to support <b>full-stack</b>
    applications.
  </>,

  <>
    <i
      className="devicon-quasar-plain colored"
      style={{ fontSize: "3rem", margin: "1rem" }}
    ></i>
    <br />
    <b>Quasar</b>: In my third year at university, I worked on a <b>progressive web app</b> using <b>Quasar</b> framework.
    Quasar's extensive component library and built-in features allowed me to rapidly develop a <b>responsive</b> and <b>performant</b> application.
    I enjoyed learning how to leverage its capabilities to create a seamless user experience and enjoyed simplicity and efficiency of the framework.

  </>,
];

  const [hoveredBox, setHoveredBox] = useState(-1);
  const [showText, setShowText] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionLeftRef = useRef<HTMLDivElement | null>(null);

  const handleSkillClick = (index: number) => {
    setHoveredBox(index);
    setShowText(true);

    if (window.innerWidth <= 768 && sectionLeftRef.current) {
      sectionLeftRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  useEffect(() => {
    if (selectedProject) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedProject]);
  
  useEffect(() => {
    const skillBoxes = document.querySelectorAll('.iconBox');
      skillBoxes.forEach((box, index) => {
        setTimeout(() => {
          box.classList.add('animate');
        }, Math.random() * 4000 + 2000);
        box.addEventListener('click', () => {
          setHoveredBox(index);
          setShowText(true);
        });
        box.addEventListener('mouseout', () => {
          setShowText(false);
        });
      });

      

    const loadableElements = document.querySelectorAll('.loadable');
    if (loadableElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('load');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    loadableElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <AnimatedBackground />
      <div className="content">
        <section className="section section-intro">
          <p>Hello, I'm <b>Richard</b>.</p>
          <p>I build modern web applications</p>
          <button>View my work</button>
        </section>

        <section className="section about-section" style={{flexDirection: 'row', justifyContent: 'start', alignItems: 'start', minHeight: 'auto', height: 'auto'}}>
          <div className="section-left" ref={sectionLeftRef}>
            <h2>About Me</h2>
            <FiUser className="profile-icon" />
            <div className={`slideInfoText ${showText ? 'hovered' : ''}`}>
              <div className="text-slider">
                
                <p className="main-text">
                  I am a computer science student at the <b>Faculty of Informatics and Information Technologies</b>, STU in Bratislava.<br /> <br />
                  I have a strong passion for <b>web development</b> and enjoy creating interactive and visually appealing user interfaces.
                  I also have experience in <b>backend development</b> and <b>database management</b>, which I learned through various projects.<br />
                  In addition to my technical skills, I am a quick learner and a team player, always eager to take on new challenges and collaborate with others to achieve common goals.
                </p>
                <p className="hover-text">{skillDescriptions[hoveredBox]}</p>
              </div>
            </div>
          </div>
          <div className="section-right">
            <h2>My skills</h2>
            <div className="skills-icons">
              {skillsIcons.map((iconClass, index) => (
                <div className='iconBox loadable' key={index} onClick={() => handleSkillClick(index)}>
                <i key={index} className={iconClass } style={{fontSize: '3rem', margin: '1rem'}}></i>
                </div>
              ))}
            </div>
          </div>
          
        </section>
        <div className='separator'></div>
        <section className="section projects-section" style={{flexDirection: 'column', justifyContent: 'start', alignItems: 'start', minHeight: 'none !important', margin: '0% 5%'}}>
          <h2>My Projects</h2>
          
          <div className="projects-wrapper" style={{width: '100%'}}>
            <div className={`project-list ${selectedProject ? 'slide-out' : 'slide-in'}`}>
              <div className="project-container">
                { projects.map((value) => (
                    <Project 
                      key={value.title}
                      title={value.title}
                      description={value.description}
                      project={value.project}
                      moreDetails={value.moreDetails}
                      Technologies={value.technologies}
                      Images={value.images}
                      onSelect={() => setSelectedProject(value)}
                    />
                  ))}
              </div>
            </div>
            
            {selectedProject && (
              <div className={`project-detail-page ${selectedProject ? 'slide-in' : 'slide-out'}`}>
                
                <h2>{selectedProject.title}</h2>
                {selectedProject.moreDetails.map((detail, index) => (
                  <div key={index}>
                  <p>{detail}</p>
                  {selectedProject.images[index] != "" && selectedProject.images[index] != null && (
                    <div className="project-images">
                    <img src={`${import.meta.env.BASE_URL}${selectedProject.images[index]}`} alt={selectedProject.title} />
                    </div>
                  )}
                  </div>
                ))}
                {selectedProject.project !== "" && (
                    <>
                    <h3>Project Demo</h3>
                    <div className='project-images'>
                      <iframe src={selectedProject.project} title={selectedProject.title} width="100%" height="600px" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    </>
                )}
                <h3>Technologies Used:</h3>
                <div className="project-technologies">
                  {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <button className="close-button" onClick={() => setSelectedProject(null)}>Back to Projects</button>  
              </div>
            )}
          </div>
         
        </section>

      </div>

    </>
  )
}

export default App
