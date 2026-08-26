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
  // hover, but close after a short delay so the menu doesn't flicker shut
  // when the cursor briefly crosses the gap between the trigger and panel.
  document.querySelectorAll('.nav-desktop .dropdown').forEach(function (dropdown) {
    var closeTimer = null;
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
    });
    dropdown.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        dropdown.classList.remove('is-open');
      }, 250);
    });
  });
});
