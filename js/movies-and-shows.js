import api from './api.js';
import { menuToggle, renderBackgroundMashup, renderGenres, renderPagination } from './utils.js';

const renderPage = async () => {
    // Fetch the data for movies and shows, genres, trending, new releases, and must-watch content
    const [
        trailersResponse,
        moviesAndShows,
        movieGenresResponse,
        showGenresResponse,
        popularMoviesResponse,
        popularShowsResponse,
        trendingMoviesResponse,
        trendingShowsResponse,
        newReleasesMoviesResponse,
        newReleasesShowsResponse,
        mustWatchMoviesResponse,
        mustWatchShowsResponse
    ] = await Promise.all([
        api.fetchTrailers(),
        api.fetchMoviesAndShows(),
        api.fetchGenres('movies'),
        api.fetchGenres('shows'),
        api.fetchPopularGenres('movies'),
        api.fetchPopularGenres('shows'),
        api.fetchTrendingNow('movies'),
        api.fetchTrendingNow('shows'),
        api.fetchNewReleases('movies'),
        api.fetchNewReleases('shows'),
        api.fetchMustWatch('movies'),
        api.fetchMustWatch('shows')
    ]);

    // Render the menu toggle functionality
    const menuButton = document.querySelector('header.main-header .menu');
    const navMenu = document.querySelectorAll('header.main-header nav');

    menuButton.addEventListener('click', () => {
        menuToggle(menuButton, navMenu);
    });
    
    // Render the background mashup images for free trial cta
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShows);

    // Render the trailers carousel
    const trailers = trailersResponse.items;
    
    const carousel = document.querySelector('#trailers-carousel');
    const paginationElement = carousel.querySelector('.pagination');
    renderPagination(paginationElement, trailers, 1, 1, carousel, renderTrailers);

    // Render the movie genres section
    const movieGenres = movieGenresResponse.genres;
    
    const moviesGenresSection = document.querySelector('#movies-genres');
    const paginationElementMovies = moviesGenresSection.querySelector('.pagination');
    const mainElementMovies = moviesGenresSection.querySelector('.genre-cards');

    let perPageMovies = 5;
    if (window.innerWidth < 1439) {
        perPageMovies = 4;
    }
    if (window.innerWidth < 1023) {
        perPageMovies = movieGenres.length; // Show all genres on smaller screens
    }
    
    renderPagination(paginationElementMovies, movieGenres, 1, perPageMovies, mainElementMovies, renderGenres);
    
    // Render the show genres section
    const showGenres = showGenresResponse.genres;

    const showsGenresSection = document.querySelector('#shows-genres');
    const paginationElementShows = showsGenresSection.querySelector('.pagination');
    const mainElementShows = showsGenresSection.querySelector('.genre-cards');

    let perPageShows = 5;
    if (window.innerWidth < 1439) {
        perPageShows = 4;
    }
    if (window.innerWidth < 1023) {
        perPageShows = showGenres.length; // Show all genres on smaller screens
    }
    
    renderPagination(paginationElementShows, showGenres, 1, perPageShows, mainElementShows, renderGenres);

    // Render the movie and show genres sections for popular content
    const popularMovies = popularMoviesResponse.genres;

    const popularMoviesSection = document.querySelector('#movies-popular-genres');
    const paginationElementPopularMovies = popularMoviesSection.querySelector('.pagination');
    const mainElementPopularMovies = popularMoviesSection.querySelector('.popular-genre-cards');

    let perPagePopularMovies = 4;
    if (window.innerWidth < 1023) {
        perPagePopularMovies = popularMovies.length; // Show all genres on smaller screens
    }
    renderPagination(paginationElementPopularMovies, popularMovies, 1, perPagePopularMovies, mainElementPopularMovies, renderGenres);

    const popularShows = popularShowsResponse.genres;
    const popularShowsSection = document.querySelector('#shows-popular-genres');
    const paginationElementPopularShows = popularShowsSection.querySelector('.pagination');
    const mainElementPopularShows = popularShowsSection.querySelector('.popular-genre-cards');
    let perPagePopularShows = 4;
    if (window.innerWidth < 1023) {
        perPagePopularShows = popularShows.length; // Show all genres on smaller screens
    }
    renderPagination(paginationElementPopularShows, popularShows, 1, perPagePopularShows, mainElementPopularShows, renderGenres);

    // Render the trending movies and shows sections
    const trendingMovies = trendingMoviesResponse.items;
    const trendingMoviesSection = document.querySelector('#movies-trending');
    const paginationElementTrendingMovies = trendingMoviesSection.querySelector('.pagination');
    const mainElementTrendingMovies = trendingMoviesSection.querySelector('.trending-cards');
    let perPageTrendingMovies = 5;
    if (window.innerWidth < 1439) {
        perPageTrendingMovies = 4;
    }
    if (window.innerWidth < 1023) {
        perPageTrendingMovies = trendingMovies.length; // Show all movies on smaller screens
    }
    renderPagination(paginationElementTrendingMovies, trendingMovies, 1, perPageTrendingMovies, mainElementTrendingMovies, renderContentCardsWithRuntimeAndViews);

    const trendingShows = trendingShowsResponse.items;
    const trendingShowsSection = document.querySelector('#shows-trending');
    const paginationElementTrendingShows = trendingShowsSection.querySelector('.pagination');
    const mainElementTrendingShows = trendingShowsSection.querySelector('.trending-cards');
    let perPageTrendingShows = 4;
    if (window.innerWidth < 1023) {
        perPageTrendingShows = trendingShows.length; // Show all shows on smaller screens
    }
    renderPagination(paginationElementTrendingShows, trendingShows, 1, perPageTrendingShows, mainElementTrendingShows, renderContentCardsWithRuntimeAndViews);

    // Render the new releases movies and shows sections
    const newReleasesMovies = newReleasesMoviesResponse.items;
    const newReleasesMoviesSection = document.querySelector('#movies-new-releases');
    const paginationElementNewReleasesMovies = newReleasesMoviesSection.querySelector('.pagination');
    const mainElementNewReleasesMovies = newReleasesMoviesSection.querySelector('.new-releases-cards');
    let perPageNewReleasesMovies = 5;
    if (window.innerWidth < 1439) {
        perPageNewReleasesMovies = 4;
    }
    if (window.innerWidth < 1023) {
        perPageNewReleasesMovies = newReleasesMovies.length; // Show all movies on smaller screens
    }
    renderPagination(paginationElementNewReleasesMovies, newReleasesMovies, 1, perPageNewReleasesMovies, mainElementNewReleasesMovies, renderContentCardsWithReleaseDate);

    const newReleasesShows = newReleasesShowsResponse.items;
    const newReleasesShowsSection = document.querySelector('#shows-new-releases');
    const paginationElementNewReleasesShows = newReleasesShowsSection.querySelector('.pagination');
    const mainElementNewReleasesShows = newReleasesShowsSection.querySelector('.new-releases-cards');
    let perPageNewReleasesShows = 4;
    if (window.innerWidth < 1023) {
        perPageNewReleasesShows = newReleasesShows.length; // Show all shows on smaller screens
    }
    renderPagination(paginationElementNewReleasesShows, newReleasesShows, 1, perPageNewReleasesShows, mainElementNewReleasesShows, renderContentCardsWithRuntimeAndSeasons);

    // Render the must-watch movies and shows sections
    const mustWatchMovies = mustWatchMoviesResponse.items;
    const mustWatchMoviesSection = document.querySelector('#movies-popular');
    const paginationElementMustWatchMovies = mustWatchMoviesSection.querySelector('.pagination');
    const mainElementMustWatchMovies = mustWatchMoviesSection.querySelector('.must-watch-cards');
    let perPageMustWatchMovies = 4;
    if (window.innerWidth < 1023) {
        perPageMustWatchMovies = mustWatchMovies.length; // Show all movies on smaller screens
    }
    renderPagination(paginationElementMustWatchMovies, mustWatchMovies, 1, perPageMustWatchMovies, mainElementMustWatchMovies, renderContentCardsWithRuntimeAndRating);

    const mustWatchShows = mustWatchShowsResponse.items;
    const mustWatchShowsSection = document.querySelector('#shows-popular');
    const paginationElementMustWatchShows = mustWatchShowsSection.querySelector('.pagination');
    const mainElementMustWatchShows = mustWatchShowsSection.querySelector('.must-watch-cards');
    let perPageMustWatchShows = 4;
    if (window.innerWidth < 1439) {
        perPageMustWatchShows = 3;
    }
    if (window.innerWidth < 1023) {
        perPageMustWatchShows = mustWatchShows.length; // Show all shows on smaller screens
    }
    renderPagination(paginationElementMustWatchShows, mustWatchShows, 1, perPageMustWatchShows, mainElementMustWatchShows, renderContentCardsWithRuntimeAndRating);

    // Render the active tab content to switch between movies and shows for smaller screens
    const activeTab = document.querySelector('.tab .tab-button.active');
    if (window.innerWidth < 1023 && activeTab) {
        const target = activeTab.dataset.target;
        const contentContainers = document.querySelectorAll('.content-container');
        contentContainers.forEach(container => {
            if (container.id === target) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }
}

// Render the content
const renderContentCards = (containerElement, entries, currentPage, perPage) => {
    // Clear existing content
    containerElement.innerHTML = '';

    // Render the content cards
    const entriesToRender = entries.slice((currentPage - 1) * perPage, entries.length < currentPage * perPage ? entries.length : currentPage * perPage);
    entriesToRender.forEach((entry) => {
        const card = document.createElement('div');
        card.classList.add('content-card');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('content-image-container');

        const img = document.createElement('img');
        img.classList.add('content-card-image');
        img.src = entry.poster;
        img.alt = entry.title;
        imgContainer.appendChild(img);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('content-info-container');

        card.appendChild(imgContainer);
        card.appendChild(infoContainer);

        card.addEventListener('click', () => {
            const type = entry.type;
            const id = entry.id;
            window.location.href = `content-detail.html?id=${id}`;
        });

        containerElement.appendChild(card);
    });
}

const renderContentCardsWithRuntimeAndSeasons = (containerElement, entries, currentPage, perPage) => {
    renderContentCards(containerElement, entries, currentPage, perPage);

    const cards = containerElement.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        const infoContainer = card.querySelector('.content-info-container');
        const entry = entries[(currentPage - 1) * perPage + index];

        if (entry.runtime) {
            addRuntimeToCard(infoContainer, entry);
        }
        if (entry.numberOfSeasons) {
            addSeasonsToCard(infoContainer, entry);
        }
    });
}

