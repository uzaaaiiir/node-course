// ASYNC AWAIT

// async marks the function as an asynchronous function

// async functions always return a promise
const doWork = async function () {
    // Rejecting the Promise
    // throw new Error("Error");

    // Resolving the Promise
    return "Andrew";
};

console.log(doWork()); // returns Promise{'Andrew'}

doWork()
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((e) => {
        console.log("e:", e);
    });

// AWAIT
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) reject("Numbers must be non-negative");
            resolve(a + b);
        }, 2000);
    });
};

// Using await helps in reducing the complexity of promise chaining
// Waits for the previous promise to be fulfilled/rejected, before proceeding
const doWork2 = async () => {
    const sum = await add(51, 3);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -3);
    return sum3;
};

doWork2()
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((e) => {
        console.log("e:", e);
    });
