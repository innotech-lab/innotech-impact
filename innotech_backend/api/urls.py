"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║       CHAPITRE 6 : LES ROUTES API (api/urls.py)                 ║
║                   "L'Annuaire de l'API"                          ║
╚══════════════════════════════════════════════════════════════════╝

RÔLE DE CE FICHIER :
=====================
Ce fichier fait la liaison entre une URL (adresse web) et un ViewSet
(le code qui traite la requête).

C'est l'annuaire téléphonique de l'API :
  URL '/services/'  →  ServiceViewSet   (gère les services)
  URL '/contact/'   →  ContactMessageViewSet (gère les messages)
  ...

COMMENT LE ROUTER FONCTIONNE :
================================
DRF (Django REST Framework) propose un DefaultRouter qui génère
AUTOMATIQUEMENT toutes les URLs nécessaires pour chaque ViewSet.

Pour chaque router.register(), le router crée :
  /api/services/       ← liste tous les services (GET) ou en crée un (POST)
  /api/services/{id}/  ← accède à un service précis (GET, PUT, DELETE)

SANS le router, il faudrait écrire manuellement :
  path('services/', ServiceViewSet.as_view({'get': 'list'})),
  path('services/<int:pk>/', ServiceViewSet.as_view({'get': 'retrieve'})),
  ... (répété pour chaque ressource !)

Le router automatise tout ça en une seule ligne.

TABLEAU RÉCAPITULATIF DES ENDPOINTS DE L'API :
================================================
  Méthode  | URL                              | Action
  ---------|----------------------------------|---------------------------
  GET      | /api/services/                   | Liste tous les services
  GET      | /api/testimonials/               | Liste tous les témoignages
  POST     | /api/contact/                    | Créer un message de contact
  GET      | /api/projects/                   | Liste tous les projets
  GET      | /api/formations/                 | Liste toutes les formations
  POST     | /api/quotes/                     | Créer une demande de devis
  GET      | /api/company-values/             | Liste les valeurs de l'entreprise
  GET      | /api/hero-slides/                | Liste les slides du carrousel
  GET      | /api/partners/                   | Liste les partenaires
  GET      | /api/company-info/               | Infos entreprise (adresse, tel...)
  POST     | /api/newsletter/                 | S'abonner à la newsletter
  GET      | /api/background-section/         | Config de la section background
  GET      | /api/team-members/               | Liste des membres de l'équipe
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BackgroundSectionViewSet,
    CompanyInfoViewSet,
    CompanyValueViewSet,
    ContactMessageViewSet,
    FAQViewSet,
    FormationViewSet,
    HeroSlideViewSet,
    NewsletterSubscriberViewSet,
    PartnerViewSet,
    ProcessStepViewSet,
    ProjectViewSet,
    QuoteRequestViewSet,
    ServiceViewSet,
    TeamMemberViewSet,
    TestimonialViewSet,
)

# Les modèles, sérialiseurs et ViewSets existaient déjà ; seules les routes
# manquaient, si bien que l'admin permettait de saisir une équipe ou des
# partenaires sans qu'aucune URL ne les expose au site.
router = DefaultRouter()
router.register("services", ServiceViewSet, basename="service")
router.register("projects", ProjectViewSet, basename="project")
router.register("formations", FormationViewSet, basename="formation")
router.register("team", TeamMemberViewSet, basename="team-member")
router.register("partners", PartnerViewSet, basename="partner")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("values", CompanyValueViewSet, basename="company-value")
router.register("process", ProcessStepViewSet, basename="process-step")
router.register("faq", FAQViewSet, basename="faq")
router.register("hero-slides", HeroSlideViewSet, basename="hero-slide")
router.register("company", CompanyInfoViewSet, basename="company-info")
router.register("backgrounds", BackgroundSectionViewSet, basename="background")

# Les trois formulaires publics. En écriture seule : le site poste, il ne lit
# jamais les messages reçus.
router.register("contact", ContactMessageViewSet, basename="contact")
router.register("quotes", QuoteRequestViewSet, basename="quote")
router.register("newsletter", NewsletterSubscriberViewSet, basename="newsletter")

urlpatterns = [
    path("", include(router.urls)),
]
