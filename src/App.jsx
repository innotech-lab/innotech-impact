import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Home from "./Components/Home/home";
import useScrollReveal from "./hooks/useScrollReveal";
import { RouteSkeleton } from "./Components/Skeleton/Skeleton";
import { useT } from "./i18n";

/*
  THESIS: A public technology studio that refuses a generic SaaS card stack; its
  living signal connects software work to STEM learning. OWN-WORLD: Deep ink,
  laboratory paper and the logo's green signal; editorial serif titles meet
  precise utility type. STORY: A visitor sees two concrete ways to work with
  Innotech, finds proof, then begins a project or learning conversation.
  FIRST VIEWPORT: A dark studio field holds the thesis at left, the generated lab
  image at right and two audience paths below. FORM: Persuade / signal-pathway
  direction / staging seed a1988d5a.
*/

/*
  L'accueil reste dans le chunk d'entrée : c'est la page d'arrivée la plus
  probable, la charger à part ajouterait un aller-retour. Les autres routes sont
  découpées — un visiteur qui vient sur /contact n'a plus à télécharger
  l'ensemble du site.
*/
const DetailAbout = lazy(() => import("./page/DetailAbout/DetailAbout"));
const DetailService = lazy(() => import("./page/DetailService/DetailService"));
const Projects = lazy(() => import("./page/Projects/Projects"));
const Formation = lazy(() => import("./page/Formation/formation"));
const Contact = lazy(() => import("./page/Contact/contact"));
const Blog = lazy(() => import("./page/Blog/Blog"));
const Devis = lazy(() => import("./page/Devis/Devis"));
const Mentions = lazy(() => import("./page/Mentions/Mentions"));
const NotFound = lazy(() => import("./page/NotFound/NotFound"));

function App() {
  const { pathname } = useLocation();
  const t = useT();
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("Aller au contenu")}
      </a>
      {/* La progression de lecture : le signal qui avance dans la page.
          Purement décorative, donc retirée de l'arbre d'accessibilité. */}
      <div className="scroll-signal" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="site-main">
        {/* La charpente de la page à venir — surtitre, titre, filet — plutôt
            qu'un vide réservé : quand le contenu arrive, la page se remplit au
            lieu de se réorganiser. */}
        <Suspense fallback={<RouteSkeleton />}>
          {/* La clé sur le chemin force le remontage à chaque route : c'est ce
              qui rejoue la transition d'entrée. */}
          <div className="route-shell" key={pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<DetailAbout />} />
              <Route path="/services" element={<DetailService />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/formation" element={<Formation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/mentions" element={<Mentions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
