# Mise à niveau UI/UX & performance — Innotech Impact

> **Pour un exécutant agentique :** ce plan se suit tâche par tâche. Les étapes utilisent des cases à cocher (`- [ ]`).

**Objectif :** corriger les 17 constats du relevé technique du 1er septembre 2026 et faire passer le site de 11/20 à un niveau publiable, sans changer la direction visuelle ni inventer de contenu.

**Architecture :** refonte ciblée, pas de refonte visuelle. On garde le monde visuel de `DESIGN.md` (Playfair / Manrope / DM Mono, encre + papier + signal vert) et l'ossature des composants. Trois axes : (1) livraison des actifs, (2) trous dans la cascade CSS et les tokens, (3) manques structurels de l'application React (404, métadonnées, défilement, accessibilité des formulaires).

**Stack :** React 19.2, React Router 7.14, Vite 8.0, lucide-react. Aucune dépendance nouvelle.

**Spec :** relevé technique publié le 2026-09-01 (artifact `a6ca8cec`), résumé dans `docs/superpowers/plans/` ci-dessous par le tableau de correspondance.

## Contraintes globales

Copiées de `PRODUCT.md` et `DESIGN.md` — elles s'appliquent à **toutes** les tâches :

- **Le logo Innotech Impact existant est préservé.** On corrige sa livraison (poids, résolution, fond), jamais son dessin.
- **Aucune preuve inventée.** Pas de témoignage, de logo client, de métrique, de prix ni de calendrier ajouté. Les mentions « à confirmer » de `/projects` et `/formation` restent.
- **Français d'abord**, langue simple. Tout texte visible et tout message d'erreur en français.
- **Cible WCAG 2.2 AA.** Contraste texte ≥ 4,5:1, contraste des limites de contrôles ≥ 3:1, cibles ≥ 24×24 px.
- **`prefers-reduced-motion` respecté** par toute animation, ancienne ou nouvelle.
- **Réutiliser les tokens et les classes sémantiques** de `src/index.css`. Un nouveau token n'est introduit que s'il a un rôle sémantique défini.
- **Pas de dépendance ajoutée.** Le bundle applicatif est déjà bon (82,5 kB gzip) ; il ne doit pas grossir.

## Pas de suite de tests — ce qui en tient lieu

Le dépôt n'a **aucun framework de test** et ce plan n'en introduit pas (hors périmètre). La boucle de vérification est un harnais de mesure, `scripts/verify-ui.mjs`, construit en tâche 0 et relancé après chaque tâche. Il rejoue exactement les mesures du relevé : poids réseau, géométrie calculée, contrastes, débordement. Chaque tâche ci-dessous se termine par une assertion chiffrée, pas par une impression.

Commandes de référence, utilisées partout :

```bash
npm run build          # doit rester sans erreur
npx eslint .           # doit rester à 0 erreur
npm run verify         # harnais de mesure (tâche 0)
```

---

## Correspondance constats → tâches

| # | Constat | Sév. | Tâche |
|---|---|---|---|
| 01 | Favicon 1,37 Mo, MIME invalide | P0 | 1 |
| 02 | Logo 315 kB, sans alpha, rectangle noir | P0 | 1 |
| 03 | `.page-hero h1` non stylé (6 pages) | P1 | 2 |
| 04 | Bande signal rognée de 27,9 px | P1 | 2 |
| 05 | `--lime-deep` à 3,45:1 | P1 | 3 |
| 06 | Bordures de champs à 1,34:1 | P1 | 3 |
| 07 | Aucune route 404 | P1 | 5 |
| 08 | Titre/description/OG uniques | P1 | 5 |
| 09 | Polices en `@import`, cascade de 3 requêtes | P2 | 4 |
| 10 | Bundle unique, images PNG non différées | P2 | 4 |
| 11 | `aria-label` sur `<div>` sans rôle | P2 | 6 |
| 12 | Cibles tactiles à 20 px | P2 | 6 |
| 13 | Pas de remise à zéro du défilement | P2 | 5 |
| 14 | Champs obligatoires non signalés | P2 | 7 |
| 15 | ~40 % de `src/` mort | P3 | 8 |
| 16 | 5,4 Mo d'images inutilisées dans `public/` | P3 | 1, 8 |
| 17 | Code compacté sur une ligne | P3 | 8 |

