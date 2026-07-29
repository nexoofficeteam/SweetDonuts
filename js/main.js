/* =========================================================
   SWEET DONUTS — CONFIGURAÇÃO RÁPIDA
   =========================================================
   Para trocar o número de WhatsApp da loja, edite APENAS a
   linha abaixo. Use o formato: código do país + DDD + número,
   sem espaços, traços ou o símbolo "+".
   Exemplo para (45) 90000-0000 -> "5545900000000"
   ========================================================= */
const WHATSAPP_NUMBER = "5545991586361"; // <-- TROQUE AQUI pelo número real da Sweet Donuts

/* ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Tela de carregamento ---------- */
  const loader = document.getElementById('loader');
  const loaderRing = document.getElementById('loader-ring');
  requestAnimationFrame(() => { if (loaderRing) loaderRing.style.strokeDashoffset = '40'; });
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 400);
  });
  // fallback caso o evento 'load' demore (ex: imagens grandes)
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2200);

  /* ---------- Header: muda ao rolar ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navMobile = document.getElementById('nav-mobile');
  menuToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Links do WhatsApp: monta a mensagem automaticamente ---------- */
  function buildWhatsAppLink(message) {
    const text = encodeURIComponent(message || 'Olá! Vim pelo site e gostaria de fazer um pedido.');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }
  document.querySelectorAll('[data-wa-cta]').forEach(el => {
    el.setAttribute('href', buildWhatsAppLink(el.getAttribute('data-wa-cta')));
  });

  /* ---------- Abas do cardápio ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.getAttribute('data-tab');
      panels.forEach(p => {
        const active = p.getAttribute('data-panel') === target;
        p.classList.toggle('is-active', active);
        p.hidden = !active;
      });
    });
  });

  /* ---------- FAQ (acordeão) ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Formulário de encomendas -> WhatsApp ---------- */
  const form = document.getElementById('form-encomenda');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const data = new FormData(form);
      const nome = data.get('nome') || '';
      const telefone = data.get('telefone') || '';
      const evento = data.get('evento') || '';
      const quantidade = data.get('quantidade') || 'não informado';
      const tema = data.get('tema') || 'não informado';
      const dataEvento = data.get('data') || 'a combinar';
      const obs = data.get('obs') || 'nenhuma';

      const mensagem =
`Olá! Gostaria de solicitar um orçamento de encomenda:
Nome: ${nome}
Telefone: ${telefone}
Tipo de evento: ${evento}
Quantidade: ${quantidade}
Tema: ${tema}
Data do evento: ${dataEvento}
Observações: ${obs}`;

      window.open(buildWhatsAppLink(mensagem), '_blank', 'noopener');
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

});
