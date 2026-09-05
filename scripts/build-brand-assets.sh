#!/usr/bin/env bash
#
# Régénère les actifs de marque à partir du logo d'origine.
#
# src/assets/Innotech.png est un export 1536x1024 sRGB SANS canal alpha : le fond
# #121312 est cuit dans l'image, ce qui la rendait illisible sur la navbar claire.
# Ce script détoure le dessin, reconstruit l'alpha, et produit les deux variantes
# positif/négatif du MÊME logo — le dessin n'est jamais modifié, seul le neutre
# blanc bascule en encre pour les surfaces claires.
#
#   bash scripts/build-brand-assets.sh
#
# Dépend d'ImageMagick (convert).

set -euo pipefail

SRC="brand/logo-source.png"
OUT="src/assets"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

INK="#101b1c"   # --ink, le neutre des surfaces claires
WIDTH=360       # 2x la plus grande taille d'affichage (pied de page, 170 px)

[ -f "$SRC" ] || { echo "introuvable : $SRC" >&2; exit 1; }

# 1. Détourer le fond sombre et ramener à la largeur cible.
convert "$SRC" -fuzz 15% -trim +repage -resize "${WIDTH}x" "$TMP/base.png"

# 2. Reconstruire l'alpha : le fond est quasi noir, les deux encres sont vives.
#    L'alpha suit le canal le plus lumineux, seuillé pour que le fond tombe à 0
#    sans grignoter les bords antialiasés du tracé.
convert "$TMP/base.png" -alpha set \
  -channel A -fx "min(1, max(max(u.r,u.g),u.b) * 4 - 0.4)" +channel \
  "$TMP/alpha.png"

# 3. Dépré-multiplier : les pixels de bord ont été assombris par le fond noir.
convert "$TMP/alpha.png" -channel RGB -fx "u / max(u.a, 0.02)" +channel "$TMP/dark.png"

# 4. Variante surfaces sombres — couleurs d'origine (vert + blanc).
convert "$TMP/dark.png" -strip -quality 94 -define webp:method=6 "$OUT/logo-innotech-dark.webp"

# 5. Variante surfaces claires — le vert est conservé, le neutre blanc passe en encre.
#    Masque de « verdeur » : g nettement au-dessus de la moyenne de r et b.
convert "$TMP/dark.png" -alpha extract "$TMP/mask-alpha.png"
convert "$TMP/dark.png" -alpha off -fx "(u.g - (u.r + u.b) / 2) > 0.10 ? 1 : 0" \
  -colorspace gray "$TMP/mask-green.png"

# Couche verte : le tracé vert d'origine, découpé par le masque de verdeur.
convert "$TMP/dark.png" \( "$TMP/mask-green.png" "$TMP/mask-alpha.png" \
  -compose Multiply -composite \) -compose CopyOpacity -composite "$TMP/layer-green.png"

# Couche encre : aplat --ink découpé par (alpha ET NON vert).
convert -size "$(identify -format '%wx%h' "$TMP/dark.png")" "xc:$INK" \
  \( "$TMP/mask-green.png" -negate "$TMP/mask-alpha.png" -compose Multiply -composite \) \
  -compose CopyOpacity -composite "$TMP/layer-ink.png"

convert "$TMP/layer-ink.png" "$TMP/layer-green.png" -compose Over -composite "$TMP/light.png"
convert "$TMP/light.png" -strip -quality 94 -define webp:method=6 "$OUT/logo-innotech-light.webp"

# 6. Icône iOS : la marque sur son fond d'origine, 180x180.
convert "$SRC" -crop 1536x620+0+40 +repage -fuzz 15% -trim +repage \
  -resize 148x148 -background "#0d1210" -gravity center -extent 180x180 \
  public/apple-touch-icon.png

echo "Actifs régénérés :"
ls -l "$OUT"/logo-innotech-*.webp public/apple-touch-icon.png |
  awk '{printf "  %8d  %s\n", $5, $9}'
