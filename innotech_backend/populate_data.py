import os
import django

# Configuration de l'environnement Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core_project.settings')
django.setup()

from api.models import (
    Service, Testimonial, Project, Formation, CompanyValue, 
    HeroSlide, Partner, CompanyInfo, BackgroundSection, 
    TeamMember, ProcessStep, FAQ
)

def populate():
    print("--- Debut du peuplement complet de la base de donnees ---")

    # 1. CompanyInfo (Singleton)
    info, created = CompanyInfo.objects.get_or_create(id=1)
    info.about_title = "NOTRE HISTOIRE & VISION"
    info.about_description = (
        "INNOTECH IMPACT est une force motrice de l'innovation technologique au Burundi. "
        "Depuis notre fondation à Gitega, nous nous sommes donnés pour mission de briser "
        "les barrières numériques et d'offrir des solutions de pointe accessibles à tous."
    )
    info.stats_projects = 150
    info.stats_sectors = 12
    info.stats_satisfaction = 98
    info.address = "Kabondo Avenue Lac Rweru No7, Bujumbura"
    info.email = "info@innotech.bi"
    info.phone = "+257 79 00 00 00"
    info.save()
    print("CompanyInfo OK")

    # 2. Services
    services_data = [
        {"title": "Développement Web", "description": "Sites vitrines, E-commerce et plateformes SaaS sur mesure.", "icon_svg": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', "order": 1},
        {"title": "Mobile App", "description": "Applications mobiles natives et hybrides (iOS & Android).", "icon_svg": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>', "order": 2},
        {"title": "Design UI/UX", "description": "Interfaces modernes et expériences utilisateurs optimisées.", "icon_svg": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.5 1.5"></path><path d="M7 11l-4-4"></path><path d="M11 7L7 3"></path></svg>', "order": 3},
    ]
    for s in services_data:
        Service.objects.get_or_create(title=s['title'], defaults=s)
    print("Services OK")

    # 3. Hero Slides
    slides_data = [
        {"title": "Innover pour le Burundi", "subtitle": "Nous transformons vos idées en solutions numériques percutantes.", "order": 1},
        {"title": "Expertise Technologique", "subtitle": "Une équipe dédiée à votre transformation digitale.", "order": 2},
    ]
    for slide in slides_data:
        HeroSlide.objects.get_or_create(title=slide['title'], defaults=slide)
    print("Hero Slides OK")

    # 4. Team Members
    team_data = [
        {"name": "Jean Ndayishimiye", "role": "CEO & Fondateur", "bio": "Expert en stratégie digitale avec 10 ans d'expérience."},
        {"name": "Aline Kaneza", "role": "Lead Développeuse", "bio": "Passionnée par le code propre et les architectures scalables."},
        {"name": "Marc Irakoze", "role": "UX Designer", "bio": "Crée des expériences qui captivent et fidélisent."},
    ]
    for member in team_data:
        TeamMember.objects.get_or_create(name=member['name'], defaults=member)
    print("Team OK")

    # 5. Projects
    projects_data = [
        {"title": "Eco-Shop Burundi", "category": "E-commerce", "description": "Plateforme de vente en ligne de produits locaux.", "challenge": "Digitaliser le commerce local.", "result": "Plus de 50 commerçants inscrits.", "stack": "React, Django, PostgreSQL"},
        {"title": "Gitega Health App", "category": "Mobile", "description": "Application de suivi médical pour les zones rurales.", "challenge": "Accessibilité aux soins.", "result": "Utilisée par 10 centres de santé.", "stack": "React Native, Firebase"},
    ]
    for p in projects_data:
        Project.objects.get_or_create(title=p['title'], defaults=p)
    print("Projects OK")

    # 6. Testimonials
    testimonials_data = [
        {"client_name": "Samuel Nizigiyimana", "role": "Directeur, Gitega Tech", "content": "Un service exceptionnel et une équipe très réactive. Je recommande !", "rating": 5},
        {"client_name": "Espérance Mutoni", "role": "Fondatrice, Agri-Shop", "content": "Innotech a transformé notre façon de travailler grâce à leur solution sur mesure.", "rating": 5},
    ]
    for t in testimonials_data:
        Testimonial.objects.get_or_create(client_name=t['client_name'], defaults=t)
    print("Testimonials OK")

    # 7. Formations
    formations_data = [
        {"titre": "Développement Fullstack", "details": "Apprenez à créer des applications web complètes avec React et Django.", "order": 1},
        {"titre": "Design UI/UX Moderne", "details": "Maîtrisez Figma et les principes de l'ergonomie web.", "order": 2},
    ]
    for f in formations_data:
        Formation.objects.get_or_create(titre=f['titre'], defaults=f)
    print("Formations OK")

    # 8. Partners
    partners_data = [
        {"name": "Google for Startups", "order": 1},
        {"name": "Burundi Tech Hub", "order": 2},
        {"name": "UNDP Burundi", "order": 3},
    ]
    for partner in partners_data:
        Partner.objects.get_or_create(name=partner['name'], defaults=partner)
    print("Partners OK")

    # 9. Background Section
    bg, created = BackgroundSection.objects.get_or_create(id=1)
    bg.title = "Prêt à lancer votre projet ?"
    bg.description = "Contactez-nous dès aujourd'hui pour une consultation gratuite et donnez vie à vos idées."
    bg.save()
    print("Background Section OK")

    # 10. Process Steps
    steps_data = [
        {"title": "Cadrage", "description": "Ateliers pour comprendre le contexte, les objectifs et les priorites.", "order": 1},
        {"title": "Conception", "description": "Prototype, architecture et plan d'execution avec jalons de livraison.", "order": 2},
        {"title": "Production", "description": "Developpement agile, tests qualite et iterations rapides.", "order": 3},
        {"title": "Evolution", "description": "Mesure des resultats, optimisation continue et support post-lancement.", "order": 4},
    ]
    for step in steps_data:
        ProcessStep.objects.get_or_create(title=step['title'], defaults=step)
    print("Process Steps OK")

    # 11. FAQs
    faqs_data = [
        {"question": "En combien de temps un projet peut demarrer ?", "answer": "En général, le cadrage initial prend entre 3 et 7 jours.", "order": 1},
        {"question": "Proposez-vous un accompagnement après livraison ?", "answer": "Oui, nous proposons une maintenance évolutive et un support technique.", "order": 2},
    ]
    for faq in faqs_data:
        FAQ.objects.get_or_create(question=faq['question'], defaults=faq)
    print("FAQs OK")

    print("--- Fin du peuplement complet ---")

if __name__ == "__main__":
    populate()
