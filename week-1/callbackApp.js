// function createPerson() {
//     console.log("Selçuk Tunçer Oluşturuldu");
// }

// function createResidency(){
//     console.log("Selçuk Tunçer için Şişli Oluşturuldu");
// }

// createPerson();
// createResidency();


// let num = 0;

// function func1(callback) {
//     num += 10;
//     callback();
// }

// function func2(callback) {
//         setTimeout(() => {
//         num += 10;
//     }, 2000);
//     callback();
// }

// function func3() {
//     num += 10;
//     console.log("Num: ", num);
// }

// func1(func2());
// func2();
// func3();


const cars = [];

cars.push({brand:"Auidi", model:"A3"});
cars.push({brand:"BMW", model:"3.20"});
cars.push({brand:"Mercedes", model:"C200"});

const listCars = () => {
    cars.map((car) => {
        console.log("Car object =>", car);
    });
}

const addCar = (newCar, callback) => {
    // setTimeout(() => {
    //     cars.push(newCar);
    //     console.log("--------------------\n");
    //     callback();
    // }, 1000);
    cars.push(newCar);
    callback();
};

//listCars();

addCar({brand:"Seat", model:"Ibiza"},listCars);