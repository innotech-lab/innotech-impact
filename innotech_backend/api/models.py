"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║          CHAPITRE 3 : LES MODÈLES (models.py) — La Carte du BD  ║
╚══════════════════════════════════════════════════════════════════╝

QU'EST-CE QU'UN MODÈLE ?
==========================
Un modèle Django est une classe Python qui représente une table
dans la base de données. C'est la "carte" de comment les données
sont organisées et stockées.

FLUX DE DONNÉES COMPLET :
  Admin entre des données → Sauvegardé en base SQLite (db.sqlite3)
  React demande des données → Django lit la BD → Serializer → JSON → React

CORRESPONDANCE MODÈLE ↔ TABLE SQL (conceptuel) :
  class Service(models.Model):
    title = models.CharField(...)     ←→   colonne TEXT "title"
    description = models.TextField() ←→   colonne TEXT "description"

Django génère automatiquement le SQL via la commande :
  python manage.py makemigrations  → Crée les fichiers de migration
  python manage.py migrate         → Applique les changements à la BD
"""

from django.db import models


# =================================================================
#  MODÈLE 1 : Service — Les services proposés par InnoTech
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/services/
# Affiché dans  : src/Components/Service/service.jsx
class Service(models.Model):
    # CharField : texte court (max 200 caractères)
    # verbose_name : le label qui s'affiche dans le panel /admin/
    title = models.CharField(max_length=200, verbose_name="Titre du service")

    # TextField : texte long (sans limite de caractères, idéal pour les descriptions)
    description = models.TextField(verbose_name="Description courte")

    # On stocke le SVG directement comme du texte HTML.
    # React l'affiche avec dangerouslySetInnerHTML={{ __html: service.icon_svg }}
    icon_svg = models.TextField(
        verbose_name="Code SVG de l'icône",
        help_text="Collez ici le code <svg>...</svg>"
    )

    # IntegerField : nombre entier. Permet de trier les services manuellement.
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        # Tri par défaut dans les requêtes QuerySet
        # ORDER BY order ASC, title ASC
        ordering = ['order', 'title']

    def __str__(self):
        # Ce qui s'affiche dans la liste du panel /admin/ et dans la console
        return self.title


# =================================================================
#  MODÈLE 2 : Testimonial — Les témoignages clients
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/testimonials/
# Affiché dans  : src/Components/Temoignage/temoignage.jsx
class Testimonial(models.Model):
    client_name = models.CharField(max_length=150, verbose_name="Nom du client")
    role = models.CharField(max_length=150, verbose_name="Poste / Entreprise")
    content = models.TextField(verbose_name="Témoignage")

    # Nombre entier entre 1 et 5 (pour les étoiles d'évaluation)
    rating = models.IntegerField(default=5, verbose_name="Note sur 5")

    # ImageField : un champ spécial pour uploader des fichiers images.
    # upload_to='testimonials/' → les images seront sauvegardées dans /media/testimonials/
    # blank=True, null=True → le champ est optionnel (pas obligatoire)
    image = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True,
        verbose_name="Photo de profil"
    )

    def __str__(self):
        return f"Témoignage de {self.client_name}"


# =================================================================
#  MODÈLE 3 : ContactMessage — Les messages du formulaire de contact
# =================================================================
# Accessible via : POST http://127.0.0.1:8000/api/contact/
# Utilisé dans  : src/page/Contact/contact.jsx & src/Components/Contact/contact.jsx
#
# CYCLE DE VIE D'UN MESSAGE DE CONTACT :
#   1. Visiteur remplit le formulaire React et clique "Envoyer"
#   2. React fait un POST /api/contact/ avec les données en JSON
#   3. Django reçoit la requête → valide les données → sauvegarde en BD
#   4. Django envoie une notification email à l'admin (views.py → perform_create)
#   5. L'admin peut voir tous les messages dans le panel /admin/
class ContactMessage(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nom complet")

    # EmailField : valide automatiquement le format email (xxx@xxx.xxx)
    email = models.EmailField(verbose_name="Adresse Email")

    subject = models.CharField(max_length=250, verbose_name="Sujet")
    message = models.TextField(verbose_name="Message")

    # auto_now_add=True : date remplie automatiquement à la création, non modifiable
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date d'envoi")

    class Meta:
        # Tri par date décroissante (le plus récent en premier dans l'admin)
        # Équivalent SQL : ORDER BY created_at DESC
        ordering = ['-created_at']

    def __str__(self):
        return f"Message de {self.name} - {self.subject}"


# =================================================================
#  MODÈLE 4 : Project — Les projets réalisés (Portfolio)
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/projects/
# Affiché dans  : src/page/Projects/Projects.jsx
class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre du projet")
    category = models.CharField(max_length=100, verbose_name="Catégorie")
    description = models.TextField(verbose_name="Description")
    challenge = models.TextField(verbose_name="Enjeu / Défi")
    result = models.TextField(verbose_name="Résultat")

    # On stocke les technologies sous forme de texte séparé par des virgules.
    # Ex: "React, Django, PostgreSQL"
    # Le serializer (ProjectSerializer) le convertit en tableau JSON ["React", "Django", ...]
    stack = models.CharField(max_length=250, verbose_name="Technologies utilisées")

    # L'image du projet. Les fichiers sont sauvegardés dans /media/projects/
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        verbose_name="Image du projet"
    )

    def __str__(self):
        return self.title


# =================================================================
#  MODÈLE 5 : Formation — Les formations proposées
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/formations/
# Affiché dans  : src/page/Formation/formation.jsx
class Formation(models.Model):
    titre = models.CharField(max_length=200, verbose_name="Titre de la formation")
    details = models.TextField(verbose_name="Détails de la formation")
    image = models.ImageField(
        upload_to='formations/',
        blank=True,
        null=True,
        verbose_name="Image de la formation"
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'titre']

    def __str__(self):
        return self.titre


# =================================================================
#  MODÈLE 6 : QuoteRequest — Les demandes de devis
# =================================================================
# Accessible via : POST http://127.0.0.1:8000/api/quotes/
# Utilisé dans  : src/page/Devis/Devis.jsx
class QuoteRequest(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nom complet")
    email = models.EmailField(verbose_name="Adresse Email")
    service = models.CharField(max_length=100, verbose_name="Service souhaité")
    message = models.TextField(verbose_name="Détails du projet")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de la demande")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Devis pour {self.name} ({self.service})"


# =================================================================
#  MODÈLE 7 : CompanyValue — Les valeurs de l'entreprise
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/company-values/
# Affiché dans  : src/page/DetailAbout/DetailAbout.jsx
class CompanyValue(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titre (ex: Notre Mission)")
    description = models.TextField(verbose_name="Description")

    # Nom de l'icône de la bibliothèque lucide-react (ex: "Target", "Eye", "Heart")
    icon_name = models.CharField(
        max_length=50,
        verbose_name="Nom de l'icône (lucide-react)",
        help_text="Ex: Target, Eye, Heart"
    )
    image = models.ImageField(
        upload_to='company/',
        blank=True,
        null=True,
        verbose_name="Image de fond"
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


# =================================================================
#  MODÈLE 8 : HeroSlide — Les slides du carrousel d'accueil
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/hero-slides/
# Affiché dans  : src/Components/Home/home.jsx
class HeroSlide(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre principal")
    subtitle = models.TextField(verbose_name="Sous-titre")
    image = models.ImageField(upload_to='hero/', verbose_name="Image de fond")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


# =================================================================
#  MODÈLE 9 : Partner — Les logos des partenaires
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/partners/
# Affiché dans  : src/Components/Section/section.jsx
class Partner(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom du partenaire")
    logo = models.ImageField(
        upload_to='partners/',
        blank=True,
        null=True,
        verbose_name="Logo du partenaire"
    )
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


# =================================================================
#  MODÈLE 10 : CompanyInfo — Informations globales de l'entreprise
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/company-info/
# Utilisé dans  : src/page/Contact/contact.jsx, src/Components/Footer/footer.jsx
#
# ℹ️ Ce modèle est un SINGLETON : on ne crée qu'UNE SEULE instance.
# Toutes les infos de contact (téléphone, email, adresse) se trouvent ici.
# L'admin les modifie en un seul endroit, et tout le site se met à jour.
class CompanyInfo(models.Model):
    # --- Statistiques de la page À Propos ---
    stats_projects = models.IntegerField(default=0, verbose_name="Projets accompagnés")
    stats_sectors = models.IntegerField(default=0, verbose_name="Secteurs couverts")
    stats_satisfaction = models.IntegerField(default=100, verbose_name="% de clients satisfaits")

    # --- Informations de contact (affichées dans le Footer et la page Contact) ---
    address = models.CharField(max_length=200, default="Kabondo Avenue Lac Rweru No7")
    email = models.EmailField(default="info@innotech.bi")
    phone = models.CharField(max_length=50, default="+257 000 000")

    # --- Contenu de la section "À Propos" ---
    about_title = models.CharField(max_length=200, default="QUI SOMMES-NOUS?", verbose_name="Titre À Propos")
    about_description = models.TextField(
        default="Innotech Impact est une entreprise technologique pionnière...",
        verbose_name="Texte À Propos"
    )
    about_image = models.ImageField(
        upload_to='about/',
        blank=True,
        null=True,
        verbose_name="Image À Propos"
    )

    # L'URL iframe de Google Maps (le lien "Intégrer une carte" de Google Maps)
    map_url = models.TextField(
        blank=True,
        null=True,
        verbose_name="Lien Embed Google Maps",
        help_text="Collez ici le lien src de l'iframe Google Maps"
    )

    class Meta:
        verbose_name = "Information de l'entreprise"
        verbose_name_plural = "Informations de l'entreprise"

    def __str__(self):
        return "Informations Globales"


# =================================================================
#  MODÈLE 11 : NewsletterSubscriber — Les abonnés à la newsletter
# =================================================================
# Accessible via : POST http://127.0.0.1:8000/api/newsletter/
class NewsletterSubscriber(models.Model):
    # unique=True → Django refusera deux abonnements avec le même email
    email = models.EmailField(unique=True, verbose_name="Email de l'abonné")
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


# =================================================================
#  MODÈLE 12 : BackgroundSection — La section vidéo/image de fond
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/background-section/
# Affiché dans  : src/Components/Background/background.jsx
class BackgroundSection(models.Model):
    title = models.CharField(max_length=200, default="Innovation For The Future")
    description = models.TextField(
        default="Innotech Impact empowers businesses through modern technology..."
    )
    button_text = models.CharField(max_length=50, default="Discover More")

    # Deux types de médias possibles : image statique OU vidéo
    background_image = models.ImageField(
        upload_to='backgrounds/',
        blank=True,
        null=True,
        verbose_name="Image de fond"
    )
    # FileField : comme ImageField mais accepte tous les types de fichiers
    video_file = models.FileField(
        upload_to='videos/',
        blank=True,
        null=True,
        verbose_name="Vidéo de présentation"
    )

    class Meta:
        verbose_name = "Section Background"
        verbose_name_plural = "Sections Background"

    def __str__(self):
        return "Configuration Background"


# =================================================================
#  MODÈLE 13 : TeamMember — Les membres de l'équipe
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/team-members/
# Affiché dans  : src/Components/Team/team.jsx
class TeamMember(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom complet")
    role = models.CharField(max_length=100, verbose_name="Poste / Rôle")
    image = models.ImageField(
        upload_to='team/',
        blank=True,
        null=True,
        verbose_name="Photo de profil"
    )
    # blank=True → le champ peut être vide dans les formulaires admin
    bio = models.TextField(blank=True, verbose_name="Biographie courte")

    # URLField : valide automatiquement que la valeur est une URL valide
    # null=True → la valeur peut être NULL en base de données (non obligatoire)
    linkedin = models.URLField(blank=True, null=True, verbose_name="Lien LinkedIn")
    twitter = models.URLField(blank=True, null=True, verbose_name="Lien Twitter")
    facebook = models.URLField(blank=True, null=True, verbose_name="Lien Facebook")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Membre de l'équipe"
        verbose_name_plural = "Membres de l'équipe"
        ordering = ['created_at']  # Ordre d'ajout chronologique

    def __str__(self):
        return f"{self.name} - {self.role}"


# =================================================================
#  MODÈLE 14 : ProcessStep — Les étapes de collaboration
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/process-steps/
# Affiché dans  : src/page/DetailService/DetailService.jsx
class ProcessStep(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titre de l'étape")
    description = models.TextField(verbose_name="Description")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order']
        verbose_name = "Étape de collaboration"
        verbose_name_plural = "Étapes de collaboration"

    def __str__(self):
        return self.title


# =================================================================
#  MODÈLE 15 : FAQ — Questions fréquemment posées
# =================================================================
# Accessible via : GET http://127.0.0.1:8000/api/faqs/
# Affiché dans  : src/page/DetailService/DetailService.jsx
class FAQ(models.Model):
    question = models.CharField(max_length=255, verbose_name="Question")
    answer = models.TextField(verbose_name="Réponse")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question
