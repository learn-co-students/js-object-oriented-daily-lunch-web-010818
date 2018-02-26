let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0


let store = { customers: [], meals: [], deliveries: [] , employers: [] };


class Employer{
  constructor(name){
    this.name = name;
    this.id = employerId++
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(elem=>{
      return elem.employerId == this.id
    })
  }

  deliveries(){
    return this.employees().map(elem=>{

      return elem.deliveries()[0]

    })
    }

   meals(){
    var m = this.deliveries().map(elem=>{
       return  elem.meal()
     })
     var final = [...new Set(m)]
     return final

   }


   mealTotals() {

     let allMeals = this.deliveries().map(delivery => {
       return 1
     });
     let summaryObject = {};
     allMeals.forEach(function(meal) {
       summaryObject[meal.id] = 0;
     });
     allMeals.forEach(function(meal) {
       summaryObject[meal.id] += 1;
     });
   // not workign  return summaryObject;
   }

}


class Customer{
  constructor(name, employer={}){
    this.name = name;
    this.employerId = employer.id;
    this.id = customerId++;
    store.customers.push(this);

  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  meals(){
    return this.deliveries().map(elem=>{
      return elem.meal()
    })
  }

  totalSpent(){
    return this.meals().reduce((a,b)=>{
      return a.price + b.price;
    })


  }
}




class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);

  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal1.price < meal2.price;
    });
  }
}

class Delivery{
  constructor(meal ={}, customer={}){
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = deliveryId++;
    store.deliveries.push(this)

   }
   customer(){
     return  store.customers.find(elem=>{
       return elem.id == this.customerId
     })
   }
   meal(){
     return  store.meals.find(elem=>{
       return elem.id == this.mealId
     })
   }
}
