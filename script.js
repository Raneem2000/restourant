let currentSlide = 0;
const slides = [
  document.getElementById("slider"),
  document.getElementById("slider2"),
];
const textOverlay = document.getElementById("textOverlay");

// Array to hold the different directions of the slide animations
const directions = [
  "translate-x-full", // from right
  "-translate-x-full", // from left
  "translate-y-full", // from bottom
  "-translate-y-full", // from top
];

setInterval(() => {
  // Loop through the slides and apply the fade-out effect with direction shift
  slides.forEach((slide) => {
    slide.classList.add("opacity-0", ...directions); // Fade out and shift in any direction
    slide.classList.remove(
      "opacity-100",
      "translate-x-0",
      "translate-y-0",
      "scale-100"
    );
  });

  textOverlay.classList.add("opacity-0", "transition-opacity", "duration-1000");

  // تحديد السلايد الحالي
  slides[currentSlide].classList.remove("opacity-0", ...directions);
  slides[currentSlide].classList.add(
    "opacity-100",
    "scale-100",
    "transition-all",
    "duration-1000",
    "translate-x-0",
    "translate-y-0"
  );

  // إذا كانت السلايد الحالية هي الأولى، أظهر النص
  if (currentSlide === 0) {
    textOverlay.classList.remove("opacity-0");
  }

  // تحديث السلايد التالي
  currentSlide = (currentSlide + 1) % slides.length;
}, 3000);

// header and footer
document.addEventListener("DOMContentLoaded", () => {
  function loadComponent(id, file) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(id).innerHTML = data;
      });
  }

  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
});

// numbers animate
function animateNumbers() {
  const numbers = [
    { element: document.getElementById("number1"), endValue: 138 },
    { element: document.getElementById("number2"), endValue: 300 },
    { element: document.getElementById("number3"), endValue: 12 },
    { element: document.getElementById("number4"), endValue: 100 },
  ];

  numbers.forEach((item) => {
    let currentValue = 0;
    const step = Math.ceil(item.endValue / 100); // Number of steps

    const interval = setInterval(() => {
      currentValue += step;
      if (currentValue >= item.endValue) {
        currentValue = item.endValue;
        clearInterval(interval);
      }
      item.element.textContent = currentValue;
    }, 10); // Speed of the number increase
  });
}

window.onload = animateNumbers;

// for menu items
const menuItems = document.querySelectorAll(".menu-item");
const categoryContents = document.querySelectorAll(".category-content");

const colors = {
  pizza: "#01D220", // green
  pasta: "#F2D3FF", // white
  dessert: "#C6A402", // yellow
  drink: "#4F8BFF", // blue
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((el) => el.classList.remove("active"));
    categoryContents.forEach((c) => c.classList.add("hidden"));

    item.classList.add("active");

    const category = item.dataset.category;
    const border = item.querySelector(".menu-border");
    document.querySelectorAll(".menu-border").forEach((el) => {
      el.style.borderColor = "white";
    });
    border.style.borderColor = colors[category];
    border.style.borderWidth = "1px";

    const section = document.querySelector(`#content-${category}`);
    if (section) section.classList.remove("hidden");
  });
});
