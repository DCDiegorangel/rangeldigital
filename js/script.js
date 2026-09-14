/* ==========================================================================
   RANGEL DIGITAL — script.js
   ========================================================================== */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '556292889811'; // formato internacional, sem símbolos

  /* ---------------------------------------------------------------------
     1. Botões de WhatsApp (todos os elementos com [data-whatsapp])
     Cada botão abre o WhatsApp com a mensagem definida em data-message.
  --------------------------------------------------------------------- */
  function initWhatsappButtons() {
    var buttons = document.querySelectorAll('[data-whatsapp]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var message = btn.getAttribute('data-message') || 'Olá, Diego! Conheci a Rangel Digital pelo site.';
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank', 'noopener');
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Menu mobile (hamburger)
  --------------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    function closeMenu() {
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao redimensionar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     3. FAQ — accordion
  --------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', function () {
        var isOpen = question.getAttribute('aria-expanded') === 'true';

        // Fecha os outros itens (accordion exclusivo)
        items.forEach(function (other) {
          if (other !== item) {
            var q = other.querySelector('.faq-question');
            var a = other.querySelector('.faq-answer');
            if (q && a) {
              q.setAttribute('aria-expanded', 'false');
              a.style.maxHeight = null;
            }
          }
        });

        question.setAttribute('aria-expanded', String(!isOpen));
        answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
      });
    });
  }

  /* ---------------------------------------------------------------------
     4. Header — leve mudança de fundo ao rolar
  --------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 12) {
        header.style.background = 'rgba(11,11,11,0.92)';
      } else {
        header.style.background = 'rgba(11,11,11,0.72)';
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     5. Scroll reveal — entrada suave das seções ao entrar na viewport
  --------------------------------------------------------------------- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || elements.length === 0) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Init
  --------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initWhatsappButtons();
    initMobileMenu();
    initFaq();
    initHeaderScroll();
    initScrollReveal();
  });
})();