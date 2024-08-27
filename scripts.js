const apiUrl = "https://blog.raddishai.no/wp-json/wp/v2/recipe?per_page=15";

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