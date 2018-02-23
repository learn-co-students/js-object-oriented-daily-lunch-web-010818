let store = {customers: [], meals:[], deliveries:[], employers:[]}
let customerId = 0
class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return this.id === delivery.customerId
    }.bind(this))
  }
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }
  totalSpent() {
    return this.meals().reduce(function(prev, curr) {
      return prev + curr.price
    }, 0)
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
     this.title = title
     this.price = price
     this.id = ++mealId
     store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return this.id === delivery.mealId
    }.bind(this))
  }
  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    })
  }
  static byPrice() {
    return store.meals.slice().sort(function (a,b) {
      return b.price - a.price
    })

  }
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(function(meal) {
      return this.mealId === meal.id
    }.bind(this))
  }
  customer() {
    return store.customers.find(function(customer) {
      return this.customerId === customer.id
    }.bind(this))
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(function(customer) {
      return this.id === customer.employerId
    }.bind(this))
  }
  deliveries() {
    let array = []
    this.employees().map(function(employee) {
      employee.deliveries().forEach(function(delivery) {
        array.push(delivery)
      })
    })
    return array
  }
  meals() {
    let results = []
    this.deliveries().map(function(delivery) {
      if (!results.includes(delivery.meal())) {
        results.push(delivery.meal())
      }
    })
    return results
  }
  mealTotals() {
    let results = {}
    this.deliveries().forEach(function(delivery) {
      if(!results[delivery.mealId]) {
        results[delivery.mealId] = 1
      } else {
        results[delivery.mealId]++
      }
    })
    return results;
  }
}
