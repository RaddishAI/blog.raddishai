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

    products.forEach(product => {

        // Create a div for each product (carousel item)
        const productDiv = document.createElement('div');
        productDiv.className = 'carousel-item';
        productDiv.style.width = '100%'; // Each item takes full width of the carousel

        // Set the image source and alt text
        let imageUrl = 'default-image-url';
        let imgAltText = product.acf.imgalt || product.title.rendered;  // Default to title if imgalt is missing

        // Fetch product image URL dynamically
        if (product.acf && product.acf.image) {
            fetchImageById(product.acf.image).then(url => {
                imageUrl = url;

                // Use innerHTML to dynamically create the image element and product details
                productDiv.innerHTML = `
                    <a href="product-details.html?productId=${product.id}" class="product-link" style="text-decoration: none;">
                        <img src="${imageUrl}" alt="${imgAltText}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
                        <p style="text-align: center;">${product.acf.title || product.title.rendered}</p>
                    </a>
                `;
            });
        } else {
            // If there's no image, set innerHTML with a placeholder
            productDiv.innerHTML = `
                <a href="product-details.html?productId=${product.id}" class="product-link" style="text-decoration: none;">
                    <img src="${imageUrl}" alt="${imgAltText}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
                    <p style="text-align: center;">${product.acf.title || product.title.rendered}</p>
                </a>
            `;
        }

        // Append the product div to the carousel
        carouselSlide.appendChild(productDiv);
    });
}

// Sample function call (you'll need to pass your products array here)
fetchProducts();

// Function to call fetch products and pass it to the carousel
async function fetchProducts() {
    const apiUrl = "https://blog.raddishai.no/wp-json/wp/v2/recipe?per_page=15";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProductsInCarousel(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}