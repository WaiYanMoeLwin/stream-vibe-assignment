import { renderBackgroundMashup, renderPagination } from './utils.js';

fetch('temp/trailers.json').then( async response => {
    const trailersData = await response.json();
    const trailers = trailersData.items;
    console.log(trailers);

    const carousel = document.querySelector('#trailers-carousel');
    const paginationElement = carousel.querySelector('.pagination');

    renderPagination(paginationElement, trailers, 1, 1, carousel, renderTrailers, true);
});

fetch('temp/mock-movie-data.json').then( async response => {
    const moviesAndShows = await response.json();
    console.log(moviesAndShows);

    // Render the background mashup images
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShows);
})

// Render the trailers in the carousel
const renderTrailers = (carousel, trailers, currentPage, perPage) => {
    const trailer = trailers.slice((currentPage - 1) * perPage, currentPage * perPage)[0];
    console.log(trailer);
    const trailerTitle = carousel.querySelector('.trailer-title');
    trailerTitle.textContent = trailer.title;

    const trailerDescription = carousel.querySelector('.trailer-description');
    trailerDescription.textContent = trailer.description;

    console.log(trailerTitle, trailerDescription);

    const playButton = carousel.querySelector('.play-button');
    playButton.onclick = () => {
        // Implement the logic to play the trailer video
        console.log(`Playing trailer: ${trailer.title}`);
    };

    const addToWatchlistButton = carousel.querySelector('.add-to-watch-list-button');
    addToWatchlistButton.onclick = () => {
        // Implement the logic to add the trailer to the watchlist
        console.log(`Added to watchlist: ${trailer.title}`);
    };

    const likeButton = carousel.querySelector('.like-button');
    likeButton.onclick = () => {
        // Implement the logic to like the trailer
        console.log(`Liked trailer: ${trailer.title}`);
    };

    const muteButton = carousel.querySelector('.mute-button');
    muteButton.onclick = () => {
        if (muteButton.classList.contains('muted')) {
            muteButton.classList.remove('muted');
            muteButton.querySelector('img[alt="Unmute"]').classList.remove('hidden');
            muteButton.querySelector('img[alt="Mute"]').classList.add('hidden');
        } else {
            muteButton.classList.add('muted');
            muteButton.querySelector('img[alt="Unmute"]').classList.add('hidden');
            muteButton.querySelector('img[alt="Mute"]').classList.remove('hidden');
        }
        // Implement the logic to mute/unmute the trailer
        console.log(`Toggled mute for trailer: ${trailer.title}`);
    };

    carousel.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${trailer.poster})`;
    carousel.style.backgroundSize = 'cover';
    carousel.style.backgroundPosition = 'center';
    carousel.style.backgroundClip = 'padding-box';
}