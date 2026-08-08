# OSE!

Landing page du site [ose-clothing.fr](https://ose-clothing.fr) — site statique
(HTML/CSS/JS), déployé automatiquement sur GitHub Pages à chaque push sur `main`.

La page d'accueil comporte une section "Achat" (`#achat`) dédiée à la boutique : un
emplacement y est réservé pour coller directement le code Shopify (Buy Button), sans
aucune configuration côté code (voir plus bas).

## Structure

Header (Accueil / Collections / À propos / Engagement / Contact + icône panier) et
footer à 3 colonnes (Collections / À propos / Aide), identiques sur toutes les pages.
Le lien "Collections" du header et le panier pointent vers `/#collections`, la
section boutique de la page d'accueil.

- `index.html` — page d'accueil (hero, collections, section achat/Shopify, pourquoi le citron, manifeste, valeurs, newsletter)
- `a-propos/`, `engagement/`, `contact/`, `faq/`, `livraison-retours/`, `mentions-legales/` — pages secondaires (URL propres, sans `.html`)
- `style.css` / `script.js` — styles et interactions
- `assets/icons.svg` — sprite SVG des motifs de marque (citron, gouttes, mégaphone, panier, produits, réseaux sociaux)
- `assets/img/` — logo et illustration citron optimisés pour le web (PNG + WebP)
- `assets/source/` — fichiers logo originaux fournis par la cliente (haute résolution, non utilisés directement sur le site)
- `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` — favicons (vraie photo du citron)
- `.github/workflows/deploy.yml` — déploiement automatique sur GitHub Pages
- `CNAME` — domaine personnalisé (`ose-clothing.fr`)

## Brancher la boutique Shopify

La section "Achat" de la page d'accueil (`index.html`, ancre `#achat`) contient un
emplacement prêt à recevoir le code fourni par Shopify — aucune configuration dans
`script.js`, il suffit de coller le code directement dans le HTML.

1. Créer une boutique sur [shopify.com](https://www.shopify.com) et y ajouter vos produits.
2. Dans l'admin Shopify : **Paramètres → Applications et canaux de vente → Buy Button**
   (installer le canal "Buy Button" s'il n'est pas déjà présent).
3. Créer un bouton pour le produit ou la collection à afficher, puis cliquer sur
   **« Générer un extrait de code »**. Shopify affiche un bloc de code complet
   (un `<div id="product-component-...">` suivi d'un `<script>`).
4. Copier tout ce bloc.
5. Ouvrir `index.html`, repérer la section délimitée par les commentaires :

   ```html
   <!-- EMPLACEMENT SHOPIFY — À REMPLIR MANUELLEMENT -->
   <div id="shopify-buy-button" class="shopify-buy-button">
     <div class="shopify-placeholder">...</div>
   </div>
   <!-- FIN DE L'EMPLACEMENT SHOPIFY -->
   ```

6. Remplacer tout le contenu du `<div id="shopify-buy-button">` (y compris le bloc
   `shopify-placeholder`) par le code collé depuis Shopify.
7. Commit + push : les vrais produits et le bouton de paiement Shopify s'affichent
   à la place de l'emplacement réservé.

Le paiement, la livraison et les emails de confirmation sont gérés par le checkout
Shopify (ouvert lors du clic sur "Ajouter au panier" / "Commander") — aucune
infrastructure de paiement à gérer côté site.

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
