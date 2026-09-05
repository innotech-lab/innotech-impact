"""
Amorce l'équipe à partir du procès-verbal du 22 août 2026.

    python manage.py shell < seed_team.py

Deux réserves, tirées du document lui-même :

  * Le PV ne donne que des prénoms. Les noms de famille sont à compléter dans
    l'admin (/admin/ → Membres de l'équipe) ; ils ne sont pas inventés ici.
  * Le poste « Responsable Finance & Administration » (Beoline & Stany) y est
    marqué « En attente », et non « Validé ». Il n'est donc pas publié : le
    site ne présentera pas comme acté ce que le PV signale comme ouvert.

Aucune photo n'existe dans le dépôt. Tant qu'aucune n'est versée par l'admin,
les cartes affichent les initiales — jamais un visage emprunté.

Le script est idempotent : relancé, il met à jour au lieu de dupliquer.
"""

from api.models import TeamMember

# (nom, rôle) — l'ordre reproduit celui du tableau d'attribution du PV.
ROSTER = [
    ("Deo", "Fondateur / Directeur Général"),
    ("Francis", "Directeur Technique"),
    ("Adinette", "Cheffe de projet / Coordination"),
    ("Alain", "Développement front-end & back-end"),
    ("Danny Eliel", "Design UI/UX"),
    ("Abigael", "Marketing & réseaux sociaux"),
    ("Dancile", "Marketing & réseaux sociaux"),
]

created = updated = 0
for name, role in ROSTER:
    member, is_new = TeamMember.objects.update_or_create(
        name=name,
        defaults={"role": role},
    )
    created += is_new
    updated += not is_new

print(f"Équipe : {created} créé(s), {updated} mis à jour, {len(ROSTER)} au total.")
print("À compléter dans l'admin : noms de famille, photos, liens LinkedIn.")
print("Non publié : Responsable Finance & Administration — « En attente » au PV.")
