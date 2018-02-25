const store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
class Customer {
  constructor(name, employer) {
    if (name) {
      this.name = name;
    }
    if (employer) {
      this.employerId = employer.id;
    }
    this.id = ++customerId;
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries
    .filter((delivery) => {
      return delivery.customerId === this.id;
    });
  }
  meals() {
    return this.deliveries()
      .map((delivery) => {
        return delivery.meal();
      });
  }
  totalSpent() {
    return this.meals().reduce((sum, meal) => {
      return sum + meal.price;
    }, 0)
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries
      .filter((delivery) => {
        return delivery.mealId === this.id;
      })
  }
  customers() {
    return this.deliveries()
      .map((delivery) => {
        return delivery.customer();
      })
  }
  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price;
    })
  }
}

let deliveryId = 0;
class Delivery {
  constructor(meal, customer) {
    if (meal && customer) {
      this.mealId = meal.id;
      this.customerId = customer.id;
    }
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    const mealArr = store.meals
      .filter((meal) => {
        return meal.id === this.mealId;
      });
    return mealArr[0];
  }
  customer() {
    const customerArr = store.customers
      .filter((customer) => {
        return customer.id === this.customerId
      });
    return customerArr[0];
  }
}

let employerId = 0;
class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
  }
  employees() {
    return store.customers.filter((customer) => {
      return customer.employerId === this.id;
    })
  }
  deliveries() {
    return this.employees().reduce((arr, employee) => {
      return arr.concat(employee.deliveries())
    }, []);
  }
  allMeals() {
    return this.deliveries().map((delivery) => {
      return delivery.meal();
    })
  }
  meals() {
    let allMeals = this.allMeals()
    let uniqueMeals = []
    for (let i = 0; i < allMeals.length; i++) {
      if (!uniqueMeals.includes(allMeals[i])) {
        uniqueMeals.push(allMeals[i])
      }
    }
    return uniqueMeals;
  }
  mealTotals() {
    let counter = {}
    let deliveries = this.deliveries()  //deliveries is an array
    for (let delivery of deliveries) {
      counter[delivery.mealId] ? counter[delivery.mealId] += 1 : counter[delivery.mealId] = 1
    }
    return counter;
  }
}
