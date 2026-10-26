import { renderBackgroundMashup, renderGenres, renderPagination } from './utils.js';

fetch('temp/trailers.json').then( async response => {
    const trailersData = await response.json();
    const trailers = trailersData.items;
    console.log('Fetched trailers:', trailers);

    const carousel = document.querySelector('#trailers-carousel');
    const paginationElement = carousel.querySelector('.pagination');

    renderPagination(paginationElement, trailers, 1, 1, carousel, renderTrailers);
});

fetch('temp/mock-movie-data.json').then( async response => {
    const moviesAndShows = await response.json();
    console.log('Fetched movies and shows:', moviesAndShows);

    // Render the background mashup images
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShows);
});

fetch('temp/movie-genres.json').then(async response => {
    const movieGenresData = await response.json();
    const movieGenres = movieGenresData.genres;
    console.log('Fetched movie genres:', movieGenres);

    const moviesGenresSection = document.querySelector('#movies-genres');
    const paginationElement = moviesGenresSection.querySelector('.pagination');
    const mainElement = moviesGenresSection.querySelector('.genre-cards');

    let perPage = 5;
    if (window.innerWidth < 1439) {
        perPage = 4;
    }
    
    renderPagination(paginationElement, movieGenres, 1, perPage, mainElement, renderGenres);
});

fetch('temp/show-genres.json').then(async response => {
    const showGenresData = await response.json();
    const showGenres = showGenresData.genres;
    console.log('Fetched show genres:', showGenres);

    const showsGenresSection = document.querySelector('#shows-genres');
    const paginationElement = showsGenresSection.querySelector('.pagination');
    const mainElement = showsGenresSection.querySelector('.genre-cards');
    
    let perPage = 5;
    if (window.innerWidth < 1439) {
        perPage = 4;
    }
    renderPagination(paginationElement, showGenres, 1, perPage, mainElement, renderGenres);
});

fetch('temp/popular-movie-by-genre.json').then(async response => {
    const popularMoviesData = await response.json();
    const popularMovies = popularMoviesData.genres;
    console.log('Fetched popular movies:', popularMovies);

    const popularMoviesSection = document.querySelector('#movies-popular-genres');
    const paginationElement = popularMoviesSection.querySelector('.pagination');
    const mainElement = popularMoviesSection.querySelector('.popular-genre-cards');
    
    renderPagination(paginationElement, popularMovies, 1, 4, mainElement, renderGenres);

    const genreCards = mainElement.querySelectorAll('.genre-item-container');
    genreCards.forEach((card, index) => {
        const top10Tag = document.createElement('div');
        top10Tag.classList.add('top-10-tag');
        top10Tag.textContent = 'Top 10 In';
        const genreTitleContainer = card.querySelector('.genre-title-container');
        card.insertBefore(top10Tag, genreTitleContainer);
    });
});

fetch('temp/popular-show-by-genre.json').then(async response => {
    const popularShowsData = await response.json();
    const popularShows = popularShowsData.genres;
    console.log('Fetched popular shows:', popularShows);

    const popularShowsSection = document.querySelector('#shows-popular-genres');
    const paginationElement = popularShowsSection.querySelector('.pagination');
    const mainElement = popularShowsSection.querySelector('.popular-genre-cards');
    
    renderPagination(paginationElement, popularShows, 1, 4, mainElement, renderGenres);

    const genreCards = mainElement.querySelectorAll('.genre-item-container');
    genreCards.forEach((card, index) => {
        const top10Tag = document.createElement('div');
        top10Tag.classList.add('top-10-tag');
        top10Tag.textContent = 'Top 10 In';
        const genreTitleContainer = card.querySelector('.genre-title-container');
        card.insertBefore(top10Tag, genreTitleContainer);
    });
});

