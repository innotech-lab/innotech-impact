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

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet, TestimonialViewSet, ContactMessageViewSet,
    ProjectViewSet, FormationViewSet, QuoteRequestViewSet,
    CompanyValueViewSet, HeroSlideViewSet, PartnerViewSet,
    CompanyInfoViewSet, NewsletterSubscriberViewSet,
    BackgroundSectionViewSet, TeamMemberViewSet,
    ProcessStepViewSet, FAQViewSet
)

# =================================================================
#   CRÉATION DU ROUTER AUTOMATIQUE
# =================================================================
# DefaultRouter crée aussi une page d'accueil interactive à l'URL /api/
# qui liste toutes les routes disponibles. Très pratique pour tester !
# Accès : http://127.0.0.1:8000/api/
router = DefaultRouter()

# =================================================================
#   ENREGISTREMENT DES ROUTES
# =================================================================
# Syntaxe : router.register(r'<prefix>', <ViewSet>)
#   - prefix : le segment d'URL (sans slash)
#   - ViewSet : la classe qui gère les requêtes

# ── Données du site (lecture seule) ──────────────────────────────
router.register(r'services',          ServiceViewSet)          # Nos services
router.register(r'testimonials',      TestimonialViewSet)      # Témoignages clients
router.register(r'projects',          ProjectViewSet)          # Portfolio de projets
router.register(r'formations',        FormationViewSet)        # Formations proposées
router.register(r'company-values',    CompanyValueViewSet)     # Valeurs de l'entreprise
router.register(r'hero-slides',       HeroSlideViewSet)        # Slides de la page d'accueil
router.register(r'partners',          PartnerViewSet)          # Logos des partenaires
router.register(r'company-info',      CompanyInfoViewSet)      # Infos de contact globales
router.register(r'background-section',BackgroundSectionViewSet)# Section vidéo/image
router.register(r'team-members',      TeamMemberViewSet)       # Équipe
router.register(r'process-steps',     ProcessStepViewSet)      # Étapes de collaboration
router.register(r'faqs',              FAQViewSet)              # FAQs

# ── Formulaires (lecture + écriture) ─────────────────────────────
router.register(r'contact',           ContactMessageViewSet)   # Formulaire de contact
router.register(r'quotes',            QuoteRequestViewSet)     # Formulaire de devis
router.register(r'newsletter',        NewsletterSubscriberViewSet) # Inscription newsletter


# =================================================================
#   ACTIVATION DES ROUTES DANS DJANGO
# =================================================================
urlpatterns = [
    # include(router.urls) ajoute toutes les routes générées par le router
    # à la liste urlpatterns de ce fichier.
    # Ce fichier est lui-même inclus dans core_project/urls.py sous le préfixe 'api/'
    # donc toutes les routes seront préfixées par /api/
    path('', include(router.urls)),
]