const renderContentCardsWithReleaseDate = (containerElement, entries, currentPage, perPage) => {
    renderContentCards(containerElement, entries, currentPage, perPage);
    
    const cards = containerElement.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        const infoContainer = card.querySelector('.content-info-container');
        const entry = entries[(currentPage - 1) * perPage + index];

        if (entry.releaseDate) {
            addReleaseDateToCard(infoContainer, entry);
        }
    });
}

const renderContentCardsWithRuntimeAndRating = (containerElement, entries, currentPage, perPage) => {
    renderContentCards(containerElement, entries, currentPage, perPage);

    const cards = containerElement.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        const infoContainer = card.querySelector('.content-info-container');
        const entry = entries[(currentPage - 1) * perPage + index];

        if (entry.runtime) {
            addRuntimeToCard(infoContainer, entry);
        }
        if (entry.starRating && entry.ratedBy) {
            addRatingToCard(infoContainer, entry);
        }
    });
}

const renderContentCardsWithRuntimeAndViews = (containerElement, entries, currentPage, perPage) => {
    renderContentCards(containerElement, entries, currentPage, perPage);

    const cards = containerElement.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        const infoContainer = card.querySelector('.content-info-container');
        const entry = entries[(currentPage - 1) * perPage + index];

        if (entry.runtime) {
            addRuntimeToCard(infoContainer, entry);
        }
        if (entry.views) {
            addViewsToCard(infoContainer, entry);
        }
    });
}

