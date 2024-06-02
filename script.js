document.addEventListener('DOMContentLoaded', function() {
    const clients = [
        { src: './images/client1.png', alt: 'Client 1 Logo' },
        { src: './images/client2.png', alt: 'Client 2 Logo' },
        { src: './images/client3.png', alt: 'Client 3 Logo' },
        { src: './images/client4.png', alt: 'Client 4 Logo' },
        { src: './images/client5.png', alt: 'Client 5 Logo' },
        { src: './images/client6.png', alt: 'Client 6 Logo' }
    ];

    const sliderSection = document.getElementById('slider-section');

    const createClientList = (clients) => {
        const ulElement = document.createElement('ul');
        clients.forEach(client => {
            const liElement = document.createElement('li');
            const imgElement = document.createElement('img');
            imgElement.src = client.src;
            imgElement.alt = client.alt;
            liElement.appendChild(imgElement);
            ulElement.appendChild(liElement);
        });
        return ulElement;
    };

    // Create and append the initial client list
    sliderSection.appendChild(createClientList(clients));

    // Create and append the slider contents
    for (let i = 0; i < 10; i++) {
        sliderSection.appendChild(createClientList(clients));
    }
});

// Function to show video based on type
function showVideo(type) {
    // Pause all videos and hide them
    let videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
    });

    // Display and play the selected video
    let activeVideo = document.getElementById(type + 'Video');
    activeVideo.style.display = 'block';
    activeVideo.play();
}

// Initially hide all videos except the discriminative video
document.addEventListener('DOMContentLoaded', () => {
    let videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        if (video.id !== 'discriminativeVideo') {
            video.style.display = 'none';
        } else {
            video.play();
        }
    });
});

// Carousel functionality
const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
    isDragging = false,
    prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
