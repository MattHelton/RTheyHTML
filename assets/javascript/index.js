document.addEventListener('DOMContentLoaded', () => {
    const choiceElement = document.getElementById('choice');
    const nameElement = document.getElementById('name');
    const seasonElement = document.getElementById('season');
    const episodeElement = document.getElementById('episode');
    const fetchCastButton = document.getElementById('fetch-cast');
    const castListDiv = document.getElementById('cast-list');
    const filmographyListDiv = document.getElementById('filmography-list');

    const API_KEY = '2d445909725eb9b4cc3bff29a8a6b4ab'; // Replace with your actual API key
    const BASE_URL = 'https://api.themoviedb.org/3';

    choiceElement.addEventListener('change', () => {
        if (choiceElement.value === 'TV Show') {
            document.getElementById('season-info').style.display = 'block';
        } else {
            document.getElementById('season-info').style.display = 'none';
        }
    });

    fetchCastButton.addEventListener('click', async () => {
        const choice = choiceElement.value;
        const name = nameElement.value;
        let url = `${BASE_URL}/search/${choice.toLowerCase()}?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;

        try {
            const searchResponse = await fetch(url);
            const searchData = await searchResponse.json();
            const id = searchData.results[0].id;

            url = `${BASE_URL}/${choice.toLowerCase()}/${id}/credits?api_key=${API_KEY}`;
            if (choice === 'TV Show') {
                const season = seasonElement.value;
                const episode = episodeElement.value;
                if (season) url += `&season_number=${season}`;
                if (episode) url += `&episode_number=${episode}`;
            }

            const castResponse = await fetch(url);
            const castData = await castResponse.json();
            displayCast(castData.cast);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    function displayCast(cast) {
        castListDiv.innerHTML = '';
        cast.forEach(actor => {
            const div = document.createElement('div');
            div.textContent = `${actor.name} as ${actor.character}`;
            castListDiv.appendChild(div);
        });
    }

    // Add more functions to handle filmography and other interactions as needed
});