"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║       CHAPITRE 5 : LES VUES (views.py) — Le Chef d'Orchestre    ║
╚══════════════════════════════════════════════════════════════════╝

QU'EST-CE QU'UNE VUE (VIEW) ?
================================
Une vue est la fonction (ou classe) qui reçoit une requête HTTP,
effectue une action, et retourne une réponse HTTP.

C'EST LE CŒUR DE LA LOGIQUE BACKEND.

FLUX COMPLET D'UNE REQUÊTE :
  React         → GET http://127.0.0.1:8000/api/services/
  urls.py       → route 'services/' associée à ServiceViewSet
  views.py      → ServiceViewSet.list() est appelée
                → QuerySet : SELECT * FROM api_service ORDER BY order
  serializers   → Convertit les objets Python en JSON
  Réponse HTTP  → [{"id":1,"title":"Dev Web",...}, ...]  (status 200)
  React         → reçoit le JSON et met à jour l'interface

LES DEUX TYPES DE VIEWSET UTILISÉS ICI :
  1. ReadOnlyModelViewSet  → Lecture seule (GET uniquement)
                             Actions disponibles : list(), retrieve()
                             Utilisé pour les données gérées par l'admin

  2. ModelViewSet          → Lecture ET écriture (GET + POST + PUT + DELETE)
                             Actions disponibles : list(), create(), retrieve(), update(), destroy()
                             Utilisé pour les formulaires (contact, devis, newsletter)

CORRESPONDANCE MÉTHODE HTTP ↔ ACTION VIEWSET :
  GET    /api/services/       → list()      → tous les services
  GET    /api/services/1/     → retrieve()  → le service avec id=1
  POST   /api/contact/        → create()    → créer un nouveau message
  PUT    /api/contact/1/      → update()    → modifier un message existant
  DELETE /api/contact/1/      → destroy()   → supprimer un message
"""

from rest_framework import viewsets
from .models import (
    Service, Testimonial, ContactMessage, Project, Formation,
    QuoteRequest, CompanyValue, HeroSlide, Partner, CompanyInfo,
    NewsletterSubscriber, BackgroundSection, TeamMember, ProcessStep, FAQ
)
from .serializers import (
    ServiceSerializer, TestimonialSerializer, ContactMessageSerializer,
    ProjectSerializer, FormationSerializer, QuoteRequestSerializer,
    CompanyValueSerializer, HeroSlideSerializer, PartnerSerializer,
    CompanyInfoSerializer, NewsletterSubscriberSerializer,
    BackgroundSectionSerializer, TeamMemberSerializer,
    ProcessStepSerializer, FAQSerializer
)
from django.core.mail import send_mail
from django.conf import settings


# =================================================================
#  VIEWSET 1 : Service — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/services/
# Réponse : tableau JSON de tous les services, triés par 'order'
#
# ReadOnlyModelViewSet génère automatiquement 2 routes :
#   /api/services/    → liste complète
#   /api/services/1/  → un service précis par son id
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    # queryset : la requête base de données qui sera exécutée
    # Service.objects.all() = SELECT * FROM api_service ORDER BY order, title
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer  # Quel serializer utiliser pour la conversion


# =================================================================
#  VIEWSET 2 : Testimonial — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/testimonials/
class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


# =================================================================
#  VIEWSET 3 : ContactMessage — Lecture ET Écriture (POST)
# =================================================================
# URL : POST http://127.0.0.1:8000/api/contact/
# C'est ici que le formulaire de contact React envoie ses données.
#
# FLUX DÉTAILLÉ D'UN ENVOI DE FORMULAIRE :
#   1. React : fetch('http://127.0.0.1:8000/api/contact/', { method:'POST', body: JSON.stringify({...}) })
#   2. Django reçoit la requête → ContactMessageViewSet.create() est appelée
#   3. DRF parse le JSON et le valide avec ContactMessageSerializer
#   4. Si valide → perform_create() est appelée
#   5. Le message est sauvegardé en base de données
#   6. Un email de notification est envoyé à l'admin
#   7. Django retourne : 201 Created + le message sauvegardé en JSON
#   8. React reçoit le status 201 → affiche "Message envoyé avec succès !"
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        """
        Méthode appelée automatiquement par DRF juste avant de sauvegarder.
        On la surcharge (override) pour ajouter la logique d'envoi d'email.
        Le paramètre 'serializer' contient les données validées prêtes à être sauvegardées.
        """
        # ÉTAPE 1 : Sauvegarder le message en base de données
        # serializer.save() exécute un INSERT SQL et retourne l'objet créé
        instance = serializer.save()

        # ÉTAPE 2 : Récupérer l'email de destination depuis CompanyInfo
        # On utilise .first() car CompanyInfo est un singleton (une seule entrée)
        company = CompanyInfo.objects.first()
        # Fallback : si CompanyInfo est vide, on utilise un email par défaut
        recipient = company.email if company else "admin@innotech.bi"

        # ÉTAPE 3 : Composer l'email de notification
        subject = f"Nouveau message de {instance.name} : {instance.subject}"
        message = (
            f"Vous avez reçu un nouveau message sur InnoTech.\n\n"
            f"Nom: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Sujet: {instance.subject}\n"
            f"Message: {instance.message}"
        )

        # ÉTAPE 4 : Envoyer l'email
        # En développement : s'affiche dans le terminal Django (console backend)
        # En production : nécessite un vrai SMTP (Gmail, SendGrid, etc.)
        try:
            send_mail(
                subject,                      # Sujet du mail
                message,                      # Corps du mail
                settings.DEFAULT_FROM_EMAIL,  # Expéditeur (défini dans settings.py)
                [recipient]                   # Liste des destinataires
            )
        except Exception as e:
            # On ne fait pas planter l'API si l'email échoue.
            # Le message est quand même sauvegardé en base.
            print(f"⚠️ Erreur d'envoi d'email: {e}")


# =================================================================
#  VIEWSET 4 : Project — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/projects/
# Retourne les projets avec le champ calculé 'stack_array' (voir serializers.py)
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# =================================================================
#  VIEWSET 5 : Formation — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/formations/
class FormationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer


# =================================================================
#  VIEWSET 6 : QuoteRequest — Lecture ET Écriture (POST)
# =================================================================
# URL : POST http://127.0.0.1:8000/api/quotes/
# Même logique que ContactMessage : sauvegarde + notification email
class QuoteRequestViewSet(viewsets.ModelViewSet):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer

    def perform_create(self, serializer):
        """Sauvegarde la demande de devis et notifie l'admin par email."""
        instance = serializer.save()
        company = CompanyInfo.objects.first()
        recipient = company.email if company else "admin@innotech.bi"

        subject = f"Nouvelle Demande de Devis de {instance.name}"
        message = (
            f"Détails de la demande :\n\n"
            f"Nom: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Service: {instance.service}\n"
            f"Message: {instance.message}"
        )

        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [recipient])
        except Exception as e:
            print(f"⚠️ Erreur d'envoi d'email: {e}")


