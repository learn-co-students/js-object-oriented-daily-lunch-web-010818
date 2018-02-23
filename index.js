let store = {customers: [],
              deliveries: [],
              meals: [],
              employers: []
            };
let customerId = 0;
let deliveryId = 0;
let mealId = 0;
let employerId = 0;

class Customer {
  constructor(name, employer){
    this.name = name;
    this.id = ++customerId;
    if (employer){
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce(function(total, meal){return total + meal.price}, 0)
  }
}

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId;
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  }

  customer(){
    return store.customers.find(customer => customer.id == this.customerId);
  }
  meal(){
    return store.meals.find(meal => meal.id == this.mealId);
  }
}

class Meal {
  constructor(name, price){
    this.title = name;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice(){
    let meals = store.meals.slice()
    return meals.sort(function(a,b){return b.price - a.price })
  }
}

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId
    store.employers.push(this);
  }
  //  customers
  employees(){
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries(){
    let employerDeliveries = this.employees().map(employee => employee.deliveries());
    return [].concat.apply([], employerDeliveries);
  }

  meals(){
    let allMeals = this.deliveries().map(delivery => delivery.meal());
    let uniqueMeals = Array.from(new Set(allMeals));
    return uniqueMeals;
  }

  mealTotals(){
    let totals = {}
    let meals = this.deliveries().map(delivery => delivery.meal());
    meals.forEach(function(meal){
      if (totals[meal.id]){
        totals[meal.id]++
      } else {
        totals[meal.id] = 1;
      }
    })
    return totals;
  }

}
