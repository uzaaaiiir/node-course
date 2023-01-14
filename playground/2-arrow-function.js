"use strict";

const square = function (x) {
    return x ** 2;
};

const squareArrow = (x) => {
    return x ** 2;
};

const squareAlt = (x) => x ** 2;

console.log(square(3));
console.log(squareArrow(3));
console.log(squareAlt(3));

// Arrow functions do not bind their own `this` value
const event = {
    name: "Birthday Party",
    guestList: ["Andrew", "Jen", "Mike"],
    printGuestList() {
        console.log("Guest List for " + this.name);
        // if we did this.guestList.forEach(function(){}) - this.name would be undefined
        this.guestList.forEach((guest) =>
            console.log(guest + " is attending " + this.name)
        );
    },
};

event.printGuestList();
