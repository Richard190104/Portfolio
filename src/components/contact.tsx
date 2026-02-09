import './contact.css'
export default function Contact() {
    return(
        <section className='contact' id='contact'>
            <div className='contact-shell'>
                <div className='contact-copy'>
                    <p className='contact-kicker'>Let us build something great</p>
                    <h2>Contact me</h2>
                    <p className='contact-lede'>If you want to get in touch, feel free to reach out by email or phone! </p>
                    <div className='contact-actions'>
                        <a className='contact-button primary' href='mailto:pukacrichard1@gmail.com'>Email me</a>
                        <a className='contact-button primary' href='tel:+421907545190'>Phone</a>
                        <a className='contact-button ghost' href='https://github.com/Richard190104' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                </div>
                <div className='contact-card'>
                    <div className='contact-card-content'>
                        <h3>Fast response</h3>
                        <p>Whether you have a quick question or a full project, I will help you shape a clear plan and timeline.</p>
                        <div className='contact-info'>
                            <span className='contact-chip'>pukacrichard1@gmail.com</span>
                            <span className='contact-chip'>+421 907 545 190</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}