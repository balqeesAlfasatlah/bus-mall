'use strict';

let imgArray = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'


];




let ourInput = document.getElementById('formInput');
ourInput.addEventListener('submit', changeMax);
let userInput;
function changeMax(event) {

    userInput = event.target.inputUser.value;


}

if (userInput === "" || userInput === undefined || userInput > 25) {
    userInput = 25;
}



let counter = 0;
let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imgSection = document.getElementById('imgSection');
let myChart = document.getElementById('myChart');

function Images(name, src, view=0, vote=0) {
    this.name = name;
    this.src = src;
    this.view = view;
    this.vote = vote;
    Images.all.push(this);

}

Images.all = [];
for (let i = 0; i < imgArray.length; i++) {

    new Images(imgArray[i].split('.')[0], `./image/${imgArray[i]}`);




}
let leftIndex;
let rightIndex;
let middleIndex;
let newArray = [];
function render() {

    leftIndex = randomNumber(0, imgArray.length - 1);
    rightIndex = randomNumber(0, imgArray.length - 1);
    middleIndex = randomNumber(0, imgArray.length - 1);




    while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex || newArray.includes(leftIndex) ||
        newArray.includes(rightIndex) || newArray.includes(middleIndex)) {

        leftIndex = randomNumber(0, imgArray.length - 1);
        rightIndex = randomNumber(0, imgArray.length - 1);
        middleIndex = randomNumber(0, imgArray.length - 1);

    }

    leftImage.src = Images.all[leftIndex].src;
    rightImage.src = Images.all[rightIndex].src;
    middleImage.src = Images.all[middleIndex].src;


    Images.all[rightIndex].view++;
    Images.all[leftIndex].view++;
    Images.all[middleIndex].view++;


    newArray = [];
    newArray.push(leftIndex, rightIndex, middleIndex);
    console.log(newArray);

}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function drawChart() {

    let nameArr = [];
    let viewArr = [];
    let voteArr = [];

    for (let i = 0; i < Images.all.length; i++) {
        nameArr.push(Images.all[i].name);
        viewArr.push(Images.all[i].view);
        voteArr.push(Images.all[i].vote);
    }


    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArr,
            datasets: [{
                label: '# of Votes',
                data: viewArr,
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            },

            {

                label: '# of Votes',
                data: voteArr,
                backgroundColor: 'rgba(0, 99, 132, 0.2)'
            }]


        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

let btn;
function eventHandler(e) {

    if (counter < userInput) {

        if (e.target.id === 'leftImage') {
            Images.all[leftIndex].vote++;
        } else if (e.target.id === 'rightImage') {
            Images.all[rightIndex].vote++;
        } else if (e.target.id === 'middleImage') {
            Images.all[middleIndex].vote++;
        }
        render();
        localStorage.setItem('images', JSON.stringify(Images.all));
        counter++;

    } else if (counter >= userInput) {
        btn = document.getElementById('btn');
        btn.addEventListener('click', result);
        drawChart();
        imgSection.removeEventListener('click', eventHandler);




    }


   
 //   console.log(localStorage.getItem('images'));
   // console.log(Images.all);
}


render();

imgSection.addEventListener('click', eventHandler);

function getData() {
    let data = JSON.parse(localStorage.getItem('images'));
    if (data) {
        Images.all = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            new Images(data[i].name, data[i].src, data[i].view, data[i].vote);
        }

        console.log(Images.all)
    }

}

getData();

function result() {
    if (counter === userInput) {

        let ul = document.getElementById('list');
        for (let i = 0; i < Images.all.length; i++) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.textContent = `${Images.all[i].name}  viewed :  ${Images.all[i].view} and  have ${Images.all[i].vote} votes`


        }
    }



}


result();

changeMax();