// Render the trailers in the carousel
const renderTrailers = (carousel, trailers, currentPage, perPage) => {
    const trailer = trailers.slice((currentPage - 1) * perPage, trailers.length < currentPage * perPage ? trailers.length : currentPage * perPage)[0];
    const trailerTitle = carousel.querySelector('.trailer-title');
    trailerTitle.textContent = trailer.title;

    const trailerDescription = carousel.querySelector('.trailer-description');
    trailerDescription.textContent = trailer.description;

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

const addRuntimeToCard = (cardInfoContainer, content) => {
    const runtime = document.createElement('div');
    runtime.classList.add('content-runtime', 'content-info');
    const runtimeIcon = document.createElement('img');
    runtimeIcon.src = 'public/images/icons/clock.svg';
    runtimeIcon.alt = 'Runtime';
    runtime.appendChild(runtimeIcon);
    const runtimeText = document.createElement('span');
    runtimeText.textContent = content.runtime;
    runtime.appendChild(runtimeText);

    cardInfoContainer.appendChild(runtime);
}

const addSeasonsToCard = (cardInfoContainer, content) => {
    const seasons = document.createElement('div');
    seasons.classList.add('content-seasons', 'content-info');
    const seasonsIcon = document.createElement('img');
    seasonsIcon.src = 'public/images/icons/stacks.svg';
    seasonsIcon.alt = 'Seasons';
    seasons.appendChild(seasonsIcon);
    const seasonsText = document.createElement('span');
    seasonsText.textContent = content.numberOfSeasons + ' Seasons';
    seasons.appendChild(seasonsText);

    cardInfoContainer.appendChild(seasons);
}

const addReleaseDateToCard = (cardInfoContainer, content) => {
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('content-release-date', 'content-info');
    const releaseDatePrefix = document.createElement('span');
    releaseDatePrefix.textContent = 'Released at ';

    const releaseDateText = document.createElement('span');
    releaseDateText.textContent = content.releaseDate;
    releaseDateText.style.color = "#bfbfbf";

    releaseDate.appendChild(releaseDatePrefix);
    releaseDate.appendChild(releaseDateText);

    cardInfoContainer.appendChild(releaseDate);
}

const addViewsToCard = (cardInfoContainer, content) => {
    const views = document.createElement('div');
    views.classList.add('content-views', 'content-info');
    const viewsIcon = document.createElement('img');
    viewsIcon.src = 'public/images/icons/eye.svg';
    viewsIcon.alt = 'Views';
    views.appendChild(viewsIcon);
    const viewsText = document.createElement('span');
    viewsText.textContent = content.views;
    views.appendChild(viewsText);

    cardInfoContainer.appendChild(views);
}

const addRatingToCard = (cardInfoContainer, content) => {
    const starRating = content.starRating;
    const ratedBy = content.ratedBy;

    const rating = document.createElement('div');
    rating.classList.add('content-rating', 'content-info');
    
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement('img');
        if (i <= Math.floor(starRating)) {
            starIcon.src = 'public/images/icons/star-filled.svg';
        } else if (i === Math.ceil(starRating) && starRating % 1 !== 0) {
            starIcon.src = 'public/images/icons/star-half-filled.svg';
        } else {
            starIcon.src = 'public/images/icons/star-empty.svg';
        }
        starIcon.alt = 'Star Rating';
        starContainer.appendChild(starIcon);
    }

    const ratedByText = document.createElement('span');
    ratedByText.textContent = `(${ratedBy})`;
    const units = ['K', 'M', 'B', 'T'];
    let formattedRatedBy = ratedBy;
    let unitIndex = -1;
    while (formattedRatedBy >= 1000 && unitIndex < units.length - 1) {
        formattedRatedBy /= 1000;
        unitIndex++;
    }
    if (unitIndex >= 0) {
        formattedRatedBy = formattedRatedBy.toFixed(1) + units[unitIndex];
    }
    ratedByText.textContent = `${formattedRatedBy}`;

    rating.appendChild(starContainer);
    rating.appendChild(ratedByText);

    cardInfoContainer.appendChild(rating);
}

const tabButtons = document.querySelectorAll('.tab .tab-button');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        const target = button.dataset.target;
        const contentContainers = document.querySelectorAll('.content-container');
        contentContainers.forEach(container => {
            if (container.id === target) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    });
});

renderPage();