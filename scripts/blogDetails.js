// Get the productId from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

// Function to fetch blog/product details based on the productId
async function fetchBlogDetails(productId) {
    const apiUrl = `https://blog.raddishai.no/wp-json/wp/v2/recipe/${productId}`; 
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch blog details');
        const blog = await response.json();
        return blog;
    } catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
}


async function fetchImageById(imageId) {
    try {
        const response = await fetch(`https://blog.raddishai.no/wp-json/wp/v2/media/${imageId}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        const image = await response.json();
        return image.source_url; // Return the image URL
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'default-image-url'; // Fallback image URL
    }
}

    async function displayBlogDetails() {
        const blog = await fetchBlogDetails(productId);
    
        if (blog) {

            document.title = `My Blog | ${blog.title.rendered}`;
            
            const imageUrl = await fetchImageById(blog.acf.image);
    
            const blogContent = `
                    <h1>${blog.title.rendered}</h1>
                    <h2>Funfacts</h2>
                    <p>${blog.acf.ingress}</p>
                    <div class="recipe-image-div">
                        <img id="recipe-image" src="${imageUrl}" alt="${blog.acf.imgalt || blog.title.rendered}" class="clickable-image">
                    </div>
                    <h3>Ingredients</h3>
                    <ul>${formatIngredients(blog.acf.ingredients)}</ul>
            `;

            document.getElementById('blog-details').innerHTML = blogContent;
    
            document.querySelector("#recipe-image").classList.add("specific-blog-image");
    

            setupImageModal(imageUrl, blog.acf.imgalt || blog.title.rendered);
        } else {
            document.getElementById('blog-details').innerHTML = "<p>Blog post not found</p>";
        }
    }

function formatIngredients(ingredients) {
    const ingredientsList = ingredients.split("\r\n").map(ingredient => `<li>${ingredient}</li>`);
    return ingredientsList.join("");
}

function setupImageModal(imageUrl, imgAltText) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.getElementsByClassName("close")[0];
    const blogImage = document.querySelector(".clickable-image");

    blogImage.onclick = function() {
        modal.classList.add('open');
        modalImg.src = imageUrl;
        modalImg.alt = imgAltText;
    };

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}


displayBlogDetails();