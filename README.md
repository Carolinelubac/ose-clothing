# OSE Clothing

Landing page du site [ose-clothing.fr](https://ose-clothing.fr) — site statique (HTML/CSS/JS),
déployé automatiquement sur GitHub Pages à chaque push sur `main`.

## Structure

- `index.html` — landing page (hero, collection, histoire, newsletter, contact)
- `style.css` / `script.js` — styles et interactions
- `mentions-legales.html`, `cgv.html` — pages légales à compléter
- `.github/workflows/deploy.yml` — déploiement automatique sur GitHub Pages
- `CNAME` — domaine personnalisé (`ose-clothing.fr`)

## Brancher la boutique Shopify (Buy Button)

Le site affiche une section "Collection" prête à recevoir le module **Shopify Buy Button**
(pas besoin d'un site Shopify complet, juste d'une boutique Shopify avec des produits).

1. Créer une boutique sur [shopify.com](https://www.shopify.com) et y ajouter vos produits.
2. Dans l'admin Shopify : **Paramètres → Applications et canaux de vente → Buy Button**
   (installer le canal "Buy Button" s'il n'est pas déjà présent).
3. Créer un bouton pour la collection à afficher, puis récupérer dans le code généré :
   - `domain` (ex: `ose-clothing.myshopify.com`)
   - `storefrontAccessToken`
   - `id` de la collection
4. Renseigner ces trois valeurs dans `script.js`, en haut du fichier :

   ```js
   const SHOPIFY_CONFIG = {
     domain: 'votre-boutique.myshopify.com',
     storefrontAccessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
     collectionId: '123456789',
   };
   ```

5. Commit + push : le module boutique remplace automatiquement le message
   « la boutique arrive bientôt ».

Le paiement, la livraison et les emails de confirmation sont gérés par le checkout
Shopify (redirection lors du clic sur "Commander") — aucune infrastructure de paiement
à gérer côté site.

## Domaine (Hostinger → GitHub Pages)

Dans l'espace **DNS** du domaine `ose-clothing.fr` sur Hostinger, ajouter :

| Type  | Nom | Valeur                  |
|-------|-----|--------------------------|
| A     | @   | 185.199.108.153          |
| A     | @   | 185.199.109.153          |
| A     | @   | 185.199.110.153          |
| A     | @   | 185.199.111.153          |
| CNAME | www | carolinelubac.github.io  |

Puis, dans les paramètres GitHub Pages du dépôt (Settings → Pages), vérifier que le
domaine personnalisé `ose-clothing.fr` est bien renseigné et que "Enforce HTTPS" est activé
une fois le certificat généré (peut prendre jusqu'à 24h après la propagation DNS).

## Déploiement

Tout push sur `main` déclenche `.github/workflows/deploy.yml`, qui publie le contenu du
dépôt sur GitHub Pages. Aucune étape de build : le site est du HTML/CSS/JS statique.