# =================================================================
#  VIEWSET 7 : CompanyValue — Lecture seule
# =================================================================
class CompanyValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueSerializer


# =================================================================
#  VIEWSET 8 : HeroSlide — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/hero-slides/
# React récupère les slides et les affiche en carrousel sur la page d'accueil.
class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer


# =================================================================
#  VIEWSET 9 : Partner — Lecture seule
# =================================================================
class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


# =================================================================
#  VIEWSET 10 : CompanyInfo — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/company-info/
#
# IMPORTANT : Cette route retourne un TABLEAU avec une seule entrée :
# [{ "address": "...", "email": "...", "phone": "...", "map_url": "..." }]
#
# Dans React, on accède aux données avec : data[0]
# Exemple (src/page/Contact/contact.jsx) :
#   .then(data => { if (data.length > 0) setCompanyInfo(data[0]); })
class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer


# =================================================================
#  VIEWSET 11 : NewsletterSubscriber — Lecture ET Écriture
# =================================================================
# URL : POST http://127.0.0.1:8000/api/newsletter/
# React envoie : { "email": "utilisateur@mail.com" }
# Django vérifie l'unicité (email unique) et sauvegarde.
# En cas d'email déjà existant : retourne 400 Bad Request automatiquement.
class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer


# =================================================================
#  VIEWSET 12 : BackgroundSection — Lecture seule
# =================================================================
class BackgroundSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BackgroundSection.objects.all()
    serializer_class = BackgroundSectionSerializer


# =================================================================
#  VIEWSET 13 : TeamMember — Lecture seule
# =================================================================
# URL : GET http://127.0.0.1:8000/api/team-members/
# React reçoit la liste des membres avec leur photo (URL complète).
# Si une photo est manquante, React utilise un avatar généré automatiquement
# via le service ui-avatars.com (voir team.jsx)
class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


# =================================================================
#  VIEWSET 14 : ProcessStep — Lecture seule
# =================================================================
class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer


# =================================================================
#  VIEWSET 15 : FAQ — Lecture seule
# =================================================================
class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
