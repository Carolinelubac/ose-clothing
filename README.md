# OSE!

Landing page du site [ose-clothing.fr](https://ose-clothing.fr) — site statique
(HTML/CSS/JS), déployé automatiquement sur GitHub Pages à chaque push sur `main`.

La section "Collections" de la page d'accueil est le module boutique : elle affiche
un aperçu (T-shirt/Sweat/Casquette) tant que Shopify n'est pas connecté, puis les
vrais produits automatiquement une fois branché (voir plus bas).

## Structure

Header (Accueil / Collections / À propos / Engagement / Contact + icône panier) et
footer à 3 colonnes (Collections / À propos / Aide), identiques sur toutes les pages.
Le lien "Collections" du header et le panier pointent vers `/#collections`, la
section boutique de la page d'accueil.

- `index.html` — page d'accueil (hero, section boutique/collections, liste d'attente, engagement)
- `a-propos/`, `engagement/`, `contact/`, `faq/`, `livraison-retours/`, `mentions-legales/` — pages secondaires (URL propres, sans `.html`)
- `style.css` / `script.js` — styles et interactions
- `assets/icons.svg` — sprite SVG des motifs de marque (citron, gouttes, mégaphone, panier, produits, réseaux sociaux)
- `assets/img/` — logo et illustration citron optimisés pour le web (PNG + WebP)
- `assets/source/` — fichiers logo originaux fournis par la cliente (haute résolution, non utilisés directement sur le site)
- `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` — favicons (vraie photo du citron)
- `.github/workflows/deploy.yml` — déploiement automatique sur GitHub Pages
- `CNAME` — domaine personnalisé (`ose-clothing.fr`)

## Brancher la boutique Shopify (Buy Button)

La section "Collections" de la page d'accueil est prête à recevoir le module
**Shopify Buy Button** (pas besoin d'un site Shopify complet, juste d'une boutique
Shopify avec des produits).

1. Créer une boutique sur [shopify.com](https://www.shopify.com) et y ajouter vos produits.
2. Dans l'admin Shopify : **Paramètres → Applications et canaux de vente → Buy Button**
   (installer le canal "Buy Button" s'il n'est pas déjà présent).
3. Créer un bouton pour la collection à afficher, puis récupérer dans le code généré :
   - `domain` (ex: `ose-clothing.myshopify.com`)
   - `storefrontAccessToken`
   - `id` de la collection
4. Renseigner ces trois valeurs dans `script.js`, en haut de la section "MODULE
   BOUTIQUE" :

   ```js
   const SHOPIFY_CONFIG = {
     domain: 'votre-boutique.myshopify.com',
     storefrontAccessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
     collectionId: '123456789',
   };
   ```

5. Commit + push : l'aperçu (T-shirt/Sweat/Casquette) est automatiquement remplacé
   par les vrais produits de la collection.

Le paiement, la livraison et les emails de confirmation sont gérés par le checkout
Shopify (redirection lors du clic sur "Commander") — aucune infrastructure de
paiement à gérer côté site.

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

## Déploiement

Tout push sur `main` déclenche `.github/workflows/deploy.yml`, qui publie le contenu
du dépôt sur GitHub Pages. Aucune étape de build : le site est du HTML/CSS/JS statique.
