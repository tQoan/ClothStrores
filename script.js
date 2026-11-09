document.addEventListener('DOMContentLoaded', () => {
  const qtyButtons = document.querySelectorAll('[data-qty]');
  qtyButtons.forEach((group) => {
    const valueEl = group.querySelector('.qty-value');
    const minus = group.querySelector('[data-decrease]');
    const plus = group.querySelector('[data-increase]');

    if (!valueEl || !minus || !plus) return;

    let value = Number(valueEl.textContent.trim()) || 1;

    minus.addEventListener('click', () => {
      value = Math.max(1, value - 1);
      valueEl.textContent = String(value);
    });

    plus.addEventListener('click', () => {
      value += 1;
      valueEl.textContent = String(value);
    });
  });

  const chips = document.querySelectorAll('.chip, .filter-tag, .size');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('chip') || chip.classList.contains('filter-tag')) {
        chip.classList.toggle('active');
      }
      if (chip.classList.contains('size')) {
        document.querySelectorAll('.size').forEach((size) => size.classList.remove('active'));
        chip.classList.add('active');
      }
    });
  });

  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const main = document.querySelector('.main-image img');
      if (!main) return;
      const src = thumb.querySelector('img')?.getAttribute('src');
      if (src) main.setAttribute('src', src);
      document.querySelectorAll('.thumb').forEach((item) => item.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});
