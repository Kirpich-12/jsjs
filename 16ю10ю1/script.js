const button_nazad = document.getElementById('nazad');
const button_vpered = document.getElementById('vpered');
const img_kartinka = document.getElementById('kartinka');
const button_info = document.getElementById('info')
const button_random = document.getElementById('random')
const div = document.getElementById('block')
const img_arr = ['kartinka 1.jpg',
                 'kartinka 2.jpg',
                 'kartinka 3.jpg',
                 'kartinka 4.jpg',
                 'kartinka 5.jpg'];

const data_arr = ['text1',
                'text2',
                'text3',
                'text4',
                'text5'];
let item = 0;
img_kartinka.src = img_arr[item];
let data = document.createElement('p');


function perelist(){
    data.innerText = ''
    div.append(data)
    item ++;  
    if(item >= img_arr.length){
        item = 0;
    }
    img_kartinka.src = img_arr[item];
}

function nazadlist(){
    data.innerText = ''
    div.append(data)  
    item --;
    if(item < 0){
        item = img_arr.length - 1;
    }
    img_kartinka.src = img_arr[item];
}

function showInfo(){
    data.innerText = ''
    div.append(data)
    data.innerText = data_arr[item]
    div.append(data)

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function showRandom(){
    item = getRandomInt(5);
    img_kartinka.src = img_arr[item]

}

button_vpered.addEventListener('click', perelist);
button_nazad.addEventListener('click', nazadlist);
button_info.addEventListener('click', showInfo);
button_random.addEventListener('click', showRandom)