---

## Structure des fichiers

**Créés**

- `scripts/verify-ui.mjs` — harnais de mesure (poids, géométrie, contraste, débordement). Responsabilité unique : mesurer, n'écrit jamais dans `src/`.
- `src/Components/PageMeta/PageMeta.jsx` — pose `<title>`, `<meta name="description">` et les balises `og:`/`twitter:` pour la route courante. Aucun style.
- `src/Components/ScrollToTop/ScrollToTop.jsx` — remet le défilement en haut au changement de `pathname`.
- `src/page/NotFound/NotFound.jsx` — page 404 réelle, réutilise `page-hero` et `.button`.
- `src/assets/logo-innotech-dark.webp` — logo sur fond transparent, variante pour surfaces sombres.
- `src/assets/logo-innotech-light.webp` — même logo, neutre recoloré en encre, pour surfaces claires.
- `public/favicon.svg` — remplacé : le triangle Innotech, pas le SVG violet du gabarit.
- `public/apple-touch-icon.png` — 180×180.
- `public/robots.txt`, `public/sitemap.xml`.

**Modifiés**

- `index.html` — favicon, `preconnect` + `<link>` polices, métadonnées OG par défaut.
- `src/index.css` — `.page-hero h1`, `--lime-deep`, `--line-input`, retrait de l'`@import` polices, cibles tactiles.
- `src/App.jsx` — `React.lazy` par route, `ScrollToTop`, route `*`.
- `src/Components/Home/home.{jsx,css}` — retrait du rognage, rôle de liste sur la bande signal, `fetchpriority` sur le héros.
- `src/Components/Navbar/navbar.{jsx,css}` — logo, `aria-controls`, fermeture au clavier.
- `src/Components/Footer/footer.{jsx,css}` — logo.
- `src/page/*/*.jsx` — `PageMeta`, rôles ARIA, accessibilité des formulaires, images différées.
- `package.json` — retrait de deux dépendances, script `verify`.

**Supprimés** (tous suivis par git, donc récupérables)

- `src/Components/{About,Blog,Contact,Section,Service,Temoignage,Background}/` — 7 composants jamais importés.
- `src/page/{Projects,Portfolio,DetailAbout,DetailService,Formation,Contact,Devis}/*.css` — 7 feuilles jamais importées.
- `public/{TECH.png,Logor.png,contact-bg.png,icons.svg}` — 5,4 Mo jamais référencés (hors favicon cassé).

**Laissé en place, signalé**

- `Innotech-main/` — 73 fichiers suivis, copie de la version précédente du site. N'affecte pas le build. Le supprimer est une décision de l'équipe, pas une correction technique ; à trancher hors de ce plan.

---

### Tâche 0 : harnais de mesure

**Fichiers**
- Créer : `scripts/verify-ui.mjs`
- Modifier : `package.json` (script `verify`)

**Interfaces**
- Produit : `npm run verify`, qui écrit un rapport texte et sort en code 1 si une assertion échoue. Toutes les tâches suivantes s'appuient dessus.

- [ ] **Étape 1 : écrire le harnais.** Il lance `vite preview`, ouvre Chrome headless sur les 8 routes en 1440×900 et 390×844, injecte une sonde qui relève `performance.getEntriesByType('resource')`, `getComputedStyle` sur les `h1`/`h2`, `getBoundingClientRect` sur `.landing-hero` / `.signal-strip` / les cibles interactives, et `scrollWidth` vs `clientWidth`. Il calcule aussi les contrastes WCAG des paires de tokens de `src/index.css`.

- [ ] **Étape 2 : le lancer sur le code actuel.** Attendu : il reproduit le relevé — poids accueil ≈ 1 838 kB, `h1` de /projects en Manrope 32 px, rognage 27,9 px, `--lime-deep` à 3,45:1. S'il ne reproduit pas ces valeurs, c'est le harnais qui est faux, pas le site.

- [ ] **Étape 3 : figer les seuils.** Poids accueil < 300 kB ; aucun `h1` plus petit que le `h2` qui le suit ; rognage = 0 ; tous les contrastes texte ≥ 4,5:1 ; bordures de contrôles ≥ 3:1 ; aucun débordement horizontal ; aucune cible interactive < 24 px. Le harnais doit échouer maintenant sur six de ces sept seuils.

