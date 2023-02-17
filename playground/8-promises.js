// Callbacks
const doWorkCallBack = (callback) => {
    setTimeout(() => {
        // callback("This is my error", undefined);
        callback(undefined, [1, 4, 6]);
    }, 2000);
};

doWorkCallBack((error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result);
});

// Promises
const doWorkPromise = new Promise((resolve, reject) => {
    // resolve and reject are two separate functions provided by the Promise API
    setTimeout(() => {
        reject("An error has occured!");
        // resolve([11, 4, 2]);
    }, 2000);
});

// then only runs if resolve() is called
// if resolved, "Promise is fulfilled"
// catch only runs if reject() is called
// if rejected, "Promise is rejected"
// Until promise is completed, it is pending
doWorkPromise
    .then((result) => {
        console.log("Success", result);
    })
    .catch((error) => {
        console.log("Error!", error);
    });
