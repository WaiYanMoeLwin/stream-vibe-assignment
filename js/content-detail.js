import { renderBackgroundMashup, renderPagination } from './utils.js';

const addReviewButton = document.querySelector('.reviews-section .add-review-button');
addReviewButton.onclick = () => {
    // Implement the logic to add a new review
    console.log('Add review button clicked');
}

fetch('temp/mock-movie-data.json').then( async response => {
    const moviesAndShows = await response.json();
    console.log('Fetched movies and shows:', moviesAndShows);

    // Render the background mashup images
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShows);

    const contentId = new URLSearchParams(window.location.search).get('id');
    console.log('Content ID from URL:', contentId);

    const contentEntry = moviesAndShows.find(entry => entry.id === contentId);
    if (contentEntry) {
        console.log('Found content entry:', contentEntry);
        const thumbnailElement = document.querySelector('#thumbnail');
        renderThumbnail(thumbnailElement, contentEntry);
        renderMainContentInfo(document.querySelector('#content-info .main-info'), contentEntry);
        renderSideBarContentInfo(document.querySelector('#content-info .sidebar-info'), contentEntry);

    } else {
        console.error('Content entry not found for ID:', contentId);
    }
});

// Render the thumbnail
const renderThumbnail = (thumbnailElement, entry) => {
    const img = document.createElement('img');
    img.src = entry.poster;
    img.alt = entry.title;

    const trailerTitle = thumbnailElement.querySelector('.title');
    trailerTitle.textContent = entry.title;

    const trailerDescription = thumbnailElement.querySelector('.description');
    trailerDescription.textContent = entry.description;

    const playButton = thumbnailElement.querySelector('.play-button');
    playButton.onclick = () => {
        // Implement the logic to play the trailer video
        console.log(`Playing trailer: ${entry.title}`);
    };

    const addToWatchlistButton = thumbnailElement.querySelector('.add-to-watch-list-button');
    addToWatchlistButton.onclick = () => {
        // Implement the logic to add the trailer to the watchlist
        console.log(`Added to watchlist: ${entry.title}`);
    };

    const likeButton = thumbnailElement.querySelector('.like-button');
    likeButton.onclick = () => {
        // Implement the logic to like the trailer
        console.log(`Liked trailer: ${entry.title}`);
    };

    const muteButton = thumbnailElement.querySelector('.mute-button');
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
        console.log(`Toggled mute for trailer: ${entry.title}`);
    };
    thumbnailElement.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${entry.poster})`;
    thumbnailElement.style.backgroundSize = 'cover';
    thumbnailElement.style.backgroundPosition = 'center';
    thumbnailElement.style.backgroundClip = 'padding-box';
}

const renderDescription = (descriptionElement, entry) => {
    descriptionElement.textContent = entry.description;
}

const renderCast = (castElement, entries, currentPage, itemsPerPage) => {
    // Clear existing cast
    castElement.innerHTML = '';

    const entriesToRender = entries.slice((currentPage - 1) * itemsPerPage, entries.length < currentPage * itemsPerPage ? entries.length : currentPage * itemsPerPage );
    
    entriesToRender.forEach((castMember) => {
        const castItem = document.createElement('div');
        castItem.classList.add('cast-item');

        const img = document.createElement('img');
        img.src = castMember.photo;
        img.alt = castMember.name;

        castItem.appendChild(img);
        castElement.appendChild(castItem);
    });
}

const renderReviews = (reviewsElement, reviews, currentPage, itemsPerPage) => {
    // Clear existing reviews
    reviewsElement.innerHTML = '';

    const reviewsToRender = reviews.slice((currentPage - 1) * itemsPerPage, reviews.length < currentPage * itemsPerPage ? reviews.length : currentPage * itemsPerPage);

    reviewsToRender.forEach((review) => {
        const reviewItem = document.createElement('article');
        reviewItem.classList.add('review-item');

        const reviewHeader = document.createElement('header');
        reviewHeader.classList.add('review-header');

        const reviewer = document.createElement('div');
        reviewer.classList.add('reviewer');

        const reviewerName = document.createElement('h3');
        reviewerName.classList.add('reviewer-name');
        reviewerName.textContent = review.name;

        const reviewerLocation = document.createElement('span');
        reviewerLocation.classList.add('reviewer-location');
        reviewerLocation.textContent = `From ${review.country}`;

        reviewer.appendChild(reviewerName);
        reviewer.appendChild(reviewerLocation);

        const rating = review.rating;
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('rating-container');

        const ratingStars = document.createElement('div');
        ratingStars.classList.add('rating-stars');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('img');
            star.classList.add('star');
            if (i <= Math.floor(rating)) {
                star.src = 'public/images/icons/star-filled.svg';
                star.alt = 'Filled Star';
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                star.src = 'public/images/icons/star-half-filled.svg';
                star.alt = 'Half Filled Star';
            } else {
                star.src = 'public/images/icons/star-empty.svg';
                star.alt = 'Empty Star';
            }
            ratingStars.appendChild(star);
        }
        ratingContainer.appendChild(ratingStars);
        
        const ratingValue = document.createElement('span');
        ratingValue.classList.add('rating-value');
        ratingValue.textContent = `${rating.toFixed(1)}`;

        ratingContainer.appendChild(ratingValue);
        reviewHeader.appendChild(reviewer);
        reviewHeader.appendChild(ratingContainer);

        const reviewContent = document.createElement('p');
        reviewContent.classList.add('review-content');
        reviewContent.textContent = review.text;

        reviewItem.appendChild(reviewHeader);
        reviewItem.appendChild(reviewContent);
        reviewsElement.appendChild(reviewItem);
    });
}

const renderMainContentInfo = (mainContentInfoElement, contentEntry) => {
     const descriptionElement = mainContentInfoElement.querySelector('.description-section .description');
    renderDescription(descriptionElement, contentEntry);

    const castElement = mainContentInfoElement.querySelector('.cast-section .cast-list');
    renderPagination(mainContentInfoElement.querySelector('.cast-section .pagination'), contentEntry.cast, 1, 8, castElement, renderCast, false);

    const reviewsElement = mainContentInfoElement.querySelector('.reviews-section .reviews-list');
    renderPagination(mainContentInfoElement.querySelector('.reviews-section .pagination'), contentEntry.reviews, 1, 2, reviewsElement, renderReviews);
}

const renderSideBarContentInfo = (sidebarContentInfoElement, contentEntry) => {
    const releasedYear = sidebarContentInfoElement.querySelector('.released-year-section .released-year');
    releasedYear.textContent = contentEntry.releaseYear;
    
    const availableLanguagesList = sidebarContentInfoElement.querySelector('.available-languages-section .available-languages-list');
    const availableLanguages = contentEntry.languages;
    availableLanguages.forEach((language) => {
        const languageItem = document.createElement('li');
        languageItem.textContent = language;
        availableLanguagesList.appendChild(languageItem);
    });

    const ratingElement = sidebarContentInfoElement.querySelector('.content-rating-section .content-rating');
    const ratings = contentEntry.ratings;
    for (const [source, value] of Object.entries(ratings)) {
        const ratingItem = document.createElement('div');
        ratingItem.classList.add('rating-item');
        
        const ratingSource = document.createElement('h3');
        ratingSource.classList.add('rating-source');
        ratingSource.textContent = source;

        const ratingValue = document.createElement('span');
        ratingValue.classList.add('rating-value');
        ratingValue.textContent = value;

        const ratingStars = document.createElement('div');
        ratingStars.classList.add('rating-stars');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('img');
            star.classList.add('star');
            if (i <= Math.floor(value)) {
                star.src = 'public/images/icons/star-filled.svg';
                star.alt = 'Filled Star';
            } else if (i === Math.ceil(value) && value % 1 !== 0) {
                star.src = 'public/images/icons/star-half-filled.svg';
                star.alt = 'Half Filled Star';
            } else {
                star.src = 'public/images/icons/star-empty.svg';
                star.alt = 'Empty Star';
            }
            ratingStars.appendChild(star);
        }
        ratingStars.appendChild(ratingValue);

        ratingItem.appendChild(ratingSource);
        ratingItem.appendChild(ratingStars);
        ratingElement.appendChild(ratingItem);
    }

    const genresElement = sidebarContentInfoElement.querySelector('.genres-section .genres-list');
    const genres = contentEntry.genres;
    genres.forEach((genre) => {
        const genreItem = document.createElement('li');
        genreItem.classList.add('genre-item');
        genreItem.textContent = genre;
        genresElement.appendChild(genreItem);
    });

    const directorElement = sidebarContentInfoElement.querySelector('.director-section .director-names');
    const directors = contentEntry.directors;
    directors.forEach((director) => {
        const directorItem = document.createElement('li');
        directorItem.classList.add('director-name');
        const directorImage = document.createElement('img');
        directorImage.src = director.photo;
        directorImage.alt = director.name;
        directorImage.classList.add('photo');

        const directorInfo = document.createElement('div');
        directorInfo.classList.add('info');

        const directorName = document.createElement('h3');
        directorName.classList.add('name-text');
        directorName.textContent = director.name;

        const directorLocation = document.createElement('span');
        directorLocation.classList.add('location');
        directorLocation.textContent = `From ${director.country}`;

        directorInfo.appendChild(directorName);
        directorInfo.appendChild(directorLocation);

        directorItem.appendChild(directorImage);
        directorItem.appendChild(directorInfo);
        directorElement.appendChild(directorItem);
    });

    const musicElement = sidebarContentInfoElement.querySelector('.music-section .music-composers');
    const composers = contentEntry.music;
    composers.forEach((composer) => {
        const composerItem = document.createElement('li');
        composerItem.classList.add('music-composer');
        
        const composerImage = document.createElement('img');
        composerImage.src = composer.photo;
        composerImage.alt = composer.name;
        composerImage.classList.add('photo');

        const composerInfo = document.createElement('div');
        composerInfo.classList.add('info');

        const composerName = document.createElement('h3');
        composerName.classList.add('name-text');
        composerName.textContent = composer.name;

        const composerLocation = document.createElement('span');
        composerLocation.classList.add('location');
        composerLocation.textContent = `From ${composer.country}`;

        composerInfo.appendChild(composerName);
        composerInfo.appendChild(composerLocation);

        composerItem.appendChild(composerImage);
        composerItem.appendChild(composerInfo);

        musicElement.appendChild(composerItem);
    });
}