
// Render the pagination
export const renderPagination = (paginationElement, items, currentPage, perPage, mainElement, renderMainElement, hasPages = true) => {
    const totalPages = Math.ceil(items.length / perPage);
    if (hasPages) {
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
    }

    const prevButton = paginationElement.querySelector('.pagination-button[aria-label="Previous"]');
    const nextButton = paginationElement.querySelector('.pagination-button[aria-label="Next"]');
    
    prevButton.onclick = () => {
        if (currentPage > 1) {
            renderPagination(paginationElement, items, currentPage - 1, perPage, mainElement, renderMainElement, hasPages);
        } else {
            // If on the first page, loop to the last page
            renderPagination(paginationElement, items, totalPages, perPage, mainElement, renderMainElement, hasPages);
        }
    };
    
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            renderPagination(paginationElement, items, currentPage + 1, perPage, mainElement, renderMainElement, hasPages);
        } else {
            // If on the last page, loop to the first page
            renderPagination(paginationElement, items, 1, perPage, mainElement, renderMainElement, hasPages);
        }
    };

    // Render the items for the current page
    renderMainElement(mainElement, items, currentPage, perPage);
};

// Render background mashup images
export const renderBackgroundMashup = (containerElement, entries, maxEntries = 36) => {
    const selectedEntries = [];
    const usedIndices = new Set();

    while (selectedEntries.length < maxEntries && usedIndices.size < entries.length) {
        const randomIndex = Math.floor(Math.random() * entries.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selectedEntries.push(entries[randomIndex]);
        }
        if (usedIndices.size >= entries.length) {
            usedIndices.clear(); // Reset used indices if all entries have been used
        }
    }

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

    selectedEntries.forEach(entry => {
        renderBackgroundMashup(containerElement, entry);
    });

}

// Render the genres
export const renderGenres = (element, genres, currentPage, perPage) => {
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