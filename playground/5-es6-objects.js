// Object property shorthand

const name = "Andrew";
const userAge = 24;
const location = "Toronto, ON";

const user = {
    name,
    userAge,
    location,
};

console.log(user);

// Destructuring
const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined,
};

const { label: productLabel, price, stock, salePrice = 15 } = product;
console.log(productLabel);
console.log(price);
console.log(stock);
console.log(salePrice);

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
};

transaction("order");
transaction("order", product);
