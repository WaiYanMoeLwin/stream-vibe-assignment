import api from './api.js';
import { menuToggle, renderBackgroundMashup, renderGenres, renderPagination } from './utils.js';

const renderPage = async () => {
    const [
        moviesAndShowsData,
        genresData,
        devicesData,
        faqData,
        pricingPlansData
    ] = await Promise.all([
        api.fetchMoviesAndShows(),
        api.fetchGenres(),
        api.fetchDevices(),
        api.fetchFAQs(),
        api.fetchPricingPlans()
    ]);

    // Initialize the mobile menu
    const menuButton = document.querySelector('header.main-header button.menu');
    const navElements = document.querySelectorAll('header.main-header nav');
    menuButton.addEventListener('click', () => {
        menuToggle(menuButton, navElements);
    });

    // Render the background mashup for the hero section
    const heroSection = document.getElementById('hero');
    const mashup = heroSection.querySelector('.background-mashup');
    renderBackgroundMashup(mashup, moviesAndShowsData, 36);

    // Render the background mashup for the free trial CTA
    const freeTrialCTA = document.getElementById('free-trial-cta');
    const backgroundMashup = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(backgroundMashup, moviesAndShowsData, 36);

    // Render the genres
    const genresElement = document.querySelector('#categories .category-cards');
    const paginationElement = document.querySelector('#categories .pagination');
    const currentPage = 1;
    let perPage = 5;

    if (window.innerWidth < 1439) {
        perPage = 4;
    }
    if (window.innerWidth < 1023) {
        perPage = genresData.length; // Show all genres on smaller screens
    }
    renderPagination(paginationElement, genresData, currentPage, perPage, genresElement, renderGenres);

    // Render the devices
    const devicesElement = document.querySelector('#devices .device-cards');
    renderDevices(devicesElement, devicesData);

    // Render the FAQs
    const numberOfColumns = 2;
    const faqElement = document.querySelector('#faq .faq-items-container');
    renderFAQs(faqElement, faqData, numberOfColumns);

    // Render the pricing plans
    const billingCycles = pricingPlansData.billingCycles;
    const currency = pricingPlansData.currency;
    const plans = pricingPlansData.plans;

    const pricingPlansElement = document.querySelector('#pricing .pricing-cards');
    const billingCyclesSelectorElement = document.querySelector('#pricing .billing-cycles-selector');
    renderBillingCycles(billingCyclesSelectorElement, billingCycles, currency, pricingPlansElement, plans, renderPricingPlans);
}

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
            
            // Adjust the answer element's width based on screen size
            if (window.innerWidth < 767) {
                const faqMainContainer = document.createElement('div');
                faqMainContainer.classList.add('faq-main-container');
                faqMainContainer.appendChild(faqSubContainer);
                faqMainContainer.appendChild(openButton);
                faqMainContainer.appendChild(closeButton);
                faqContainer.appendChild(faqMainContainer);
                faqContainer.appendChild(answerElement);
            }
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

const renderBillingCycles = (selectorElement, billingCycles, currency, pricingPlansElement, plans, renderPricingPlans) => {
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
            renderPricingPlans(pricingPlansElement, plans, cycle, currency);
        });

        selectorElement.appendChild(cycleButton);
    });

    // Set the first billing cycle as active by default
    if (billingCycles.length > 0) {
        selectorElement.querySelector('.billing-cycle-button').classList.add('active');
        renderPricingPlans(pricingPlansElement, plans, billingCycles[0], currency);
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
        planPriceNumeric.textContent = `${currency.symbol}${plan.price[billingCycle.id]}`

        const planPriceSuffix = document.createElement('span');
        planPriceSuffix.classList.add('plan-price-suffix');
        planPriceSuffix.textContent = billingCycle.suffix;

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

renderPage().then(() => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});