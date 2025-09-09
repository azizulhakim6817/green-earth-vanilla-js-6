//! Loading end-----------------------------------------------
const loading = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("categories-card").classList.add("hidden");
  } else {
    document.getElementById("categories-card").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

//! categories html left-------------------------------------------
const categoryApi = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
categoryApi();

const displayCategory = (categories) => {
  const categoriesDiv = document.getElementById("categories-card");
  categoriesDiv.innerHTML = "";

  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <p id="category-${category.id}" 
         class="mt-2 mx-1 p-1 text-sm hover:bg-[#15803D] hover:text-white hover:rounded-lg hover:p-1 hover:px-2 hover:cursor-pointer">
         ${category.category_name}
      </p>
    `;
    categoriesDiv.append(categoryDiv);

    const p = document.getElementById(`category-${category.id}`);
    p.addEventListener("click", () => {
      categories.forEach((c) => {
        document.getElementById(`category-${c.id}`).classList.remove("active");
      });
      p.classList.add("active");
      categoryClickApi(category.id);
    });
  });
};

//! Category Click → Tree Data On clicking a category: load trees of that category.--
const categoryClickApi = (id) => {
  loading(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryClick(data.plants));
  loading(false);
};
//--callback function--
const displayCategoryClick = (plants) => {
  const plantsCard = document.getElementById("plants-card");
  plantsCard.innerHTML = "";

  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-3 bg-white mx-auto rounded-lg">
             <img class="w-full h-64 object-cover" src="${plant.image}" alt="${
      plant.plant_name
    }" />
             <h4 onclick="plantTreeDetailsModal(${
               plant.id
             })" class="my-2 text-lg font-semibold cursor-pointer">${
      plant.name
    }</h4>
              <p class="my-2 text-xs md:text-sm text-gray-600">
                ${plant.description.slice(0, 100)}...
              </p>
              <div class="flex justify-between items-center">
                <p class="text-sm px-4 py-1 rounded-full bg-[#DCFCE7]">
                 ${plant.category}
                </p>
                <p class="text-sm text-gray-400">${plant.price}</p>
              </div>
              <button
               onclick="addToCard(${plant.id}, '${plant.name}', ${plant.price})"
                class="w-full py-2 my-3 text-sm text-white bg-[#15803D] rounded-full"
              >
                Add to Card
              </button>
            </div>
    `;
    plantsCard.append(div);
  });
  loading(false);
};

//! All plans show---------------------------------------
const allPlansApi = async () => {
  loading(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  displayAllPlans(data.plants);
  loading(false);
};
allPlansApi();

const displayAllPlans = (plants) => {
  const plantsAllDiv = document.getElementById("plants-card");
  plantsAllDiv.innerHTML = "";
  plants.slice(0, 6).forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-3 bg-white mx-auto shadow-xl rounded-lg ">
             <img class="w-full h-64 object-cover rounded-lg" src="${
               plant.image
             }" alt="${plant.plant_name}"/>
          
              <h4 onclick="plantTreeDetailsModal(${
                plant.id
              })" class="my-2 text-lg font-semibold cursor-pointer hover:text-blue-500 ">${
      plant.name
    }</h4>
              <p class="my-2 text-xs md:text-sm text-gray-600">
                ${plant.description.slice(0, 100)}...
              </p>
              <div class="flex justify-between items-center">
                <p class="text-sm px-4 py-1 rounded-full bg-[#DCFCE7]">
                 ${plant.category}
                </p>
                <p class="text-sm text-gray-400">${plant.price}</p>
              </div>
              <button
              onclick="addToCard(${plant.id}, '${plant.name}', ${plant.price})"
                class="w-full py-2 my-3 text-sm text-white bg-[#15803D] rounded-full cursor-pointer"
              >
                Add to Card
              </button>
            </div>
  `;
    plantsAllDiv.append(div);
  });
  loading(false);
};

//! Add to Cart function ---------------------------
let cartItems = [];

const addToCard = (id, name, price) => {
  alert(`${name} has been added to the cart.`);
  cartItems.push({ id, name, price });
  updataCard();
};

const updataCard = () => {
  const cardList = document.getElementById("card-list");
  const totalPrice = document.getElementById("totalPrice");

  cardList.innerHTML = "";
  totalPrice.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="mt-4 p-2 flex justify-between items-center rounded-lg bg-[#f0fdf4]">
        <div>
          <h4 class="text-sm font-semibold">${item.name}</h4>
          <p class="mt-2 text-sm text-gray-400">৳${item.price}</p>
        </div>
        <div class="text-red-400 cursor-pointer" onclick="removeItem(${index})">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <hr class="mt-3 text-gray-300" />
    `;
    cardList.append(div);
  });

  totalPrice.innerHTML = `
    <div class="mt-1 p-2 flex justify-between items-center">
      <h4 class="text-sm font-semibold">Total:</h4>
      <p class="mt-2 text-sm text-gray-400">৳${total}</p>
    </div>
  `;
};

// Remove Items ---------
const removeItem = (index) => {
  cartItems.splice(index, 1);
  updataCard();
};

//! displayPlanModal----------------------------------
const plantTreeDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.plants.id);
      plantTreeDetailsModalID(data.plants);
    });
};

const plantTreeDetailsModalID = (plant) => {
  const myModal = document.getElementById("my_modal_1");
  myModal.innerHTML = `
     <div class="modal-box">
      <h3 class="text-lg font-semibold">${plant.name}</h3>
      <img src="${plant.image}" class="w-full h-64 object-cover rounded my-2"/>
       <p class="mt-4 mb-1 text-sm text-gray-500">Category: ${plant.category}</p>
      <p class="text-sm font-semibold">Price: ${plant.price}৳</p>
      <p class="py-2">${plant.description}</p>
     
      <div class="modal-action">
        <button class="btn" onclick="document.getElementById('my_modal_1').close()">Close</button>
      </div>
    </div>
  `;
  myModal.showModal();
};
