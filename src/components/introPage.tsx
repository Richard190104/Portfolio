import { useState, useEffect, useRef } from 'react';
import './introPage.css';
export default function IntroPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const menuSection = document.querySelectorAll('.menuSection') as NodeListOf<HTMLElement>;
        menuSection.forEach((section, index) => {
            section.style.top = `${index == 0? 60 : index == 1 ? 10 : 70}%`;
            section.style.left = `${10 * index + 30}%`;
        });
        const handleScroll = () => {
            const element = document.querySelector('.introText') as HTMLElement | null;
            let scrollProgress = 0;
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const scrollStart = sectionTop;
            const scrollEnd = sectionTop + sectionHeight - windowHeight;
            
            const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
            
            scrollProgress = progress;
            element!.style.transform = `scale(${progress * 2 + 1})`; 
            element!.style.opacity = `${1 - progress }`;
           
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const introWrapper = document.querySelector('.intro-wrapper') as HTMLElement;
        if (!introWrapper) return;

        const setCanvasSize = () => {
            const rect = introWrapper.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);





        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <>
        <section className="section section-intro" ref={sectionRef}>
            <div className="intro-wrapper">
                <canvas ref={canvasRef}></canvas>
                <div className='introText'>
                    <p>Hello, I'm <b>Richard</b>.</p>
                    <p>I build modern web applications</p>
                    <button onClick={() => {
                    const projectsSection = document.querySelector('.projects-section');
                    projectsSection?.scrollIntoView({ behavior: 'smooth' });
                    }}>View my work</button>
                </div>
                
            </div>

        </section>
        </>
    )

}