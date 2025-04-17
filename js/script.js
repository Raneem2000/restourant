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

  restartAnimation("slideText1", "animate-crazy-flip");
  restartAnimation("slideText2", "animate-crazy-flip");
  restartAnimation("slideText3", "animate-crazy-flip");
  restartAnimation("slideText4", "animate-crazy-flip");

  currentSlide = (currentSlide + 1) % slides.length;
}, 3000);

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

// navbar active link
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop();
  console.log("Current Path:", currentPath);

  document.querySelectorAll("#navss a").forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    console.log("Link Path:", linkPath);

    if (linkPath === currentPath) {
      link.classList.add("text-active");
      link.classList.remove("text-white");
    } else {
      link.classList.remove("text-active");
      link.classList.add("text-white");
    }
  });
});

// menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });
  }
});

// add to cart
const sidebarOrders = document.querySelector("#cartContent");
const subtotalElement = document.querySelector("#sidebar .subtotal");
let cartItems = [];

function addToCart(button) {
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cartItems.push({ name, price, qty: 1 });
  }

  renderCartItems();
  toggleSidebar(true);
}

function renderCartItems() {
  sidebarOrders.innerHTML = "";

  let subtotal = 0;

  cartItems.forEach((item) => {
    subtotal += item.price * item.qty;

    const itemDiv = document.createElement("div");
    itemDiv.className = "p-4 border-b border-gray-300";
    itemDiv.innerHTML = `
      <div class="text-xl font-semibold mb-3">${item.name}</div>
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center border border-gray-500 rounded-3xl px-3 py-1 gap-3">
          <button onclick="updateQty('${
            item.name
          }', -1)" class="text-gray-400 text-xl">-</button>
          <input type="text" value="${
            item.qty
          }" class="w-10 text-center outline-none bg-transparent text-lg" disabled />
          <button onclick="updateQty('${
            item.name
          }', 1)" class="text-gray-400 text-xl">+</button>
        </div>
        <div class="text-[#FFB30E] text-lg font-medium">$${(
          item.price * item.qty
        ).toFixed(2)}</div>
        <button onclick="removeItem('${item.name}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" class="fill-red-500 hover:scale-110 transition">
            <path d="M14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
          </svg>
        </button>
      </div>
    `;
    sidebarOrders.appendChild(itemDiv);
  });

  const subtotalElement = document.getElementById("subtotalAmount");
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  const cartContent = document.getElementById("cartContent");
  cartContent.classList.toggle("hidden", cartItems.length === 0);
}

function updateQty(name, delta) {
  const item = cartItems.find((item) => item.name === name);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cartItems = cartItems.filter((i) => i.name !== name);
  }

  renderCartItems();
}

function removeItem(name) {
  cartItems = cartItems.filter((item) => item.name !== name);
  renderCartItems();
}

function toggleSidebar(show = null) {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (show === true) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    if (overlay) overlay.classList.remove("hidden");
  } else if (show === false) {
    sidebar.classList.add("translate-x-full");
    sidebar.classList.remove("translate-x-0");
    if (overlay) overlay.classList.add("hidden");
  } else {
    sidebar.classList.toggle("translate-x-full");
    sidebar.classList.toggle("translate-x-0");
    if (overlay) overlay.classList.toggle("hidden");
  }
}
//open visa card form
function handlePaymentChange() {
  const selected = document.getElementById("payment").value;
  const visaForm = document.getElementById("visaForm");

  if (selected === "visa") {
    visaForm.classList.remove("hidden");
  } else {
    visaForm.classList.add("hidden");
  }
}
