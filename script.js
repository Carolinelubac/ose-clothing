// ============================================================
// OSE CLOTHING — script.js
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ── Newsletter (placeholder — branchez votre outil d'emailing ici) ──
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletterNote').textContent = 'Merci ! Vous êtes inscrit(e).';
  e.target.reset();
});

// ============================================================
// MODULE BOUTIQUE — Shopify Buy Button
// ============================================================
// 1. Créez une boutique Shopify (ou utilisez celle existante).
// 2. Dans l'admin Shopify : Paramètres > Canaux de vente > Buy Button
//    (ou Applications > Buy Button channel si non installé).
// 3. Créez un bouton pour une collection, récupérez :
//      - domain                 → xxxxx.myshopify.com
//      - storefrontAccessToken  → token généré par Shopify
//      - id (collection)        → identifiant de la collection à afficher
// 4. Renseignez les 3 valeurs ci-dessous. Le placeholder disparaît
//    automatiquement dès que SHOPIFY_CONFIG.domain est renseigné.
// ============================================================

const SHOPIFY_CONFIG = {
  domain: '', // ex: 'ose-clothing.myshopify.com'
  storefrontAccessToken: '', // token "Buy Button" Shopify
  collectionId: '', // ID de la collection Shopify à afficher
};

function initShopifyBuyButton() {
  if (!SHOPIFY_CONFIG.domain || !SHOPIFY_CONFIG.storefrontAccessToken || !SHOPIFY_CONFIG.collectionId) {
    return; // boutique non configurée : on garde le message placeholder
  }

  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  function ShopifyBuyInit() {
    const client = ShopifyBuy.buildClient({
      domain: SHOPIFY_CONFIG.domain,
      storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
    });

    ShopifyBuy.UI.onReady(client).then((ui) => {
      document.getElementById('shopify-collection').innerHTML = '';
      ui.createComponent('collection', {
        id: SHOPIFY_CONFIG.collectionId,
        node: document.getElementById('shopify-collection'),
        moneyFormat: '%E2%82%AC%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: { 'text-align': 'left' },
              button: { 'background-color': '#111111', ':hover': { 'background-color': '#FF5A36' }, 'border-radius': '4px' },
            },
            contents: { options: true },
          },
          productSet: {
            styles: { products: { '@media (min-width: 601px)': { 'margin-left': '-1rem' } } },
          },
          cart: {
            styles: { button: { 'background-color': '#111111', ':hover': { 'background-color': '#FF5A36' }, 'border-radius': '4px' } },
            text: { total: 'Sous-total', button: 'Commander' },
          },
          toggle: {
            styles: { toggle: { 'background-color': '#111111' } },
          },
        },
      });
    });
  }

  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    script.onload = ShopifyBuyInit;
    document.head.appendChild(script);
  }
}

initShopifyBuyButton();
