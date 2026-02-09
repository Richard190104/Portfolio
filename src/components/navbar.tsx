import { useEffect } from 'react';
import './navbar.css';
export default function Navbar() {

    useEffect(() => {
        const navbarButtons = document.querySelectorAll('.navbar h3') as NodeListOf<HTMLElement>;
        navbarButtons.forEach(button => {
            button.addEventListener('click', () => {
                const link = button.getAttribute('data-link');
                const section = document.getElementById(link!);
                section?.scrollIntoView({ behavior: 'smooth' });
            });
        });
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const scrollY = window.scrollY;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.navbar h3[data-link="${sectionId}"]`);
                if (scrollY >= sectionTop - sectionHeight / 2 && scrollY < sectionTop + sectionHeight / 2) {
                    navLink?.classList.add('active');
                } else {
                    navLink?.classList.remove('active');
                }
            });
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call handleScroll initially to set the active class based on the initial scroll position
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return(
        <>
            <div className='navbar'>
                <h3 data-link="home" className='active'>Home</h3>
                <h3 data-link="about">About me</h3>
                <h3 data-link="projects">Projects</h3>
                <h3 data-link="contact">Contact</h3>

            </div>
        </>
    )
}