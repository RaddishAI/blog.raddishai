let currentSlide = 0;

function moveSlide(step) {
    const slides = document.getElementsByClassName('carousel-item');
    const totalSlides = slides.length;

    // Get the width of one slide
    const slideWidth = slides[0].offsetWidth;

    // Calculate the total width of the carousel-slide container dynamically
    document.getElementById('carousel-slide').style.width = `${totalSlides * slideWidth}px`;

    // Update current slide index
    currentSlide += step;

    // Prevent the carousel from going beyond the last item
    if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1; // Stay on the last slide
    } else if (currentS  lide < 0) {
        currentSlide = 0; // Stay on the first slide
    }

    // Move the .carousel-slide container to show the correct slide
    document.getElementById('carousel-slide').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

async function displayProductsInCarousel(products) {
    const carouselSlide = document.getElementById('carousel-slide');
    carouselSlide.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        // Create a div for each product (carousel item)
        const productDiv = document.createElement('div');
        productDiv.className = 'carousel-item';
        productDiv.style.width = '100%'; // Each item takes full width of the carousel

        // Create an anchor element to make the entire box clickable
        const productLink = document.createElement('a');
        productLink.href = `product-details.html?productId=${product.id}`;
        productLink.className = 'product-link';  // Optional class for styling
        productLink.style.textDecoration = 'none';  // Disable underline

        // Create the image element
        const productImage = document.createElement('img');
        let imageUrl = 'default-image-url';

        if (product.acf && product.acf.image) {
            fetchImageById(product.acf.image).then(url => {
                productImage.src = url;
            });
        }
        productImage.alt = product.acf.title || product.title.rendered;

        // Create a paragraph for the product name
        const productNameElement = document.createElement('p');
        productNameElement.textContent = product.acf.title || product.title.rendered;
        productNameElement.style.textAlign = 'center';  // Center the name

        // Append image and product name to the product link (both clickable)
        productLink.appendChild(productImage);
        productLink.appendChild(productNameElement);

        // Append the product link to the product div
        productDiv.appendChild(productLink);

        // Append the product div to the carousel
        carouselSlide.appendChild(productDiv);
    });
}