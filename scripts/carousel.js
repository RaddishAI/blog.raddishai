let currentSlide = 0;

function moveSlide(step) {
    const slides = document.getElementsByClassName('carousel-item');
    const totalSlides = slides.length;

    // Get the width of one slide
    const slideWidth = slides[0].offsetWidth;


    document.getElementById('carousel-slide').style.width = `${totalSlides * slideWidth}px`;


    currentSlide += step;

    // Prevent the carousel from going beyond the last item
    if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1; // Stay on the last slide
    } else if (currentSlide < 0) {
        currentSlide = 0; // Stay on the first slide
    }

    document.getElementById('carousel-slide').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

async function fetchImageById(imageId) {
    try {
        const response = await fetch(`https://blog.raddishai.no/wp-json/wp/v2/media/${imageId}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        const image = await response.json();
        return image.source_url; // Return the image URL
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

async function displayProductsInCarousel(products) {
    const carouselSlide = document.getElementById('carousel-slide');
    carouselSlide.innerHTML = ''; 

    for (const product of products) {
        const productDiv = document.createElement('div');
        productDiv.className = 'carousel-item';
        productDiv.style.width = '100%';

        let imageUrl = 'default-image-url'; 
        let imgAltText = product.acf.imgalt || product.title.rendered;  

        if (product.acf && product.acf.image) {
            try {
                imageUrl = await fetchImageById(product.acf.image);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        productDiv.innerHTML = `
        <a href="pages/specificBlogPage.html?productId=${product.id}" class="product-link">
            <img src="${imageUrl}" alt="${imgAltText}" class="product-img">
            <p class="product-title">${product.acf.title || product.title.rendered}</p>
        </a>
    `;

        carouselSlide.appendChild(productDiv);
    }
}