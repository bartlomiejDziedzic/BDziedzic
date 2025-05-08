
const imageFiles = [
    'code.jpg', 'gorp.jpg', 'logo.png', 'saper.jpg', 'snake.jpg',
    'dump_face.jpg'
];

const gallery = document.getElementById('galery');

imageFiles.forEach(fileName => {
    const img = document.createElement('img');
    img.src = `img/${fileName}`;
    img.alt = fileName.replace(/\.[^/.]+$/, ''); // np. "1"
    img.classList.add('gallery-item');          // dodaj klasę do stylizacji
    gallery.appendChild(img);
});
