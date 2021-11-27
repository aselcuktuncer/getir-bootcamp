// var moment = require('moment');

// console.log("Moment:", moment().format());

// console.time();

// var p1 = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve("Res one")
//     }, 4000);
// });

// var p2 = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         reject("Res two")
//     }, 3000);
// });

// var p3 = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve("Res three")
//     }, 2000);
// });

// var p4 = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve("Res four")
//     }, 1000);
// });

// var p5 = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve("Res five")
//     }, 1000);
// });

// var promises = [];
// promises.push(p1);
// promises.push(p2);
// promises.push(p3);
// promises.push(p4);
// promises.push(p5);

// Promise.all(promises)
//     .then((response) => {
//     console.timeEnd();
//     console.log("Response:", response);
//     })
//     .catch((err) => {
//         console.log("Error:", err);
//     })

const cars = [
        {brand:"Mercedes"},
        {brand:"Tesla"},
        {brand:"Audi"},
        {brand:"BMW"}]

var promises = []
for(const carItems of cars){
    var promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(carItems)
        }, 1000);
    });
    promises.push(promise)
}

Promise.all(promises)
    .then((response) => {
    console.timeEnd();
    console.log("Response:", response);
    })
    .catch((err) => {
        console.log("Error:", err);
    })