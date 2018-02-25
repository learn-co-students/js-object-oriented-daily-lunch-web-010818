let store = {customers: [], employers: [], deliveries: [], meals: []}
let employerId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Employer {
  constructor (name){
    this.name = name;
    this.id = ++employerId
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => {
      return customer.employer === this
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.employees().includes(delivery.customer())
    })
  }
  meals(){
    let results = []
    this.deliveries().forEach(delivery => {
      if (!results.includes(delivery.meal())){
        results.push(delivery.meal())
      }
    })
    return results
  }
  allmeals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  mealTotals(){
    let results = {}
    this.allmeals().forEach(meal =>{
      if (results[meal.id]){
        results[meal.id] += 1
      } else {
        results[meal.id] = 1
      }
    })
    return results;
  }
}

class Customer {
  constructor (name, employer){
    this.name = name;
    this.employer = employer;
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter((delivery) =>{
      return delivery.customerId === this.id
    })
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent(){
    return this.meals().reduce((total, meal) => {
      return total + meal.price
    },0)
  }
}

class Meal {
  constructor (title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  static byPrice(){
     return store.meals.sort((a, b) => {
      return b.price > a.price
    })
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map(delivery =>{
      return delivery.customer()
    })
  }
}

class Delivery {
  constructor (meal, customer){
    this.id = ++deliveryId;
    store.deliveries.push(this)
    if(meal){
      this.mealId = meal.id
    }
    if(customer){
      this.customerId = customer.id
    }
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
  }
  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId
    })
  }
}
