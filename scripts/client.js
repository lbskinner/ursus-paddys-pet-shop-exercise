console.log("Paddy's Pet Shop");
$(document).ready(init);

const inventory = [
  {
    name: "Niffler",
    type: "domestic",
    price: 550,
    notes:
      "Has a tendency to get into trouble pilfering valuables from anywhere and anyone it lays its eyes on."
  },
  {
    name: "Murtlap",
    type: "wild",
    price: 250,
    notes:
      "Fleshy rodent like creature. Beware it's bite because it may cause hallucinations."
  },
  {
    name: "Billywig",
    type: "wild",
    price: 148,
    notes:
      "When stung the person will suffer from a giddiness and eventually spontaneous floating."
  },
  {
    name: "Graphorns",
    type: "mounted",
    price: 1456,
    notes: "Has a tough hide said to be more durable than that of a dragon."
  },
  {
    name: "Thunderbird",
    type: "combat",
    price: 5230,
    notes:
      "Said to be able to sense danger from far off and can wipe the memories of extremely large groups of people."
  }
];

// create global variable to store pets selected before checkout
const creaturesToCheckout = [];

//create global variable to store customer purchase information
const customerPurchases = [];

function init() {
  console.log("READY");
  // display inventory on page when page loads
  render();
  // create event listener for add a new pet
  $(".js-add-new-pet-form").on("submit", addNewPet);
  // create event listener for purchase button
  $(".js-pet-card-container").on("click", ".js-btn-purchase", selectCreature);
  // create event listen for checkout button
  $(".js-btn-checkout").on("click", checkoutPurchase);
}

function render() {
  // render the page inventory to page on initial page load
  $(".js-pet-card-container").empty();
  for (let i = 0; i < inventory.length; i++) {
    // format the price to 0,000.00
    let petPrice = inventory[i].price.toLocaleString(undefined, {
      minimumFractionDigits: 2
    });
    // display the inventory on page
    $(".js-pet-card-container").append(`
      <div class="col-4 mb-3 px-2">

        <div class="card">
          <h5 class="card-header">$${petPrice}</h5>
          <div class="card-body">
            <h5 class="card-title">${inventory[i].name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${inventory[i].type}</h6>
            <p class="card-text">${inventory[i].notes}</p>
            <button class="btn btn-primary btn-block js-btn-purchase" data-index=${i}>Purchase</button>
          </div>
        </div>

      </div>
  `);
  }
  //display selected pets
  // empty the checkout ul
  $(".js-select-list").empty();
  // create variable total price
  let totalPrice = 0;
  // render the selected pets on page
  for (let pet of creaturesToCheckout) {
    // total price equals to the sum of all individual pets selected
    totalPrice += pet.price;
    // format the price 0,000.00
    let petPrice = pet.price.toLocaleString(undefined, {
      minimumFractionDigits: 2
    });
    // display selected pets on page
    $(".js-select-list").append(`
    <li class="list-group-item">${pet.name} - $${petPrice}</li>
    `);
  }
  // format total price
  totalPrice = totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2
  });
  // display total price at the end
  $(".js-select-list").append(`
  <li class="list-group-item list-group-item-success">Total Price: $${totalPrice}</li>
    `);
}

function addNewPet(event) {
  // prevent the default reload the page
  event.preventDefault();
  const newPet = {
    name: $(".js-name-input").val(),
    type: $(".js-input-type").val(),
    price: Number($(".js-input-price").val()),
    notes: $(".js-input-notes").val()
  };
  // add new pet to inventory
  inventory.push(newPet);
  // clear all input fields
  $(".js-name-input").val("");
  $(".js-input-type").val("");
  $(".js-input-price").val("");
  $(".js-input-notes").val("");
  // display inventory on page
  render();
  // log inventory in the console to see if it matches the DOM
  console.log("INVENTORY AFTER ADD NEW PET: ", inventory);
}

function selectCreature() {
  console.log("SELECT CREATURE");
  // log the index
  let petIndex = $(this).data("index");
  // delete the selected pet from inventory
  let petSelected = inventory.splice(petIndex, 1);
  // add the deleted pet to new global array for checkout
  creaturesToCheckout.push(...petSelected);
  // log inventory to make sure the selected pet has been removed
  console.log("INVENTORY AFTER SELECT PET:", inventory);
  // log creaturesToCheckout to make sure the selected pet has been added
  console.log("SELECTED PETS:", creaturesToCheckout);
  // render the inventory to reflect changes
  render();
}

function checkoutPurchase(event) {
  // prevent the default reload the page
  event.preventDefault();
  console.log("CHECKOUT");
  // require inputs since the default required prop not working
  if (
    !$(".js-input-customer-fname").val() ||
    !$(".js-input-customer-lname").val() ||
    !$(".js-input-customer-phone-number").val()
  ) {
    alert("Please make sure to fill out all the fields!");
    return;
  } else {
    // create object to store customer purchase information
    const individualCustomerPurchase = {
      firstName: $(".js-input-customer-fname").val(),
      lastName: $(".js-input-customer-lname").val(),
      phone: $(".js-input-customer-phone-number").val(),
      petsPurchased: creaturesToCheckout.splice(0, creaturesToCheckout.length)
    };
    customerPurchases.push(individualCustomerPurchase);
    // log customer purchases
    console.log("CUSTOMER PURCHASES: ", customerPurchases);
    // log selected pets to make sure it's an empty array
    console.log("PETS SELECTED AFTER CHECKOUT ", creaturesToCheckout);
    // removed all pets under select creatures and leave the update total of $0
    $(".js-select-list").empty();
    $(".js-select-list").append(`
  <li class="list-group-item list-group-item-success">Total Price: $0.00</li>
    `);
    // clear all customer input fields
    $(".js-input-customer-fname").val("");
    $(".js-input-customer-lname").val("");
    $(".js-input-customer-phone-number").val("");
    // call display purchases function
    displayAllTransactions();
  }
}

function displayAllTransactions() {
  console.log("DISPLAY ALL TRANSACTIONS");
  // empty table before add transactions
  $(".js-purchase-table").empty();
  // add transactions to table
  for (let transaction of customerPurchases) {
    for (let pet of transaction.petsPurchased) {
      $(".js-purchase-table").append(`
    <tr>
      <td>${pet.name}</td>
      <td>${pet.price.toLocaleString(undefined, {
        minimumFractionDigits: 2
      })}</td>
      <td>${pet.type}</td>
      <td>${transaction.firstName} ${transaction.lastName}</td>
      <td>${transaction.phone}</td>
    </tr>
    `);
    }
  }
}
