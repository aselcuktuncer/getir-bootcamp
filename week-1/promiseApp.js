//#region  Exapmle 1

// const promise1 = new Promise((resolve,reject) => {

//     resolve("Created");
//     reject("Not created");
// });

// promise1
//     .then((result) => {
//         console.log("Result", result);
//     })
//     .catch((err) => {
//         console.log("Error", err);
//     });

//#endregion

//#region  Example 3
const cars = [];

cars.push({brand:"Auidi", model:"A3"});
cars.push({brand:"BMW", model:"3.20"});
cars.push({brand:"Mercedes", model:"C200"});

const listCars = () => {
    cars.map((car) => {
        console.log("Brand: ", car.brand);
    });
};

const addCar = (newCar) => {
    const promise1 = new Promise((resolve,reject) => {
        cars.push(newCar);
        const message = "Car is added";
        resolve(message);
        reject("Car is not added")
    });

    return promise1;
};

addCar({brand:"Seat", model:"Ibiza"})
    .then((param) => {
        console.log("Param:" ,param);
        listCars();
    })
    .catch((err) => {
        console.log("Error", err);
    });

//#endregion