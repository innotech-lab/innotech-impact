"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║     CHAPITRE 4 : LES SÉRIALISEURS (serializers.py)              ║
║                  "Les Traducteurs Python → JSON"                 ║
╚══════════════════════════════════════════════════════════════════╝

POURQUOI LES SÉRIALISEURS EXISTENT-ILS ?
==========================================
Django stocke les données sous forme d'objets Python.
React ne comprend que le format JSON (texte structuré).

Un serializer est un "traducteur bilingue" qui fait la conversion
dans les deux sens :

  LECTURE (GET)   : Objet Python  →  Serializer  →  JSON  →  React
  ÉCRITURE (POST) : JSON (React)  →  Serializer  →  Objet Python  →  Base de données

EXEMPLE CONCRET :
  Python (Django) :
    <TeamMember: name="Jean Dupont", role="CTO", linkedin="https://...">

  JSON (après sérialisation) :
    {
      "id": 1,
      "name": "Jean Dupont",
      "role": "CTO",
      "image": "http://127.0.0.1:8000/media/team/jean.jpg",
      "linkedin": "https://linkedin.com/in/jeandupont"
    }

  React reçoit ce JSON et affiche :
    <h3>{member.name}</h3>   → "Jean Dupont"
    <img src={member.image} /> → la photo

STRUCTURE D'UN SERIALIZER :
  class MonSerializer(serializers.ModelSerializer):
      class Meta:
          model = MonModele         # Le modèle à traduire
          fields = '__all__'        # Traduire TOUS les champs
          # OU
          fields = ['id', 'name']  # Traduire SEULEMENT ces champs
"""

from rest_framework import serializers
from .models import (
    Service, Testimonial, ContactMessage, Project, Formation,
    QuoteRequest, CompanyValue, HeroSlide, Partner, CompanyInfo,
    NewsletterSubscriber, BackgroundSection, TeamMember, ProcessStep, FAQ
)


# =================================================================
#  SERIALIZER 1 : Service
# =================================================================
# Traduit les champs : id, title, description, icon_svg, order
# React reçoit : [{ "id":1, "title":"Dev Web", "icon_svg":"<svg>...</svg>", ... }, ...]
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'  # Inclut tous les champs du modèle Service


# =================================================================
#  SERIALIZER 2 : Testimonial
# =================================================================
# Traduit les champs : id, client_name, role, content, rating, image
#
# GESTION DES IMAGES :
# Quand un champ est un ImageField, DRF génère automatiquement
# l'URL complète de l'image dans le JSON.
# Ex: "image": "http://127.0.0.1:8000/media/testimonials/client.jpg"
# React peut directement utiliser cette URL dans <img src={...} />
class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


# =================================================================
#  SERIALIZER 3 : ContactMessage
# =================================================================
# Ce serializer fonctionne dans les DEUX SENS :
#   - POST : React envoie {name, email, subject, message} → Django valide et sauvegarde
#   - GET  : Django retourne la liste des messages reçus (pour l'admin)
#
# La validation se fait automatiquement selon les règles du modèle :
#   - email : doit être un format email valide
#   - name  : ne peut pas dépasser 150 caractères
#   - Si une règle est violée, DRF retourne une erreur 400 avec le détail
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


# =================================================================
#  SERIALIZER 4 : Project (avec champ calculé personnalisé)
# =================================================================
# Ce serializer est plus avancé : il ajoute un champ "stack_array"
# qui n'existe PAS dans le modèle, mais qu'on calcule à la volée.
#
# POURQUOI ?
# Dans le modèle, stack = "React, Django, PostgreSQL" (texte brut)
# Mais React préfère travailler avec un tableau : ["React", "Django", "PostgreSQL"]
# On peut alors faire : stack_array.map(tech => <span>{tech}</span>)
class ProjectSerializer(serializers.ModelSerializer):
    # SerializerMethodField : champ calculé. Sa valeur est définie
    # par la méthode get_<nom_du_champ>() ci-dessous.
    stack_array = serializers.SerializerMethodField()

    class Meta:
        model = Project
        # '__all__' inclut les champs du modèle + notre champ calculé "stack_array"
        fields = '__all__'

    def get_stack_array(self, obj):
        """
        Convertit "React, Django, PostgreSQL" en ["React", "Django", "PostgreSQL"].
        - obj : l'instance du projet en cours de sérialisation
        - obj.stack : le texte "React, Django, PostgreSQL"
        - .split(',') : divise par les virgules → ["React", " Django", " PostgreSQL"]
        - .strip() : enlève les espaces → ["React", "Django", "PostgreSQL"]
        """
        return [tech.strip() for tech in obj.stack.split(',')] if obj.stack else []


# =================================================================
#  SERIALIZER 5 : Formation
# =================================================================
# Traduit : id, titre, details, image, order
class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = '__all__'


# =================================================================
#  SERIALIZER 6 : QuoteRequest (Demande de devis)
# =================================================================
# Fonctionne en POST : React envoie une demande de devis → Django sauvegarde
# et envoie un email de notification à l'admin (voir views.py)
class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = '__all__'


# =================================================================
#  SERIALIZER 7 : CompanyValue (Valeurs de l'entreprise)
# =================================================================
class CompanyValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyValue
        fields = '__all__'


# =================================================================
#  SERIALIZER 8 : HeroSlide (Slides du carrousel accueil)
# =================================================================
class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'


# =================================================================
#  SERIALIZER 9 : Partner (Partenaires)
# =================================================================
class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'


# =================================================================
#  SERIALIZER 10 : CompanyInfo (Informations globales)
# =================================================================
# React utilise ce serializer pour récupérer l'adresse, email, téléphone
# affichés dans le Footer et la page Contact.
# Exemple de JSON retourné :
# {
#   "address": "Kabondo Avenue Lac Rweru No7",
#   "email": "info@innotech.bi",
#   "phone": "+257 79 00 00 00",
#   "map_url": "https://www.google.com/maps/embed?..."
# }
class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'


# =================================================================
#  SERIALIZER 11 : NewsletterSubscriber
# =================================================================
# En écriture (POST) : React envoie {email} → Django vérifie l'unicité
# (unique=True dans le modèle) et sauvegarde ou retourne une erreur 400.
class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = '__all__'


# =================================================================
#  SERIALIZER 12 : BackgroundSection
# =================================================================
# Inclut les URL des fichiers vidéo et image de fond.
# React utilisera ces URL pour afficher la vidéo en arrière-plan.
class BackgroundSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundSection
        fields = '__all__'


# =================================================================
#  SERIALIZER 13 : TeamMember
# =================================================================
# Le JSON retourné à React ressemble à :
# {
#   "id": 1,
#   "name": "Marie Ndayishimiye",
#   "role": "CEO & Fondatrice",
#   "image": "http://127.0.0.1:8000/media/team/marie.jpg",  ← URL complète auto-générée
#   "bio": "Passionnée de technologie et d'innovation...",
#   "linkedin": "https://linkedin.com/in/marie",
#   "twitter": null,    ← null si non renseigné
#   "facebook": null
# }
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


# =================================================================
#  SERIALIZER 14 : ProcessStep
# =================================================================
class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = '__all__'


# =================================================================
#  SERIALIZER 15 : FAQ
# =================================================================
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
