
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

fetch('temp/devices.json').then(async (response) => {
    const devicesData = await response.json();
    console.log('devicesData', devicesData);

    // Render the devices
    const renderDevices = (element, devices) => {
        devices.forEach((device) => {
            const deviceContainer = document.createElement('div');
            deviceContainer.classList.add('device-container');

            const deviceHeader = document.createElement('div');
            deviceHeader.classList.add('device-header');

            const deviceImage = document.createElement('img');
            deviceImage.src = device.icon;
            deviceImage.alt = device.name;

            const deviceName = document.createElement('h3');
            deviceName.classList.add('device-name');
            deviceName.textContent = device.name;

            deviceHeader.appendChild(deviceImage);
            deviceHeader.appendChild(deviceName);

            const deviceDescription = document.createElement('p');
            deviceDescription.classList.add('device-description');
            deviceDescription.textContent = device.description;

            deviceContainer.appendChild(deviceHeader);
            deviceContainer.appendChild(deviceDescription);

            element.appendChild(deviceContainer);
        });
    };

    const devicesElement = document.querySelector('#devices .device-cards');
    renderDevices(devicesElement, devicesData);
});

fetch('temp/faqs.json').then(async (response) => {
    const faqData = await response.json();
    console.log('faqData', faqData);

    const numberOfColumns = 2;

    // Render the FAQs
    const renderFAQs = (element, faqs, numberOfColumns) => {

        const elements = [];
        for (let i = 0; i < numberOfColumns; i++) {
            const faqListElement = document.createElement('div');
            faqListElement.classList.add('faq-list');
            element.appendChild(faqListElement);
            elements.push(faqListElement);
        }
        
        const renderFAQList = (faqListElement, faqs) => {
            faqs.forEach((faq) => {
                const faqContainer = document.createElement('div');
                faqContainer.classList.add('faq-container');

                const faqSubContainer = document.createElement('div');
                faqSubContainer.classList.add('faq-sub-container');

                const numberElement = document.createElement('div');
                numberElement.classList.add('faq-number');
                numberElement.textContent = faq.id;

                const contentElement = document.createElement('div');
                contentElement.classList.add('faq-content');

                const questionElement = document.createElement('h4');
                questionElement.classList.add('faq-question');
                questionElement.textContent = faq.question;

                const answerElement = document.createElement('p');
                answerElement.classList.add('faq-answer');
                answerElement.classList.add('hidden');
                answerElement.textContent = faq.answer;

                contentElement.appendChild(questionElement);
                contentElement.appendChild(answerElement);

                faqSubContainer.appendChild(numberElement);
                faqSubContainer.appendChild(contentElement);

                faqContainer.appendChild(faqSubContainer);

                const openButton = document.createElement('button');
                openButton.classList.add('faq-open-button', 'faq-toggle-button');
                openButton.ariaLabel = 'Open FAQ';
                openButton.innerHTML = '<img src="public/images/icons/plus.svg" alt="Open FAQ">';
                faqContainer.appendChild(openButton);

                const closeButton = document.createElement('button');
                closeButton.classList.add('faq-close-button', 'faq-toggle-button');
                closeButton.classList.add('hidden');
                closeButton.ariaLabel = 'Close FAQ';
                closeButton.innerHTML = '<img src="public/images/icons/minus.svg" alt="Close FAQ">';
                faqContainer.appendChild(closeButton);
                
                openButton.addEventListener('click', () => {
                    answerElement.classList.remove('hidden');
                    openButton.classList.add('hidden');
                    closeButton.classList.remove('hidden');
                    faqContainer.classList.add('expanded');
                });

                closeButton.addEventListener('click', () => {
                    answerElement.classList.add('hidden');
                    openButton.classList.remove('hidden');
                    closeButton.classList.add('hidden');
                    faqContainer.classList.remove('expanded');
                });

                faqListElement.appendChild(faqContainer);
            });
        }

        const numberOfFAQPerList = Math.ceil(faqs.length / elements.length);
        const faqLists = [];
        for (let i = 0; i < elements.length; i++) {
            const start = i * numberOfFAQPerList;
            const end = start + numberOfFAQPerList;
            faqLists.push(faqs.slice(start, end > faqs.length ? faqs.length : end));
        }

        elements.forEach((faqListElement, index) => {
            renderFAQList(faqListElement, faqLists[index]);
        });
    }

    const faqElement = document.querySelector('#faq .faq-items-container');
    renderFAQs(faqElement, faqData, numberOfColumns);
});

