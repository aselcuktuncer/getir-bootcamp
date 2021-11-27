// const func = async () => {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Done!");
//         }, 2000);
//     });
//     let result = await promise;
    
//     console.log("Result:", result);
// };

// func().then((res) =>{

// });

const cars = [
    {brand:"Mercedes",name:"C200"},
    {brand:"Audi",name:"A3"},
    {brand:"BMW",name:"3.20"}
];

// const listCars = async () => {
   
//     return cars;
// }

// const listCars = async () => {
//     const cars = await listCars();

//     cars.map((car) => {
//         console.log("Car:",car.name);
//     });
// }

const addCar = async (newCar) => {
    const promise1 = new Promise((resolve,reject)=>{
        console.log("Car is adding..")
        setTimeout(() => {
            cars.push(newCar);
            resolve("Car is added!");
        }, 2000);
        
    });
    return promise1;
}

async function showCars() {
    try {
        console.log("addCar will be invoked")
        await addCar({brand:"Seat",name:"Ibiza"}).then((res)=> {
            console.log(res)
        });
        console.log("addCar is invoked")
        console.log("Cars:", cars)
    } catch (error) {
        console.log("Error:", error)
    }
}

showCars().then((res) => {
    // console.log(res);
});