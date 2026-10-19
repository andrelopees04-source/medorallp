/**
 * Med Oral Odontologia Especializada - Ubaitaba (BA)
 * Script de Interatividade & Conversão WhatsApp no Padrão Lumina
 * Skill CodeMakers-Design
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Configuração Comercial do WhatsApp
  const WHATSAPP_PHONE = '5573981096738';
  const DEFAULT_MESSAGE = 'Olá! Gostaria de agendar uma avaliação na Med Oral em Ubaitaba.';

  function createWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message || DEFAULT_MESSAGE);
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  }

  // 2. Atualizar todos os botões estáticos com data-whatsapp-cta
  const ctaButtons = document.querySelectorAll('[data-whatsapp-cta]');
  ctaButtons.forEach(btn => {
    const customMessage = btn.getAttribute('data-message') || DEFAULT_MESSAGE;
    btn.setAttribute('href', createWhatsAppUrl(customMessage));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // 3. Formulário de Agendamento Interativo ("Agende sua avaliação")
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const phoneInput = document.getElementById('form-phone');
      const treatmentSelect = document.getElementById('form-treatment');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const treatment = treatmentSelect ? treatmentSelect.value : 'Avaliação Geral';

      let message = `Olá, equipe Med Oral! Gostaria de agendar uma avaliação em Ubaitaba.`;
      
      if (name) {
        message += `\n- Nome: ${name}`;
      }
      if (phone) {
        message += `\n- WhatsApp: ${phone}`;
      }
      if (treatment && treatment !== 'Selecione o tratamento') {
        message += `\n- Tratamento de interesse: ${treatment}`;
      }

      const whatsappUrl = createWhatsAppUrl(message);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 4. Smooth Scroll para navegação interna com compensação de header fixo
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = window.innerWidth < 1024 ? 72 : 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Menu Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('is-open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('is-open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('is-open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('is-open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Fechar menu ao tocar em qualquer link dentro do drawer
  const mobileDrawerLinks = document.querySelectorAll('#mobile-nav-drawer a');
  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
});
