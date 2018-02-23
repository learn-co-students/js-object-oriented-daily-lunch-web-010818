let store = {customers:[], meals:[], deliveries:[], employers:[]};
let customerId = 0;




class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if (employer){
      this.employerId = employer.id;
    }
    store.customers.push(this)
  };

  meals(){
    return this.deliveries().map(delivery => {return delivery.meal() })
  };

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  totalSpent(){
    let mealPrice = this.meals().map(meal => meal.price)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return mealPrice.reduce(reducer)

  };


}

let mealId = 0;
class Meal{

  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  };

  static byPrice(){
    return store.meals.sort((cheaperMeal, expensiveMeal) => {
      return cheaperMeal.price < expensiveMeal.price;
    });

  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    return this.deliveries().map(delivery => {return delivery.customer() })

  }


}

let deliveryId = 0;
class Delivery{
  constructor(meal, customer) {
    this.id = ++deliveryId;
    if (meal){
      this.mealId = meal.id;
    }
    if (customer){
      this.customerId = customer.id;
    }
    store.deliveries.push(this);
  };

  meal(){
    return store.meals.find(meal => this.mealId === meal.id)
  }

  customer(){
    return store.customers.find(customer => this.customerId === customer.id)
  }



}

let employerId = 0;
class Employer{
  constructor(name) {
   this.id = ++employerId;
   this.name = name;
   store.employers.push(this);
 }

 employees(){
   return store.customers.filter(customer => customer.employerId === this.id)
 }

 deliveries(){
   let allDeliveries = this.employees().map(customer => customer.deliveries())
   let mergeDeliveries = [].concat.apply([], allDeliveries);
   return mergeDeliveries

 }

 meals(){
   let allMeals = this.deliveries().map(delivery => delivery.meal());
   let unique = [...new Set(allMeals)];
   return unique;

 }

 mealTotals(){
   let allMeals = this.deliveries().map(delivery => delivery.meal());
   let result = {};
    allMeals.forEach(function(meal) {result[meal.id] = 0;});
    allMeals.forEach(function(meal) {result[meal.id] += 1;});
    return result
 }



}
