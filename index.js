const store = {customers:[], meals:[], deliveries:[], employers:[]};
let  customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    let mealIds = this.deliveries().map(delivery => delivery.mealId)
    return store.meals.filter( meal => mealIds.includes(meal.id))
  }

  totalSpent() {
    return this.meals().reduce(((total, meal) => total + meal.price),0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    let customerIds = this.deliveries().map(delivery => delivery.customerId)
    return store.customers.filter( customer => customerIds.includes(customer.id))
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
  }
}

class Delivery {
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    let employeeIds = this.employees().map(employee => employee.id)
    return store.deliveries.filter(delivery => employeeIds.includes(delivery.customerId))
  }

  meals() {
    let mealIds = this.deliveries().map( delivery => delivery.mealId)
    return store.meals.filter( meal => mealIds.includes(meal.id))
  }

  mealTotals() {
  let allMeals = this.deliveries().map(delivery => {
    return delivery.meal();
  });
  let summaryObject = {};
  allMeals.forEach(function(meal) {
    summaryObject[meal.id] = 0;
  });
  allMeals.forEach(function(meal) {
    summaryObject[meal.id] += 1;
  });
  return summaryObject;
}
}
