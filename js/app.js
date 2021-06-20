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

let counter = 0;
let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let imgSection = document.getElementById('imgSection');

function Images(name, src) {
    this.name = name;
    this.src = `./image/${src}`;
    this.view = 0;
    this.vote = 0;
    Images.all.push(this);

}

Images.all = [];
for (let i = 0; i < imgArray.length; i++) {

    new Images(imgArray[i].split('.')[0], imgArray[i]);


}
let leftIndex ;
let rightIndex;
let middleIndex;

function render() {

     leftIndex = randomNumber(0, imgArray.length - 1);
     rightIndex = randomNumber(0, imgArray.length - 1);
     middleIndex = randomNumber(0, imgArray.length - 1);




    while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex) {

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




}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function eventHandler(e) {
   
     if(counter <25){

        if(e.target.id === 'leftImage'){
            Images.all[leftIndex].vote++;
        }else if (e.target.id === 'rightImage'){
            Images.all[rightIndex].vote++;
        }else if (e.target.id === 'middleImage'){
            Images.all[middleIndex].vote++;
        }
        render();
        counter++;
    }else if(counter === 25){
        imgSection.removeEventListener('click',eventHandler);
        
    }
    
}
render();

imgSection.addEventListener('click', eventHandler);


function result(){
    if(counter === 25){

        let ul = document.getElementById('list');
        for (let i = 0; i < Images.all.length; i++) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.textContent = `${Images.all[i].name}  viewed :  ${Images.all[i].view} and  have ${Images.all[i].vote} votes`

           
        }
    }

    

}