fetch('temp/pricing-plans.json').then(async (response) => {
    const pricingPlansData = await response.json();
    console.log('pricingPlansData', pricingPlansData);

    const billingCycles = pricingPlansData.billingCycles;
    const currency = pricingPlansData.currency;
    const plans = pricingPlansData.plans;

    const renderBillingCycles = (selectorElement, billingCycles, currency, pricingPlansElement, renderPricingPlans) => {
        // Clear existing billing cycle options
        selectorElement.innerHTML = '';

        billingCycles.forEach((cycle) => {
            const cycleButton = document.createElement('button');
            cycleButton.classList.add('billing-cycle-button');
            cycleButton.textContent = cycle.label;

            cycleButton.addEventListener('click', () => {
                // Remove active class from all buttons
                selectorElement.querySelectorAll('.billing-cycle-button').forEach((btn) => {
                    btn.classList.remove('active');
                });
                // Add active class to the clicked button
                cycleButton.classList.add('active');
                // Render the pricing plans for the selected billing cycle
                renderPricingPlans(pricingPlansElement, plans, cycle.id, currency);
            });

            selectorElement.appendChild(cycleButton);
        });

        // Set the first billing cycle as active by default
        if (billingCycles.length > 0) {
            selectorElement.querySelector('.billing-cycle-button').classList.add('active');
            renderPricingPlans(pricingPlansElement, plans, billingCycles[0].id, currency);
        }
    }

    const renderPricingPlans = (element, plans, billingCycle, currency) => {
        // Clear existing pricing plans
        element.innerHTML = '';

        plans.forEach((plan) => {
            const pricingCard = document.createElement('div');
            pricingCard.classList.add('pricing-card');

            const planTitle = document.createElement('h3');
            planTitle.classList.add('plan-title');
            planTitle.textContent = plan.name;

            const planDescription = document.createElement('p');
            planDescription.classList.add('plan-description');
            planDescription.textContent = plan.description;

            const planPrice = document.createElement('p');
            planPrice.classList.add('plan-price');

            const planPriceNumeric = document.createElement('span');
            planPriceNumeric.classList.add('plan-price-numeric');
            planPriceNumeric.textContent = `${currency.symbol}${plan.price[billingCycle]}`

            const planPriceSuffix = document.createElement('span');
            planPriceSuffix.classList.add('plan-price-suffix');
            planPriceSuffix.textContent = billingCycles.find(cycle => cycle.id === billingCycle).suffix;

            planPrice.appendChild(planPriceNumeric);
            planPrice.appendChild(planPriceSuffix);

            pricingCard.appendChild(planTitle);
            pricingCard.appendChild(planDescription);
            pricingCard.appendChild(planPrice);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('pricing-card-buttons-container');

            const startFreeTrialButton = document.createElement('button');
            startFreeTrialButton.classList.add('start-free-trial-button');
            startFreeTrialButton.textContent = 'Start Free Trial';
            buttonsContainer.appendChild(startFreeTrialButton);

            const choosePlanButton = document.createElement('button');
            choosePlanButton.classList.add('choose-plan-button');
            choosePlanButton.textContent = 'Choose Plan';
            buttonsContainer.appendChild(choosePlanButton);

            pricingCard.appendChild(buttonsContainer);

            element.appendChild(pricingCard);
        });
    }

    const pricingPlansElement = document.querySelector('#pricing .pricing-cards');
    const billingCyclesSelectorElement = document.querySelector('#pricing .billing-cycles-selector');
    renderBillingCycles(billingCyclesSelectorElement, billingCycles, currency, pricingPlansElement, renderPricingPlans);
});