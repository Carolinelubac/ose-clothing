# OSE!

Site vitrine du site [ose-clothing.fr](https://ose-clothing.fr) — site statique
(HTML/CSS/JS), déployé automatiquement sur GitHub Pages à chaque push sur `main`.

C'est une page de présentation de marque : aucune fonction d'achat, de panier ou de
paiement. La boutique Shopify sera développée séparément, plus tard.

## Structure

- `index.html` — page d'accueil (hero, aperçu collection, liste d'attente, engagement)
- `a-propos/`, `engagement/`, `contact/`, `mentions-legales/` — pages secondaires (URL propres, sans `.html`)
- `style.css` / `script.js` — styles et interactions
- `assets/icons.svg` — sprite SVG des motifs de marque (citron, gouttes, mégaphone, produits, réseaux sociaux)
- `assets/img/` — logo et illustration citron optimisés pour le web (PNG + WebP)
- `assets/source/` — fichiers logo originaux fournis par la cliente (haute résolution, non utilisés directement sur le site)
- `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`, `favicon.svg` — favicons (citron)
- `.github/workflows/deploy.yml` — déploiement automatique sur GitHub Pages
- `CNAME` — domaine personnalisé (`ose-clothing.fr`)

## Formulaire de collecte d'emails (Formspree)

Le formulaire de liste d'attente (page d'accueil + page Engagement) et le formulaire
de contact utilisent [Formspree](https://formspree.io). Il reste à connecter votre
propre formulaire :

1. Créer un compte sur [formspree.io](https://formspree.io) (gratuit) et vérifier votre email.
2. Créer un formulaire dans le tableau de bord Formspree → copier l'URL du type `https://formspree.io/f/xxxxxxxx`.
3. Remplacer `https://formspree.io/f/VOTRE_ID_FORMSPREE` par cette URL dans :
   - `index.html` (formulaire liste d'attente)
   - `engagement/index.html` (formulaire liste d'attente, dupliqué en bas de page)
   - `contact/index.html` (formulaire de contact)
4. Commit + push : les inscriptions arriveront dans le tableau de bord Formspree
   (et par email à l'adresse du compte).

Les deux formulaires incluent un champ anti-spam invisible (`_gotcha`), standard Formspree.

## Google Analytics / Meta Pixel

Un emplacement est prévu dans `script.js` (section "Emplacement Google Analytics /
Meta Pixel") pour coller les identifiants une fois fournis, avec les scripts officiels
associés.

## Domaine (Hostinger → GitHub Pages)

Dans l'espace **DNS** du domaine `ose-clothing.fr` sur Hostinger :

| Type  | Nom | Valeur                  |
|-------|-----|--------------------------|
| A     | @   | 185.199.108.153          |
| A     | @   | 185.199.109.153          |
| A     | @   | 185.199.110.153          |
| A     | @   | 185.199.111.153          |
| CNAME | www | carolinelubac.github.io  |

Puis, dans les paramètres GitHub Pages du dépôt (Settings → Pages), le domaine
personnalisé `ose-clothing.fr` doit être renseigné dans le champ "Custom domain"
(nécessaire avec un déploiement via GitHub Actions — le fichier `CNAME` seul ne
suffit pas) et "Enforce HTTPS" activé une fois le certificat généré.

## Faire évoluer le site (ajout de la boutique Shopify)

Le header et le footer ont une structure de navigation simple à étendre : ajouter un
lien `<li><a href="https://[votre-boutique].myshopify.com">Boutique</a></li>` dans
`.nav-links` (et dans `.footer-col` "Navigation") de chaque page, une fois la
boutique Shopify prête. Aucune refonte n'est nécessaire.

## Déploiement

Tout push sur `main` déclenche `.github/workflows/deploy.yml`, qui publie le contenu
du dépôt sur GitHub Pages. Aucune étape de build : le site est du HTML/CSS/JS statique.
