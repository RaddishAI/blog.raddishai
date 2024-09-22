const apiUrl = "https://blog.raddishai.no/wp-json/wp/v2/recipe?per_page=15";

// Fetch products from API and pass them to the carousel
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProductsInCarousel(products); 
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

/* async function fetchImageById(imageId) {
    try {
        const response = await fetch(`https://blog.raddishai.no/wp-json/wp/v2/media/${imageId}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        const image = await response.json();
        return image.source_url; // Extract the URL of the image
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'default-image-url'; // Fallback in case the image can't be fetched
    }
} */

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

    // generate pages based on arrays

    function displayBlogs() { 
        const postContainers = document.querySelectorAll('.post-container');
    
        data.forEach(product => {
            const generalProductElement = createGeneralProductElement(product);
            generateMoviePage(product); 
            postContainers.forEach(container => {
                let blogElement = generalProductElement.cloneNode(true);
            
                blogElement.addEventListener('click', () => {
                    localStorage.setItem('selectedRecipie', JSON.stringify(product));
                    window.location.href = `pages/specificBlogPage.html?id=${product.id}`;
                });
            
                container.appendChild(blogElement); 
            });
        });
    }

    function createGeneralProductElement(product) {
        const generalProductElement = document.createElement('div');
        generalProductElement.dataset.id = product.id; 
        
        generalProductElement.innerHTML =
        `
            <img src="${product.image}" alt="Cover of ${product.title}">
            <br>
            <h2>${product.title}</h2>
        `;
    
         generalProductElement.addEventListener('click', () => {
            localStorage.setItem('selectedRecipie', JSON.stringify(product));
            window.location.href = `pages/specificBlogPage.html?productId=${product.id}`;
        }); 
    
        return generalProductElement;
    }


    function generateBlogPage(product) {
        const blogPage = document.createElement('html');
        
        const imageUrl = product.image || 'default-image-url'; 
        const imgAltText = product.imgalt || product.title;
    
        blogPage.innerHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Raddishai - ${product.title}</title>
                <link rel="stylesheet" href="style.css">
                <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
            </head>
            <body>
                <div id="post-container">
                    <h2>${product.title}</h2>
                    <img src="${imageUrl}" alt="${imgAltText}">
                    <p>${product.acf.ingress}</p> <!-- Assuming ingress exists in product.acf -->
                </div>
                <script src="script.js"></script>
            </body>
            </html>
        `;
    }