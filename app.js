// سنة الفوتر
document.getElementById('year').textContent = new Date().getFullYear();

// قائمة الموبايل
const hamb = document.querySelector('.hamb');
const menu = document.querySelector('.mobile-menu');
hamb?.addEventListener('click', () => {
  const open = menu.style.display === 'flex';
  menu.style.display = open ? 'none' : 'flex';
  hamb.setAttribute('aria-expanded', String(!open));
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.style.display = 'none'));

// تفعيل AOS
AOS.init({
  duration: 700,
  once: true,
  offset: 80
});

// تفعيل Swiper للآراء
const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  autoplay: { delay: 4000 }
});

// سلايدر المقارنة قبل/بعد
const compare = document.querySelector('.compare-img');
const range = compare?.querySelector('.slider');
const afterLayer = compare?.querySelector('.after-layer img');
range?.addEventListener('input', e => {
  const v = Number(e.target.value); // 0..100
  // نحرّك القص (clip-path) للصورة "بعد"
  afterLayer.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
});

// فاليديشن للفورم + إرسال واتساب (بدون باك-إند)
const form = document.getElementById("orderForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  // تحقق من صحة الحقول
  [...form.elements].forEach(el => {
    if (['INPUT','TEXTAREA','SELECT'].includes(el.tagName)) {
      const input = el;
      const errorSpan = el.parentElement.querySelector('.error') || el.closest('fieldset')?.querySelector('.error');
      if (input.willValidate && !input.checkValidity()) {
        valid = false;
        if (errorSpan) errorSpan.textContent = input.validationMessage;
      } else {
        if (errorSpan) errorSpan.textContent = '';
      }
    }
  });

  // تحقق من اختيار طريقة الدفع
  const payChecked = form.querySelector('input[name="pay"]:checked');
  if (!payChecked) {
    valid = false;
    const payError = form.querySelector('fieldset .error');
    if (payError) payError.textContent = 'من فضلك اختر طريقة الدفع';
  } else {
    const payError = form.querySelector('fieldset .error');
    if (payError) payError.textContent = '';
  }

  if (!valid) return;

  // إرسال البيانات إلى Getform
  const formData = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: formData
  })
  .then(response => {
    // عرض رسالة النجاح دون إخفاء الفورم
    successMsg.style.display = "block";
    // إعادة تعيين الفورم إذا حبيت
    form.reset();
  })
  .catch(error => {
    alert("حدث خطأ، حاول مرة أخرى.");
    console.error(error);
  });
});
// تفعيل التبويبات
const tabs = document.querySelectorAll('.tab');