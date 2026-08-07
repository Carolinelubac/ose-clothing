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
// Emplacement Google Analytics / Meta Pixel
// ============================================================
// Coller ici les identifiants fournis (GA4 measurement ID, Meta Pixel ID)
// une fois reçus, puis charger les scripts officiels correspondants.
// Exemple GA4 :
//   gtag('config', 'G-XXXXXXXXXX');
// Exemple Meta Pixel :
//   fbq('init', 'XXXXXXXXXXXXXXX');
