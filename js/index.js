
// Render the pagination
    const renderPagination = (paginationElement, items, currentPage, perPage, mainElement, renderMainElement) => {
        const totalPages = Math.ceil(items.length / perPage);
        const pageElement = paginationElement.querySelector('.pages');
        
        // Clear existing pagination pages
        pageElement.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('pagination-page');
            pageButton.ariaLabel = `Page ${i}`;
            pageButton.value = i;

            if (i === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                // Update the current page and re-render the items
                renderPagination(paginationElement, items, i, perPage, mainElement, renderMainElement);
            });
            pageElement.appendChild(pageButton);
        }

        const prevButton = paginationElement.querySelector('.pagination-button[aria-label="Previous"]');
        const nextButton = paginationElement.querySelector('.pagination-button[aria-label="Next"]');
        
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        prevButton.onclick = () => {
            if (currentPage > 1) {
                renderPagination(paginationElement, items, currentPage - 1, perPage, mainElement, renderMainElement);
            }
        };

        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                renderPagination(paginationElement, items, currentPage + 1, perPage, mainElement, renderMainElement);
            }
        };

        // Render the items for the current page
        renderMainElement(mainElement, items, currentPage, perPage);
    };


fetch('temp/mock-movie-data.json').then(async (response) => {
    const data = await response.json();
    console.log('mockData', data);

    // Randomly select 36 entries from the data array
    const selectedEntries = [];
    const usedIndices = new Set();

    console.log(selectedEntries.length, usedIndices.size, data.length);
    while (selectedEntries.length < 36 && usedIndices.size < data.length) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selectedEntries.push(data[randomIndex]);
        }
        if (usedIndices.size >= data.length) {
            usedIndices.clear(); // Reset used indices if all entries have been used
        }
    }
    console.log('selectedEntries', selectedEntries);

    // Render the background mashup
    const renderBackgroundMashup = (mashup, entry) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('background-mashup-image');
        const img = document.createElement('img');
        img.src = entry.poster;
        img.alt = entry.title;
        imgContainer.appendChild(img);
        mashup.appendChild(imgContainer);
    }

    // Render the background mashup for the hero section
    const heroSection = document.getElementById('hero');
    const mashup = heroSection.querySelector('.background-mashup');
    selectedEntries.forEach((entry) => {
        renderBackgroundMashup(mashup, entry);
    });

    // Render the background mashup for the free trial CTA
    const freeTrialCTA = document.getElementById('free-trial-cta');
    const backgroundMashup = freeTrialCTA.querySelector('.background-mashup');
    selectedEntries.forEach((entry) => {
        renderBackgroundMashup(backgroundMashup, entry);
    });
});

fetch('temp/mock-genres.json').then(async (response) => {
    const genresData = await response.json();
    console.log('genresData', genresData);

    // Render the genres
    const renderGenres = (element, genres, currentPage, perPage) => {
        // Clear existing genres
        element.innerHTML = '';

        const genresToRender = genres.slice((currentPage - 1) * perPage, currentPage * perPage);
        genresToRender.forEach((genre) => {
            const genreItem = document.createElement('div');
            genreItem.classList.add('genre-item-container');
            
            // Select a random set of items for each genre
            const randomItems = [];
            const usedIndices = new Set();
            while (randomItems.length < 4 && usedIndices.size < genre.items.length) {
                const randomIndex = Math.floor(Math.random() * genre.items.length);
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex);
                    randomItems.push(genre.items[randomIndex]);
                }
                if (usedIndices.size >= genre.items.length) {
                    break; // Stop if all items have been used
                }
            }

            // Render the selected items for the genre
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('genre-images-container');
            randomItems.forEach((item) => {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('genre-image');
                const img = document.createElement('img');
                img.src = item.poster;
                img.alt = item.title;
                imageContainer.appendChild(img);
                imagesContainer.appendChild(imageContainer);
            });

            const fadeOutBottom = document.createElement('div');
            fadeOutBottom.classList.add('fade-out-bottom');
            imagesContainer.appendChild(fadeOutBottom);

            // Create the genre title
            const genreTitleContainer = document.createElement('div');
            genreTitleContainer.classList.add('genre-title-container');
            const genreTitle = document.createElement('h3');
            genreTitle.classList.add('genre-title');
            genreTitle.textContent = genre.name;

            const viewAllLink = document.createElement('a');
            viewAllLink.classList.add('view-all-link');
            viewAllLink.href = `movies-and-shows.html?genre=${encodeURIComponent(genre.name)}`;
            const rightArrowIcon = document.createElement('img');
            rightArrowIcon.src = 'public/images/icons/arrow-right.svg';
            rightArrowIcon.alt = 'View All';
            viewAllLink.appendChild(rightArrowIcon);
            
            genreTitleContainer.appendChild(genreTitle);
            genreTitleContainer.appendChild(viewAllLink);
            
            genreItem.appendChild(imagesContainer);
            genreItem.appendChild(genreTitleContainer);

            element.appendChild(genreItem);
        });
    };

    const genresElement = document.querySelector('#categories .category-cards');
    const paginationElement = document.querySelector('#categories .pagination');
    const currentPage = 1;
    const perPage = 5;
    renderPagination(paginationElement, genresData, currentPage, perPage, genresElement, renderGenres);
});