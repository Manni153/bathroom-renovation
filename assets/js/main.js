// Bathrooms Algarve — shared site behaviour (mobile nav + FAQ accordion)
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.classList.toggle('is-open');
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
    });
  });

  // Desktop nav dropdowns ("Services", "Areas We Cover"): open instantly on
  // hover, close after a short delay on mouseleave so the menu doesn't
  // flicker shut when the cursor briefly crosses the gap between the
  // trigger and panel, and close immediately once an item is selected
  // (CSS no longer opens on bare :hover, so this JS state is what keeps
  // the menu visible while the mouse is still resting over it after a click).
  document.querySelectorAll('.nav-desktop .dropdown').forEach(function (dropdown) {
    var closeTimer = null;
    function close() {
      clearTimeout(closeTimer);
      dropdown.classList.remove('is-open');
    }
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
    });
    dropdown.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(close, 250);
    });
    dropdown.querySelectorAll('.dropdown-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        close();
        // A clicked link keeps browser focus, which would otherwise hold the
        // menu open via :focus-within (the keyboard-accessibility fallback).
        link.blur();
      });
    });
  });
});
