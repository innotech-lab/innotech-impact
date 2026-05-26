/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║         CHAPITRE 7 : App.jsx — Le Chef d'Orchestre React        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * RÔLE DE App.jsx :
 * ==================
 * C'est le composant racine de toute l'application React.
 * Il ne gère pas les données de l'API lui-même, mais il orchestre :
 *   1. La barre de navigation (toujours visible)
 *   2. Le système de routage (quelle page afficher selon l'URL)
 *   3. Le pied de page (toujours visible)
 *
 * ARCHITECTURE DE L'APPLICATION :
 * =================================
 *
 *  ┌──────────────────────────────────────────────┐
 *  │  <Navbar />  (toujours visible)              │
 *  ├──────────────────────────────────────────────┤
 *  │                                              │
 *  │  <Routes> — Contenu dynamique selon l'URL   │
 *  │                                              │
 *  │   URL "/"        → Page d'accueil complète  │
 *  │                    (Home + About + Service   │
 *  │                     + Temoignage + Team      │
 *  │                     + Contact + Background  │
 *  │                     + Section)               │
 *  │                                              │
 *  │   URL "/about"   → <DetailAbout />           │
 *  │   URL "/services"→ <DetailService />         │
 *  │   URL "/projects"→ <Projects />              │
 *  │   URL "/contact" → <ContactPage />           │
 *  │   ... etc                                    │
 *  │                                              │
 *  ├──────────────────────────────────────────────┤
 *  │  <Footer />  (toujours visible)              │
 *  └──────────────────────────────────────────────┘
 *
 * REACT ROUTER DOM :
 * ===================
 * <Routes> et <Route> viennent de la bibliothèque react-router-dom.
 * Ils permettent d'afficher différents composants selon l'URL
 * SANS recharger la page (c'est ce qu'on appelle un SPA : Single Page App).
 *
 * La navigation se fait sans rechargement de page :
 *   Utilisateur clique sur "Contact" → URL change vers "/contact"
 *   React Router détecte le changement → affiche <ContactPage />
 *   Pas de rechargement complet = interface fluide et rapide ✅
 */

import { Routes, Route } from 'react-router-dom'

// ── Composants permanents (toujours visibles) ─────────────────────
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'

// ── Composants de la page d'accueil (route "/") ──────────────────
// Chacun de ces composants fait son propre appel API vers Django.
import Home        from './Components/Home/home'         // → /api/hero-slides/
import About       from './Components/About/about'       // → /api/company-info/
import Service     from './Components/Service/service'   // → /api/services/
import Temoignage  from './Components/Temoignage/temoignage' // → /api/testimonials/
import Team        from './Components/Team/team'         // → /api/team-members/
import Contact     from './Components/Contact/contact'   // → POST /api/contact/
import Background  from './Components/Background/background' // → /api/background-section/
import Section     from './Components/Section/section'   // → /api/partners/

// ── Pages dédiées (sous-routes) ───────────────────────────────────
import DetailAbout   from './page/DetailAbout/DetailAbout'   // → /api/company-values/
import DetailService from './page/DetailService/DetailService'// → /api/services/
import Portfolio     from './page/Portfolio/Portfolio'       // → /api/projects/
import Projects      from './page/Projects/Projects'         // → /api/projects/
import Formation     from './page/Formation/formation'       // → /api/formations/
import ContactPage   from './page/Contact/contact'           // → /api/company-info/ + POST /api/contact/
import Devis         from './page/Devis/Devis'               // → POST /api/quotes/

import './App.css'

function App() {
  return (
    <div className='app'>

      {/* ─────────────────────────────────────────────────────── */}
      {/* La Navbar est en dehors de <Routes> : elle est donc    */}
      {/* affichée sur TOUTES les pages, quelle que soit l'URL.  */}
      {/* ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ─────────────────────────────────────────────────────── */}
      {/* <Routes> : Le gestionnaire de routes                    */}
      {/* Il compare l'URL actuelle avec chaque <Route path="">  */}
      {/* et affiche le composant correspondant.                  */}
      {/* ─────────────────────────────────────────────────────── */}
      <Routes>

        {/* ROUTE PRINCIPALE : Page d'accueil ("/")
            Elle affiche plusieurs composants empilés verticalement.
            Chaque composant est indépendant et gère ses propres données API. */}
        <Route path="/" element={
          <>
            <Home />        {/* Section carrousel héro */}
            <About />       {/* Section "Qui sommes-nous" */}
            <Service />     {/* Section "Nos Services" */}
            <Temoignage />  {/* Section "Témoignages" */}
            <Team />        {/* Section "Notre Équipe" */}
            <Contact />     {/* Section "Formulaire de Contact" rapide */}
            <Background />  {/* Section vidéo/image de fond */}
            <Section />     {/* Section "Partenaires" */}
          </>
        } />

        {/* ROUTES DES PAGES DÉDIÉES */}
        {/* path="/about" → affiche uniquement <DetailAbout />, pas la page d'accueil */}
        <Route path="/about"      element={<DetailAbout />}   />
        <Route path="/services"   element={<DetailService />} />
        <Route path="/projects"   element={<Projects />}      />
        <Route path="/portfolio"  element={<Portfolio />}     />
        <Route path="/formation"  element={<Formation />}     />
        <Route path="/team"       element={<Team />}          />
        {/* ContactPage (page complète) vs Contact (composant section accueil) */}
        <Route path="/contact"    element={<ContactPage />}   />
        <Route path="/devis"      element={<Devis />}         />

      </Routes>

      {/* Le Footer est aussi en dehors de <Routes> : visible partout. */}
      <Footer />

    </div>
  )
}

export default App
