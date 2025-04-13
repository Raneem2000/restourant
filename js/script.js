function restartAnimation(elementId, animationClass) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.classList.remove(animationClass);
  void el.offsetWidth; // force reflow to restart the animation
  el.classList.add(animationClass);
}

let currentSlide = 0;
const slides = [
  document.getElementById("slider"),
  document.getElementById("slider2"),
];
const textOverlays = [
  document.getElementById("textOverlay"),
  document.getElementById("textOverlay2"),
];

setInterval(() => {
  // تغيير السلايد
  slides.forEach((slide) => slide.classList.add("opacity-0"));
  slides.forEach((slide) => slide.classList.remove("opacity-100"));

  textOverlays.forEach((txt) => {
    txt.classList.add("hidden");
    txt.classList.remove("block");
  });

  slides[currentSlide].classList.remove("opacity-0");
  slides[currentSlide].classList.add("opacity-100");

  textOverlays[currentSlide].classList.remove("hidden");
  textOverlays[currentSlide].classList.add("block");

  // إعادة تشغيل الأنيميشن على النصوص
  restartAnimation("slideText1", "animate-crazy-flip");
  restartAnimation("slideText2", "animate-crazy-flip");
  restartAnimation("slideText3", "animate-crazy-flip");
  restartAnimation("slideText4", "animate-crazy-flip");

  // تغيير السلايد
  currentSlide = (currentSlide + 1) % slides.length;
}, 3000);

// إعادة تشغيل الأنيميشن كل 3 ثوانٍ بشكل مستقل
setInterval(() => {
  restartAnimation("slideText1", "animate-crazy-flip");
  restartAnimation("slideText2", "animate-crazy-flip");
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
    const step = Math.ceil(item.endValue / 100);

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

    const section = document.querySelector(`#content-${category}`);
    if (section) section.classList.remove("hidden");
  });
});

// data menu
const menuData = {
  pizza: [
    {
      name: "Pepperoni Pizza",
      price: 25,
      ingredients: "pepperoni, cheese, sauce",
    },
    { name: "Veggie Pizza", price: 22, ingredients: "peppers, olives, cheese" },
  ],
  pasta: [
    {
      name: "Spaghetti",
      price: 18,
      ingredients: "tomato sauce, basil, parmesan",
    },
    { name: "Alfredo", price: 20, ingredients: "cream, chicken, mushroom" },
  ],
  dessert: [
    { name: "Tiramisu", price: 10, ingredients: "coffee, mascarpone, cocoa" },
    { name: "Cheesecake", price: 9, ingredients: "cream cheese, biscuit base" },
  ],
  drink: [
    { name: "Lemonade", price: 5, ingredients: "lemon, sugar, mint" },
    { name: "Iced Tea", price: 6, ingredients: "black tea, ice, lemon" },
  ],
};

const items = document.querySelectorAll(".menu-item");
const contentDiv = document.getElementById("menu-content");

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    const category = item.getAttribute("data-category");
    renderMenuItems(category);
  });
});

function renderMenuItems(category) {
  const items = menuData[category];
  contentDiv.innerHTML = "";

  const columns = [[], []];

  items.forEach((item, index) => {
    const html = `
      <div class="w-[300px] mx-auto">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">${item.name}</h1>
          <span class="leckerli text-lg text-yellow-400">$${item.price}</span>
        </div>
        <div class="border-t border-dashed border-[#666666] my-3"></div>
        <h3 class="port-slab text-xs text-left">${item.ingredients}</h3>
      </div>
    `;
    columns[index % 2].push(html);
  });

  contentDiv.innerHTML = `
    <div class="flex flex-col gap-8">${columns[0].join("")}</div>
    <div class="flex flex-col gap-8">${columns[1].join("")}</div>
  `;
}

renderMenuItems("pizza");
