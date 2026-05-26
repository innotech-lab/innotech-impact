"""
╔══════════════════════════════════════════════════════════════════╗
║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
║              CHAPITRE 2 : LE ROUTEUR PRINCIPAL (urls.py)        ║
╚══════════════════════════════════════════════════════════════════╝

CE FICHIER EST L'ENTRÉE PRINCIPALE DE TOUTES LES REQUÊTES HTTP.
Quand React fait une requête vers http://127.0.0.1:8000/...,
Django lit ce fichier en premier pour décider quoi faire.

ANALOGIE : C'est comme le standard téléphonique d'une entreprise.
Quand quelqu'un appelle (requête HTTP), le standard (ce fichier)
dirige l'appel vers le bon département (admin, api...).

LISTE COMPLÈTE DES ROUTES DISPONIBLES :
  GET  http://127.0.0.1:8000/admin/                    → Panel d'administration Django
  GET  http://127.0.0.1:8000/api/services/             → Liste de tous les services
  GET  http://127.0.0.1:8000/api/team-members/         → Liste de l'équipe
  GET  http://127.0.0.1:8000/api/company-info/         → Infos entreprise (contact, adresse...)
  POST http://127.0.0.1:8000/api/contact/              → Envoyer un message de contact
  GET  http://127.0.0.1:8000/media/team/photo.jpg      → Afficher une image uploadée
  (... et toutes les autres routes définies dans api/urls.py)
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    # ─────────────────────────────────────────────────────────────
    # ROUTE 1 : Le Panel d'Administration de Django
    # ─────────────────────────────────────────────────────────────
    # Accès : http://127.0.0.1:8000/admin/
    # C'est une interface web automatique générée par Django.
    # Elle permet à l'admin de créer, lire, modifier, supprimer
    # toutes les données (services, équipe, projets...) sans coder.
    # C'est ici qu'on ajoute le contenu qui sera affiché sur le site React.
    path('admin/', admin.site.urls),

    # ─────────────────────────────────────────────────────────────
    # ROUTE 2 : Toutes les routes de l'API REST
    # ─────────────────────────────────────────────────────────────
    # Accès : http://127.0.0.1:8000/api/...
    # 
    # La fonction include() "délègue" la gestion des URLs à un autre fichier.
    # Ici, toute requête commençant par /api/ est envoyée vers api/urls.py
    # qui contient le détail de chaque route (/services/, /contact/, etc.)
    #
    # FLUX D'UNE REQUÊTE REACT :
    #   React → fetch('/api/services/')
    #         → Django lit ce fichier → voit 'api/'
    #         → Délègue à api/urls.py → trouve 'services/'
    #         → Appelle ServiceViewSet
    #         → Retourne le JSON des services à React
    path('api/', include('api.urls')),

]

# =================================================================
#   SERVIR LES IMAGES EN MODE DÉVELOPPEMENT
# =================================================================
# En développement (DEBUG=True), Django peut servir directement
# les fichiers images uploadés par l'admin (photos d'équipe, projets...).
#
# COMMENT ÇA MARCHE :
#   1. Admin uploade "photo.jpg" via /admin/ → sauvegardé dans /media/team/photo.jpg
#   2. Django stocke le chemin 'team/photo.jpg' en base de données
#   3. Le serializer retourne : "image": "http://127.0.0.1:8000/media/team/photo.jpg"
#   4. React affiche l'image avec <img src={member.image} />
#
# ⚠️ En production, cette tâche est confiée à un serveur web dédié
# comme Nginx ou à un service de stockage cloud (AWS S3, Cloudinary).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
