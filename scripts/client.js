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

const creaturesToCheckout = [];

function init() {
  console.log("READY");
  // display inventory on page when page loads
  render();
  // add event listener for add a new pet
  $(".js-add-new-pet-form").on("submit", addNewPet);
  // add event listener for purchase button
  $(".js-pet-card-container").on("click", ".js-btn-purchase", selectCreature);
}

function render() {
  // render the page inventory to page on initial page load
  $(".js-pet-card-container").empty();
  for (let i = 0; i < inventory.length; i++) {
    // format the price
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
  // display inventory on page
  render();
  // log inventory in the console to see if it matches the DOM
  console.log(inventory);
}

function selectCreature() {
  console.log("SELECT CREATURE");
  // log the index
  console.log($(this).data("index"));
  let petIndex = $(this).data("index");
  // delete the selected pet from inventory
  let selectPet = inventory.splice(petIndex, 1);
  // add the deleted pet to new global array for checkout
  creaturesToCheckout.push(...selectPet);
  // empty the checkout ul
  $(".js-select-list").empty();
  // render the selected pets on page
  let totalPrice = 0;
  for (let pet in creaturesToCheckout) {
    totalPrice += pet.price;
    // format the price
    // let petPrice = pet.price.toLocaleString(undefined, {
    //   minimumFractionDigits: 2
    // });
    // display selected pets on page
    $(".js-select-list").append(`
    <li class="list-group-item">${pet.name} - $${pet.price}</li>
    `);
  }
  // add total price at the end
  $(".js-select-list").append(`
  <li class="list-group-item list-group-item-success">Total Price - $${totalPrice}</li>
    `);
  render();
}
