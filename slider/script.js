class Gallery {
    constructor(images, texts, imgElement, infoDiv) {
        this.images = images;
        this.texts = texts;
        this.imgElement = imgElement;
        this.infoDiv = infoDiv;
        this.index = 0;

        this.infoParagraph = document.createElement('p');
        this.updateImage();
    }

    updateImage() {
        this.imgElement.src = this.images[this.index];
        this.clearInfo();
    }

    clearInfo() {
        this.infoParagraph.innerText = '';
        this.infoDiv.append(this.infoParagraph);
    }

    showInfo() {
        this.infoParagraph.innerText = this.texts[this.index];
        this.infoDiv.append(this.infoParagraph);
    }

    next() {
        this.index++;
        if (this.index >= this.images.length) {
            this.index = 0;
        }
        this.updateImage();
    }

    previous() {
        this.index--;
        if (this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.updateImage();
    }
}

class RandomGallery extends Gallery {
    constructor(images, texts, imgElement, infoDiv) {
        super(images, texts, imgElement, infoDiv);
    }

    updateImage() {
        super.updateImage();
        console.log(`Показ изображения №${this.index + 1}`);
    }

    showRandom() {
        this.index = this.getRandomInt(this.images.length);
        this.updateImage();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

const buttonNazad = document.getElementById('nazad');
const buttonVpered = document.getElementById('vpered');
const buttonInfo = document.getElementById('info');
const buttonRandom = document.getElementById('random');
const imgElement = document.getElementById('kartinka');
const infoDiv = document.getElementById('block');

const images = [
    'kartinka 1.jpg',
    'kartinka 2.jpg',
    'kartinka 3.jpg',
    'kartinka 4.jpg',
    'kartinka 5.jpg'
];

const texts = [
    'text1',
    'text2',
    'text3',
    'text4',
    'text5'
];

// Используем наследника с полиморфизмом
const gallery = new RandomGallery(images, texts, imgElement, infoDiv);

// Привязываем события
buttonVpered.addEventListener('click', () => gallery.next());
buttonNazad.addEventListener('click', () => gallery.previous());
buttonInfo.addEventListener('click', () => gallery.showInfo());
buttonRandom.addEventListener('click', () => gallery.showRandom());