---

### Tâche 1 : actifs de marque — logo et favicon (constats 01, 02, 16)

**Fichiers**
- Créer : `src/assets/logo-innotech-dark.webp`, `src/assets/logo-innotech-light.webp`, `public/favicon.svg`, `public/apple-touch-icon.png`
- Modifier : `index.html:5`, `src/Components/Navbar/navbar.jsx`, `src/Components/Navbar/navbar.css`, `src/Components/Footer/footer.jsx`, `src/Components/Footer/footer.css`
- Supprimer : `public/TECH.png`, `public/Logor.png`, `public/contact-bg.png`, `public/icons.svg`, `src/assets/Innotech.png`

**Interfaces**
- Produit : deux imports de logo, `logoLight` (encre, pour la navbar papier) et `logoDark` (blanc + vert, pour le pied de page nuit).

- [ ] **Étape 1 : détourer le logo.** `src/assets/Innotech.png` est en 1536×1024 sRGB **sans canal alpha** ; le fond `#121312` est cuit dans l'image. Le dessin réel est un triangle vert `#88AE29` contenant une barre verticale, sous lequel se lisent « INNOTECH » (vert) « IMPACT » (blanc) et « INNOVATION POUR TOUS » (blanc). Recadrer sur le dessin, construire le canal alpha à partir de la luminance, exporter à 2× la taille d'affichage (≈ 320 px de large).

- [ ] **Étape 2 : produire les deux variantes.** `logo-innotech-dark.webp` garde les couleurs d'origine. `logo-innotech-light.webp` remplace le neutre blanc par `--ink` (#101b1c) et conserve le vert — c'est une déclinaison positif/négatif du même logo, pas un nouveau dessin. **Regarder les deux fichiers** avant de continuer : si le détourage laisse un halo, ajuster le seuil plutôt que d'accepter le résultat.

- [ ] **Étape 3 : corriger le cadrage CSS.** `.brand img` impose aujourd'hui `9.8rem × 3.1rem`, soit un rapport 3,14:1 pour une image en 1,5:1 — d'où le letterboxing. Régler la hauteur et laisser la largeur suivre le rapport réel.

- [ ] **Étape 4 : refaire le favicon.** Écrire `public/favicon.svg` à partir du triangle Innotech (le SVG violet actuel est un reste de gabarit et n'a rien à voir avec la marque), générer `apple-touch-icon.png` en 180×180, et remplacer dans `index.html` :

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

- [ ] **Étape 5 : mesurer.** `npm run build && npm run verify`. Attendu : poids accueil sous 200 kB, plus aucune ressource au-dessus de 100 kB, `dist/` allégé de 5,4 Mo.

---

### Tâche 2 : trous dans la cascade CSS (constats 03, 04)

**Fichiers**
- Modifier : `src/index.css` (sélecteur des titres), `src/Components/Home/home.css` (`.landing-hero`)

- [ ] **Étape 1 : rendre le `h1` des pages dominant.** Le sélecteur `.section-head h2, .page-intro h1` oublie `.page-hero h1`, qui retombe donc sur le style navigateur (Manrope 32 px) alors que le `h2` en dessous est en Playfair 72 px. Ajouter `.page-hero h1` à la liste, puis vérifier que sa taille reste **inférieure** à celle du `h1` d'accueil pour que l'accueil garde le dessus dans la hiérarchie du site.

- [ ] **Étape 2 : arrêter de rogner la bande signal.** `.landing-hero{overflow:hidden}` coupe les 27,9 px de `.signal-strip{transform:translateY(50%)}`. Retirer `overflow:hidden` de la section et le porter sur `.landing-hero__image`, qui est le seul enfant qui a réellement besoin d'un découpage (le zoom de l'image).

