const imageFiles = [
    'code.jpg', 'gorp.jpg', 'logo.png', 'saper.jpg', 'snake.jpg',
    'dump_face.jpg'
];

const gallery = document.getElementById('galery');

imageFiles.forEach(fileName => {
    const figure = document.createElement('figure');
    figure.classList.add('gallery-item-container');

    const img = document.createElement('img');
    img.src = `img/${fileName}`;
    img.alt = fileName.replace(/\.[^/.]+$/, '');
    img.classList.add('gallery-item');

    const caption = document.createElement('figcaption');
    caption.textContent = img.alt;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);

    figure.addEventListener('click', () => {
        if (window.innerWidth <= 1023) { // mobile/tablet
            figure.classList.toggle('active');
        }
    });
});
