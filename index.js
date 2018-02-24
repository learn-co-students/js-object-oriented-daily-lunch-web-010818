// new Customer() — initialized with both name, and an instance of an employer; returns a JavaScript object that has attributes of id, employerId, and name
// meals() - returns all of the meals that a customer has had delivered
// deliveries() — returns all of the deliveries that customer has received
// totalSpent() - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered
let store = { employers: [], customers: [], meals: [], deliveries: []}

let customerId = 0;

class Customer {
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if (employer) {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => (delivery.customer() === this))
  }

  meals(){
    return this.deliveries().map((delivery) => (delivery.meal()))
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total + meal.price), 0)
  }
}

let deliveryId = 0;

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal) => meal.id === this.mealId )
  }

  customer() {
    return store.customers.find((customer) => customer.id === this.customerId )
  }

}
let employerId = 0;

class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }

//   employees() - returns a list of customers employed by the employer
  employees() {
    return store.customers.filter((customer) => (customer.employerId === this.id))
  }
// deliveries() - returns a list of deliveries ordered by the employer's employees
  deliveries() {
    let allDeliveries = this.employees().map((employee) => employee.deliveries())
    return [].concat.apply([], allDeliveries);
  }
// meals() - returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
  meals() {
    let allMeals = this.deliveries().map((delivery) => (delivery.meal()))

    return allMeals.filter(function(meal, index){
      return allMeals.indexOf(meal)== index;
    });
  }
// mealTotals() - returns a JavaScript object displaying each respective meal id ordered by the employer's employees. The keys of the JavaScript object are the meal ids and associated with each meal id is a value. For example, employerOne.mealTotals() returning an object of {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times, and the meal with id of 2 was ordered by employerOne's employees three times.
  mealTotals() {
    let totals = {}
    let allMeals = this.deliveries().map((delivery) => (delivery.meal()))

    for (let meal of allMeals) {
      if (totals[meal.id]) {
        totals[meal.id] += 1;
      } else {
        totals[meal.id] = 1;
      }
    }
    return totals;
  }
}

let mealId = 0;

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function(meal1, meal2){
      return meal2.price - meal1.price
    })
  }

  deliveries() {
    return store.deliveries.filter((delivery) => (delivery.meal() === this))
  }

  customers() {
    return this.deliveries().map((delivery) => (delivery.customer()))
  }
}