- [ ] **Étape 3 : mesurer.** `npm run verify`. Attendu : rognage = 0 px ; `h1` en Playfair sur les 8 routes ; aucun `h1` plus petit que le `h2` suivant ; toujours aucun débordement horizontal (le retrait d'`overflow:hidden` est le risque principal ici).

---

### Tâche 3 : tokens de contraste (constats 05, 06)

**Fichiers**
- Modifier : `src/index.css` (bloc `:root`, `.field input/select/textarea`, `.filterbar button`, `.footer-form`)

- [ ] **Étape 1 : assombrir le vert de signalisation.** `--lime-deep:#6d8e1e` mesure 3,45:1 sur `--paper`, 3,79:1 sur blanc, 3,26:1 sur `--lime-pale` — sous le minimum AA de 4,5:1. Il porte tous les eyebrows (11,5 px), les index `.pathway__index`, `.value-list span`, `.service-map__row span`, `.academy-card span` et les icônes `.feature-icon`. Le descendre jusqu'à ≥ 4,5:1 sur les trois fonds. **Ne pas toucher à `--lime`** : il est à 7,68:1 sur `--night` et sert de couleur de bouton, où il fonctionne.

- [ ] **Étape 2 : donner une vraie bordure aux contrôles.** Introduire `--line-input` à ≥ 3:1 sur blanc et sur `--paper`, et l'appliquer aux champs, aux boutons de filtre et au soulignement du champ newsletter (`#53615e`, à 2,97:1). `--line` reste réservé aux filets décoratifs des grilles, où 1,34:1 est acceptable puisqu'ils ne délimitent aucun contrôle.

- [ ] **Étape 3 : mesurer.** `npm run verify`. Attendu : toutes les paires texte ≥ 4,5:1, toutes les bordures de contrôles ≥ 3:1. Rouvrir l'accueil et `/projects` en capture : le vert assombri ne doit pas éteindre les eyebrows sur fond papier.

---

### Tâche 4 : chemin critique de chargement (constats 09, 10)

**Fichiers**
- Modifier : `index.html` (`preconnect` + `<link>` polices), `src/index.css` (retrait de l'`@import`), `src/App.jsx` (`React.lazy` + `Suspense`), `src/Components/Home/home.jsx` (`fetchpriority`), `src/page/Projects/Projects.jsx`, `src/page/Portfolio/Portfolio.jsx` (`loading`, `decoding`)
- Créer : versions WebP de `kithub`, `comlb`, `Gnosis`, `Women`, `Lm`

- [ ] **Étape 1 : sortir les polices de la cascade.** L'`@import` en tête de `src/index.css` crée le chemin HTML → CSS → `fonts.googleapis.com` → `fonts.gstatic.com`. Le déplacer en `<link>` dans `index.html`, précédé de `preconnect` vers les deux domaines. Réduire les graisses aux seules réellement utilisées — relever lesquelles avec un `grep` sur `font-weight` et sur les raccourcis `font:` avant de couper, pas au jugé.

- [ ] **Étape 2 : découper par route.** Passer les 8 routes de `App.jsx` en `React.lazy` avec un `<Suspense>` dont le repli est neutre (pas de spinner : les pages arrivent en quelques dizaines de ms en local, un spinner clignoterait). Attendu : le chunk d'entrée passe sous 150 kB brut.

- [ ] **Étape 3 : alléger et différer les images.** Convertir les 5 captures de projets en WebP. Ajouter `loading="lazy"` et `decoding="async"` à partir de la deuxième carte de `/projects` et `/portfolio` — la première reste eager, c'est elle le LCP de ces pages. Ajouter `fetchpriority="high"` à l'image du héros d'accueil.

- [ ] **Étape 4 : mesurer.** `npm run build && npm run verify`. Attendu : chunk d'entrée < 150 kB brut, poids de `/projects` réduit d'au moins 200 kB, aucune régression visuelle sur les captures.

---

### Tâche 5 : routage et métadonnées (constats 07, 08, 13)

**Fichiers**
- Créer : `src/Components/PageMeta/PageMeta.jsx`, `src/Components/ScrollToTop/ScrollToTop.jsx`, `src/page/NotFound/NotFound.jsx`, `public/robots.txt`, `public/sitemap.xml`
- Modifier : `src/App.jsx`, les 8 composants de page, `index.html`

**Interfaces**
- Produit : `<PageMeta title description path />` — pose `document.title`, `meta[name=description]`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, et `link[rel=canonical]`. Nettoie au démontage.
- Produit : `<ScrollToTop />` — sans rendu, remet le défilement à 0 sur changement de `pathname`, en `behavior:'auto'` si `prefers-reduced-motion` est actif.

- [ ] **Étape 1 : écrire `PageMeta`.** Un `useEffect` sur les props qui écrit dans `document.head`. Pas de dépendance type Helmet : 30 lignes suffisent et la contrainte « pas de dépendance nouvelle » s'applique.

- [ ] **Étape 2 : câbler les 8 routes.** Un titre et une description propres à chaque page, en français, tirés du contenu déjà présent — **aucune promesse nouvelle**. Format : `<page> — Innotech Impact`.

- [ ] **Étape 3 : écrire la page 404.** Réutiliser `page-hero`, un message court en français, et trois sorties : accueil, Solutions, STEM Academy — les deux offres que `PRODUCT.md` demande de garder accessibles. La brancher sur `<Route path="*">`.

- [ ] **Étape 4 : remettre le défilement en haut.** Monter `<ScrollToTop />` dans `App`. Vérifier à la main le trajet qui posait problème : bas de `/projects` → « Démarrer la conversation » → `/devis` doit s'ouvrir sur le titre, pas au milieu du formulaire.

- [ ] **Étape 5 : `robots.txt` et `sitemap.xml`.** Les 8 routes. L'URL de production n'étant pas connue du dépôt, utiliser un placeholder documenté en tête de `sitemap.xml` et le signaler dans le rapport final — ne pas inventer un domaine.

- [ ] **Étape 6 : mesurer.** `npm run verify` + ouverture manuelle de `/xyz-inexistant` : la page 404 doit s'afficher avec ses trois sorties. Vérifier que `document.title` change bien d'une route à l'autre.

---

### Tâche 6 : accessibilité de navigation (constats 11, 12)

**Fichiers**
- Modifier : `src/Components/Home/home.jsx` (`.signal-strip`), `src/page/Projects/Projects.jsx` (`.filterbar`), `src/Components/Navbar/navbar.jsx`, `src/index.css` (cibles tactiles), `src/page/Contact/contact.jsx`

- [ ] **Étape 1 : rendre les groupes annonçables.** `aria-label` sur un `<div>` sans rôle n'est pas restitué : « Domaines d'intervention » et « Filtrer les réalisations » n'existent pas pour un lecteur d'écran. Passer la bande signal en `<ul>`/`<li>` et la barre de filtres en `role="group"`.

- [ ] **Étape 2 : annoncer le résultat du filtre.** Ajouter une région `aria-live="polite"` sur `/projects` qui indique le nombre de réalisations affichées après un clic. Texte au singulier et au pluriel corrects.

- [ ] **Étape 3 : agrandir les cibles trop petites.** `.contact-points a` mesure 314×20 px avec un `gap` de 16 px — sous le seuil de SC 2.5.8 et sans bénéficier de l'exception d'espacement. Porter la hauteur utile à ≥ 24 px par du `padding` vertical. Faire de même pour `.text-link` (19 px).

- [ ] **Étape 4 : compléter le menu mobile.** Ajouter `aria-controls` sur le déclencheur, la fermeture à la touche `Échap`, et le retour du focus sur le déclencheur après fermeture. Le `aria-expanded` déjà présent est correct, ne pas y toucher.

- [ ] **Étape 5 : mesurer.** `npm run verify` : aucune cible interactive sous 24 px. Puis parcours clavier complet de l'accueil et de `/projects` — `Tab` seul, sans souris — pour vérifier qu'aucun piège n'a été introduit.

---

### Tâche 7 : accessibilité et rédaction des formulaires (constat 14)

**Fichiers**
- Modifier : `src/page/Contact/contact.jsx`, `src/page/Devis/Devis.jsx`, `src/Components/Footer/footer.jsx`, `src/index.css` (`.field`, `.form-note`)

- [ ] **Étape 1 : signaler les champs obligatoires.** Tous les champs sont `required` sans qu'aucun ne l'indique avant la soumission. Le mentionner dans le `<label>`, avec une convention unique sur les deux formulaires.

- [ ] **Étape 2 : messages d'erreur en français, par champ.** Remplacer la validation native — dont la langue suit le navigateur, pas le site — par des messages propres au produit. `aria-invalid` sur le champ fautif, message lié par `aria-describedby`. Chaque message nomme le problème **et** la sortie, comme le fait déjà le message d'échec global (« Écrivez-nous directement à info@innotech.bi »), qui est le bon modèle et reste tel quel.

- [ ] **Étape 3 : déplacer le focus après un échec.** Sur erreur de soumission, porter le focus sur le résumé. Le `aria-live="polite"` existant reste : les deux mécanismes sont complémentaires.

- [ ] **Étape 4 : vérifier.** Soumettre les deux formulaires vides, puis avec un e-mail invalide, puis avec un message de moins de 10 caractères. Chaque cas doit produire un message français, un `aria-invalid` sur le bon champ et un focus utile. Le backend Django n'étant pas lancé, le chemin d'échec réseau se teste aussi : le message de repli avec l'adresse e-mail doit s'afficher.

---

### Tâche 8 : nettoyage (constats 15, 16, 17)

**Fichiers**
- Supprimer : 7 composants et 7 feuilles de style orphelins (liste en tête de plan)
- Modifier : `package.json`, `.gitignore`

- [ ] **Étape 1 : confirmer que chaque fichier est bien mort.** Avant toute suppression, `grep` sur le nom du fichier et sur le nom du composant dans tout `src/`. Le contrôle par nom de base seul donne des faux négatifs (`contact.jsx` existe deux fois, dans `Components/` et dans `page/`) — vérifier chemin par chemin.

- [ ] **Étape 2 : supprimer, puis rebuild.** `npm run build`. Attendu : le CSS produit reste à 19,5 kB et le JS à 267 kB — ces fichiers n'étaient pas bundlés, donc **aucun** changement de taille. Un écart signifierait qu'un fichier vivant a été supprimé : dans ce cas, `git checkout` du fichier et reprise de l'étape 1.

- [ ] **Étape 3 : retirer les deux dépendances mortes.** `@fortawesome/fontawesome-free` et `react-icons` n'étaient référencées que par les composants supprimés. Les retirer de `package.json`, réinstaller, rebuild.

- [ ] **Étape 4 : reformater.** Les composants livrés tiennent en 1 à 3 lignes (`home.css` : 4 760 octets sur une ligne). Passer Prettier une fois sur `src/`. Aucun impact sur le build, Vite minifie déjà. Relancer `npx eslint .` : toujours 0 erreur.

- [ ] **Étape 5 : mesurer.** `npm run build && npm run verify && npx eslint .`. Attendu : aucune régression sur les seuils déjà verts.

---

### Tâche 9 : relevé final

- [ ] **Étape 1 : relancer le harnais complet** sur les 8 routes, aux deux largeurs. Les sept seuils de la tâche 0 doivent être verts.

- [ ] **Étape 2 : reprendre les captures** de l'accueil (1440 et 390), de `/projects` et de la 404, et les comparer aux captures d'avant. Chercher les régressions, pas les confirmations.

- [ ] **Étape 3 : relancer le détecteur Impeccable** sur le code livré. Attendu : toujours 0 signalement — c'était vrai avant, ça doit le rester.

- [ ] **Étape 4 : rendre compte.** Mettre à jour le relevé publié avec les nouvelles mesures, et lister explicitement ce qui n'a pas été fait et pourquoi (`Innotech-main/`, domaine du sitemap).

---

## Auto-revue

**Couverture de la spec :** les 17 constats sont mappés dans le tableau de correspondance ; chacun a une tâche. Vérifié.

**Placeholders :** aucune étape ne dit « gérer les cas limites » ou « ajouter la validation appropriée » sans dire laquelle. Les deux endroits où une valeur est réellement inconnue — le domaine de production du sitemap et le seuil de détourage du logo — sont signalés comme tels avec la conduite à tenir, plutôt que laissés en blanc.

**Cohérence des noms :** `PageMeta` et `ScrollToTop` portent le même nom dans la structure de fichiers, la tâche 5 et `App.jsx`. `--line-input` porte le même nom en tâche 3 et dans la liste des fichiers modifiés. Les variantes de logo s'appellent `logo-innotech-light` (surfaces claires) et `logo-innotech-dark` (surfaces sombres) partout — le suffixe nomme la **surface d'accueil**, pas la couleur de l'encre, ce qui est le sens inverse de l'intuition : à vérifier à chaque import.
