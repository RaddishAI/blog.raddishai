const apiUrl = "https://blog.raddishai.no/wp-json/wp/v2/recipe?per_page=15";

// Fetch products from API and pass them to the carousel
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProductsInCarousel(products); // Use the carousel display function
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function fetchImageById(imageId) {
    try {
        const response = await fetch(`https://blog.raddishai.no/wp-json/wp/v2/media/${imageId}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        const image = await response.json();
        return image.source_url; // Extract the URL of the image
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'default-image-url'; // Fallback in case the image can't be fetched
    }
}

// Call fetchProducts to load carousel items on page load
fetchProducts();

    /*
    fetch(apiUrl)
    .then(Response => {
        if (!Response.ok) {
            throw new Error ("API call respone was not ok");
        }
        return Response.json();
    })
    .then(userData => {
        console.log("User data: ", userData);
    })
    .catch(error => {
        console.error("Error:", error);
    });
    */