fetch('temp/movies-trending-now.json').then(async response => {
    const trendingMoviesData = await response.json();
    const trendingMovies = trendingMoviesData.items;
    console.log('Fetched trending movies:', trendingMovies);
    
    const trendingMoviesSection = document.querySelector('#movies-trending');
    const paginationElement = trendingMoviesSection.querySelector('.pagination');
    const mainElement = trendingMoviesSection.querySelector('.trending-cards');

    let perPage = 4;
    if (window.innerWidth < 1439) {
        perPage = 3;
    }

    renderPagination(paginationElement, trendingMovies, 1, perPage, mainElement, renderContentCardsWithRuntimeAndViews);
});

fetch('temp/shows-trending-now.json').then(async response => {
    const trendingShowsData = await response.json();
    const trendingShows = trendingShowsData.items;
    console.log('Fetched trending shows:', trendingShows);
    
    const trendingShowsSection = document.querySelector('#shows-trending');
    const paginationElement = trendingShowsSection.querySelector('.pagination');
    const mainElement = trendingShowsSection.querySelector('.trending-cards');

    let perPage = 4;
    if (window.innerWidth < 1439) {
        perPage = 3;
    }

    renderPagination(paginationElement, trendingShows, 1, perPage, mainElement, renderContentCardsWithRuntimeAndSeasons);
});

fetch('temp/new-release-movies.json').then(async response => {
    const newReleasesMoviesData = await response.json();
    const newReleasesMovies = newReleasesMoviesData.items;
    console.log('Fetched new releases movies:', newReleasesMovies);
    
    const newReleasesMoviesSection = document.querySelector('#movies-new-releases');
    const paginationElement = newReleasesMoviesSection.querySelector('.pagination');
    const mainElement = newReleasesMoviesSection.querySelector('.new-releases-cards');

    let perPage = 5;
    if (window.innerWidth < 1439) {
        perPage = 4;
    }

    renderPagination(paginationElement, newReleasesMovies, 1, perPage, mainElement, renderContentCardsWithReleaseDate);
});

fetch('temp/new-release-shows.json').then(async response => {
    const newReleasesShowsData = await response.json();
    const newReleasesShows = newReleasesShowsData.items;
    console.log('Fetched new releases shows:', newReleasesShows);
    
    const newReleasesShowsSection = document.querySelector('#shows-new-releases');
    const paginationElement = newReleasesShowsSection.querySelector('.pagination');
    const mainElement = newReleasesShowsSection.querySelector('.new-releases-cards');

    let perPage = 4;
    if (window.innerWidth < 1439) {
        perPage = 3;
    }
    renderPagination(paginationElement, newReleasesShows, 1, perPage, mainElement, renderContentCardsWithRuntimeAndSeasons);

});

fetch('temp/must-watch-movies.json').then(async response => {
    const mustWatchMoviesData = await response.json();
    const mustWatchMovies = mustWatchMoviesData.items;
    console.log('Fetched must-watch movies:', mustWatchMovies);
    
    const mustWatchMoviesSection = document.querySelector('#movies-popular');
    const paginationElement = mustWatchMoviesSection.querySelector('.pagination');
    const mainElement = mustWatchMoviesSection.querySelector('.must-watch-cards');

    let perPage = 5;
    if (window.innerWidth < 1439) {
        perPage = 4;
    }

    renderPagination(paginationElement, mustWatchMovies, 1, perPage, mainElement, renderContentCardsWithRuntimeAndRating);

});

fetch('temp/must-watch-shows.json').then(async response => {
    const mustWatchShowsData = await response.json();
    const mustWatchShows = mustWatchShowsData.items;
    console.log('Fetched must-watch shows:', mustWatchShows);
    
    const mustWatchShowsSection = document.querySelector('#shows-popular');
    const paginationElement = mustWatchShowsSection.querySelector('.pagination');
    const mainElement = mustWatchShowsSection.querySelector('.must-watch-cards');

    let perPage = 4;
    if (window.innerWidth < 1439) {
        perPage = 3;
    }

    renderPagination(paginationElement, mustWatchShows, 1, perPage, mainElement, renderContentCardsWithRuntimeAndRating);

});

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