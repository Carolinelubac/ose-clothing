// ============================================================
// OSE! — script.js
// ============================================================

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
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
}

// ── Formspree submit (liste d'attente + contact) ──
// Envoie le formulaire en AJAX pour rester sur la page et afficher un message,
// au lieu de rediriger vers formspree.io.
function bindFormspreeForm(formId, noteId, successMessage) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form || !note) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    note.style.color = '';
    note.textContent = 'Envoi en cours…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        note.textContent = successMessage;
        form.reset();
      } else {
        note.textContent = "Oups, l'envoi a échoué. Réessayez dans un instant.";
      }
    } catch (err) {
      note.textContent = "Oups, l'envoi a échoué. Vérifiez votre connexion et réessayez.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

bindFormspreeForm('waitlistForm', 'waitlistNote', 'Merci ! Tu seras prévenue en priorité. 🍋');
bindFormspreeForm('contactForm', 'contactNote', 'Merci, votre message est bien parti !');

// ============================================================
// MODULE BOUTIQUE — Shopify Buy Button
// ============================================================
// 1. Créez une boutique Shopify (ou utilisez celle existante).
// 2. Dans l'admin Shopify : Paramètres > Applications et canaux de vente > Buy Button
//    (installer le canal "Buy Button" s'il n'est pas déjà présent).
// 3. Créez un bouton pour la collection à afficher, récupérez :
//      - domain                 → xxxxx.myshopify.com
//      - storefrontAccessToken  → token "Buy Button" généré par Shopify
//      - id (collection)        → identifiant de la collection à afficher
// 4. Renseignez les 3 valeurs ci-dessous. L'aperçu (T-shirt/Sweat/Casquette)
//    disparaît automatiquement dès que SHOPIFY_CONFIG.domain est renseigné,
//    remplacé par les vrais produits de la boutique.
// ============================================================

const SHOPIFY_CONFIG = {
  domain: '', // ex: 'ose-clothing.myshopify.com'
  storefrontAccessToken: '', // token "Buy Button" Shopify
  collectionId: '', // ID de la collection Shopify à afficher
};

function initShopifyBuyButton() {
  if (!SHOPIFY_CONFIG.domain || !SHOPIFY_CONFIG.storefrontAccessToken || !SHOPIFY_CONFIG.collectionId) {
    return; // boutique non configurée : on garde l'aperçu de collection
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
              button: { 'background-color': '#111111', ':hover': { 'background-color': '#FF4F9A' }, 'border-radius': '14px' },
            },
            contents: { options: true },
          },
          productSet: {
            styles: { products: { '@media (min-width: 601px)': { 'margin-left': '-1rem' } } },
          },
          cart: {
            styles: { button: { 'background-color': '#111111', ':hover': { 'background-color': '#FF4F9A' }, 'border-radius': '14px' } },
            text: { total: 'Sous-total', button: 'Commander' },
          },
          toggle: {
            styles: { toggle: { 'background-color': '#0066FF' } },
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

// ============================================================
// Emplacement Google Analytics / Meta Pixel
// ============================================================
// Coller ici les identifiants fournis (GA4 measurement ID, Meta Pixel ID)
// une fois reçus, puis charger les scripts officiels correspondants.
// Exemple GA4 :
//   gtag('config', 'G-XXXXXXXXXX');
// Exemple Meta Pixel :
//   fbq('init', 'XXXXXXXXXXXXXXX');
