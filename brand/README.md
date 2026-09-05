# Master de marque

`logo-source.png` est l'export d'origine du logo Innotech Impact : 1536×1024,
sRGB, **sans canal alpha** — le fond `#121312` est cuit dans l'image.

Il n'est jamais importé par l'application et ne part donc pas dans le bundle.
C'est la source dont `scripts/build-brand-assets.sh` dérive les actifs livrés :

- `src/assets/logo-innotech-light.webp` — pour les surfaces claires (navbar) ;
  le vert d'origine est conservé, le neutre blanc passe en `--ink`.
- `src/assets/logo-innotech-dark.webp` — pour les surfaces sombres (pied de page) ;
  couleurs d'origine.
- `public/apple-touch-icon.png` — la marque sur son fond d'origine, 180×180.

`public/favicon.svg` est tracé à la main d'après la marque et n'est pas généré
par le script.

Régénérer : `bash scripts/build-brand-assets.sh` (nécessite ImageMagick).
