"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║       CHAPITRE 9 : admin.py — L'Interface de Gestion            ║
║               "Le Cockpit de l'Administrateur"                   ║
╚══════════════════════════════════════════════════════════════════╝

POURQUOI admin.py EST CRUCIAL DANS CETTE ARCHITECTURE ?
=========================================================
Dans une architecture découplée Django + React, l'admin Django
joue un rôle central : c'est LUI qui permet de gérer le contenu
affiché sur le site React, SANS écrire une seule ligne de code.

CYCLE DE VIE DU CONTENU :
  1. Admin ouvre   http://127.0.0.1:8000/admin/
  2. Admin ajoute  un nouveau membre d'équipe (nom, photo, rôle)
  3. Django        sauvegarde en base de données (db.sqlite3)
  4. React appelle GET /api/team-members/
  5. Django        lit la BD et retourne le JSON
  6. React         affiche automatiquement le nouveau membre ✅

SANS admin.py : Les modèles ne seraient PAS visibles dans le panel.
AVEC admin.py : Chaque modèle a son interface CRUD personnalisée.

FONCTIONNALITÉS UTILISÉES :
  - list_display   : colonnes visibles dans le tableau de liste
  - list_editable  : colonnes modifiables directement dans le tableau
  - list_filter    : filtres latéraux (ex: filtrer par catégorie)
  - search_fields  : barre de recherche en haut du tableau
  - readonly_fields: champs en lecture seule (pour les données sensibles)
"""

from django.contrib import admin
from .models import (
    Service, Testimonial, ContactMessage, Project, Formation,
    QuoteRequest, CompanyValue, HeroSlide, Partner, CompanyInfo,
    NewsletterSubscriber, BackgroundSection, TeamMember, ProcessStep, FAQ
)


# =================================================================
#  ADMIN 1 : Service
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/service/
#
# @admin.register(Service) : décorateur qui remplace admin.site.register(Service, ServiceAdmin)
# C'est une écriture plus moderne et plus lisible.
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    # Colonnes affichées dans le tableau de liste des services
    list_display = ('title', 'order')
    # list_editable : modifie la colonne 'order' DIRECTEMENT dans la liste
    # sans avoir à ouvrir chaque service. Très pratique pour réordonner.
    list_editable = ('order',)


# =================================================================
#  ADMIN 2 : Testimonial (Témoignages)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/testimonial/
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    # Affiche le nom, le poste et la note dans la liste
    list_display = ('client_name', 'role', 'rating')


# =================================================================
#  ADMIN 3 : ContactMessage (Messages de contact reçus)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/contactmessage/
#
# Les messages de contact sont en LECTURE SEULE.
# On ne veut pas qu'un admin puisse modifier rétroactivement les messages.
# C'est une bonne pratique pour garder l'intégrité des données.
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    # Tous les champs sont en lecture seule : on peut voir mais pas modifier.
    # Cela protège l'intégrité des messages reçus.
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')


# =================================================================
#  ADMIN 4 : Project (Projets du portfolio)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/project/
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    # list_filter : ajoute un panneau latéral de filtrage par catégorie
    # Très utile quand on a beaucoup de projets.
    list_filter = ('category',)


# =================================================================
#  ADMIN 5 : Formation
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/formation/
@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('titre', 'order')
    list_editable = ('order',)  # Permet de réordonner les formations facilement


# =================================================================
#  ADMIN 6 : QuoteRequest (Demandes de devis)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/quoterequest/
#
# Même principe que ContactMessage : lecture seule pour préserver
# l'intégrité des demandes reçues des clients.
@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'created_at')
    readonly_fields = ('name', 'email', 'service', 'message', 'created_at')


# =================================================================
#  ADMIN 7 : CompanyValue (Valeurs de l'entreprise)
# =================================================================
@admin.register(CompanyValue)
class CompanyValueAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order')
    list_editable = ('order',)


# =================================================================
#  ADMIN 8 : HeroSlide (Slides du carrousel d'accueil)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/heroslide/
#
# IMPORTANT POUR LE FONCTIONNEMENT DU SITE :
# C'est ici que l'admin upload les images de fond du carrousel.
# L'ordre détermine quelle slide s'affiche en premier.
@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)  # Glisser-déposer de l'ordre via l'interface


# =================================================================
#  ADMIN 9 : Partner (Logos des partenaires)
# =================================================================
@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)


# =================================================================
#  ADMIN 10 : CompanyInfo (Informations globales de l'entreprise)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/companyinfo/
#
# SINGLETON : Il ne doit y avoir qu'UNE SEULE entrée ici.
# C'est la source de vérité pour le numéro de téléphone, l'email,
# l'adresse qui s'affichent dans le Footer et la page Contact.
# Modifier ici → tout le site React se met à jour automatiquement.
@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    # __str__ affiche "Informations Globales" (défini dans le modèle)
    list_display = ('__str__', 'stats_projects', 'email', 'phone')


# =================================================================
#  ADMIN 11 : NewsletterSubscriber
# =================================================================
@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')


# =================================================================
#  ADMIN 12 : BackgroundSection (Section vidéo/image de fond)
# =================================================================
@admin.register(BackgroundSection)
class BackgroundSectionAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'title')


# =================================================================
#  ADMIN 13 : TeamMember (Membres de l'équipe)
# =================================================================
# Interface : http://127.0.0.1:8000/admin/api/teammember/
#
# C'est ici que l'admin ajoute les membres de l'équipe.
# Chaque ajout ici → apparaît automatiquement sur le site React
# dans la section "Notre Équipe" sans aucun déploiement.
@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'created_at')
    # search_fields : active une barre de recherche dans le panel admin
    # pour trouver rapidement un membre par nom ou rôle
    search_fields = ('name', 'role')


# =================================================================
#  ADMIN 14 : ProcessStep
# =================================================================
@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)


# =================================================================
#  ADMIN 15 : FAQ
# =================================================================
@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    list_editable = ('order',)
