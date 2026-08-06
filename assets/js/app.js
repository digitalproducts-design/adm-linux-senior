(() => {
  "use strict";

  const config = window.PRODUCT_CONFIG || {};
  const checkoutPlaceholder = !config.checkoutUrl || /COLE-SEU-LINK|SEU-CHECKOUT/i.test(config.checkoutUrl);
  const trackingKeys = new Set(["src", "sck", "fbclid", "gclid", "ttclid"]);

  function buildCheckoutUrl() {
    if (checkoutPlaceholder) return "#checkout-nao-configurado";
    const target = new URL(config.checkoutUrl);
    if (config.preserveTrackingParameters) {
      const current = new URLSearchParams(window.location.search);
      current.forEach((value, key) => {
        if (key.toLowerCase().startsWith("utm_") || trackingKeys.has(key.toLowerCase())) {
          target.searchParams.set(key, value);
        }
      });
    }
    return target.toString();
  }

  const checkoutUrl = buildCheckoutUrl();
  document.querySelectorAll("[data-checkout]").forEach((link) => {
    link.href = checkoutUrl;
    link.addEventListener("click", (event) => {
      if (!checkoutPlaceholder) return;
      event.preventDefault();
      const dialog = document.querySelector("#checkout-dialog");
      if (dialog?.showModal) dialog.showModal();
      else alert("Configure o link da Kiwify em assets/js/config.js antes de publicar.");
    });
  });

  const price = document.querySelector("[data-price]");
  if (price) {
    if (config.priceLabel) price.textContent = config.priceLabel;
    else price.hidden = true;
  }

  document.querySelectorAll("[data-support-email]").forEach((el) => {
    if (config.supportEmail) {
      el.textContent = config.supportEmail;
      if (el.tagName === "A") el.href = `mailto:${config.supportEmail}`;
    } else {
      el.textContent = "canal informado no checkout";
      if (el.tagName === "A") el.removeAttribute("href");
    }
  });

  if (config.canonicalUrl && !/SEU-USUARIO/i.test(config.canonicalUrl)) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = config.canonicalUrl;
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menu?.toggleAttribute("data-open", !open);
  });
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menu?.removeAttribute("data-open");
  }));

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  });
})();
