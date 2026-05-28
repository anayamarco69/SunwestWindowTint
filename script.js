const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const quoteForm = document.querySelector('[data-quote-form]');
const quoteResult = document.querySelector('[data-quote-result]');
const quoteMessage = document.querySelector('[data-quote-message]');
const smsLink = document.querySelector('[data-sms-link]');
const copyButton = document.querySelector('[data-copy-quote]');

function clean(value) {
  return value ? value.trim() : '';
}

if (quoteForm && quoteResult && quoteMessage && smsLink) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = clean(formData.get('name')) || 'Customer';
    const phone = clean(formData.get('phone')) || 'Not provided';
    const city = clean(formData.get('city')) || 'Orange County';
    const service = clean(formData.get('service')) || 'Window tinting';
    const details = clean(formData.get('details')) || 'No extra details provided yet.';

    const message = `Hi Sergio, my name is ${name}. I would like a free quote for ${service}. City: ${city}. Phone: ${phone}. Details: ${details}`;

    quoteMessage.textContent = message;
    smsLink.href = `sms:+19497351849?body=${encodeURIComponent(message)}`;
    quoteResult.hidden = false;
  });
}

if (copyButton && quoteMessage) {
  copyButton.addEventListener('click', async () => {
    const text = quoteMessage.textContent || '';
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = 'Copied';
      setTimeout(() => {
        copyButton.textContent = 'Copy Message';
      }, 1800);
    } catch (error) {
      copyButton.textContent = 'Select & Copy';
    }
  });
}
