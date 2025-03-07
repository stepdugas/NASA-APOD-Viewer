console.log("NASA APOD Viewer Loaded!");

const apiKey = "2CJT07Yp0EwHsmeGRowlYi9zlvQ0eSzxw151Epxj"
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

function fetchAPOD(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            return {
                title: data.title,
                url: data.url,
                explanation: data.explanation,
                mediaType: data.media_type
            };
        })
        .then(data => {
            document.getElementById("title").textContent = data.title;
            document.getElementById("explanation").textContent = data.explanation;

            let mediaContainer = document.getElementById("media-container");
            mediaContainer.innerHTML = "";

            if (data.mediaType === "image") {
                let imageElement = document.createElement("img");
                imageElement.src = data.url;
                imageElement.alt = "NASA APOD";
                imageElement.width = 600;
                mediaContainer.appendChild(imageElement);
            } else if (data.mediaType === "video"){
                let videoElement = document.createElement("iframe");
                videoElement.src = data.url;
                videoElement.width = 600;
                videoElement.height = 400;
                videoElement.allowFullscreen = true;
                mediaContainer.appendChild(videoElement);
            }

        });
}

fetchAPOD(apiUrl);

document.getElementById("fetch-button").addEventListener("click", function() {
    let selectedDate = document.getElementById("date-picker").value;
    console.log("Selected Date: ", selectedDate);

    if (selectedDate) {
        let dateApiUrl =  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;
        fetchAPOD(dateApiUrl);
    }
});