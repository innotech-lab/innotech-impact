import React from 'react'
import './footer.css'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>

                <div className='footer-content-left'>
                    <h3>Mon Site</h3>
                    <p>Suivez-nous sur les réseaux sociaux</p>
                </div>

                <div className='footer-content-center'>
                    <h4>Liens utiles</h4>
                    <ul>
                        <li>Accueil</li>
                        <li>À propos</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className='footer-content-right'>
                    <h4>Réseaux sociaux</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className='item'><FaFacebook />Facebook</a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className='item'><FaYoutube />YouTube</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className='item'><FaInstagram />Instagram</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer