import api from './api.js';
import { menuToggle, renderBackgroundMashup } from './utils.js';

const renderPage = async () => {
    const [
        moviesAndShowsData,
        faqData
    ] = await Promise.all([
        api.fetchMoviesAndShows(),
        api.fetchFAQs()
    ]);

    // Event listener for the menu button
    const menuButton = document.querySelector('header.main-header button.menu');
    const navElements = document.querySelectorAll('header.main-header nav');
    menuButton.addEventListener('click', () => {
        menuToggle(menuButton, navElements);
    });

    // Render the background mashup images
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShowsData);

    // Render the background mashup images for the contact us section
    let numberOfMashupImages = 16;
    if (window.innerWidth < 1023) {
        numberOfMashupImages = 32;
    }
    const contactUsMashup = document.querySelector('#contact-us .contact-us-content .background-mashup');
    renderBackgroundMashup(contactUsMashup, moviesAndShowsData, numberOfMashupImages);

    // Render the FAQs
    const numberOfColumns = 2;
    const faqElement = document.querySelector('#faq .faq-items-container');
    renderFAQs(faqElement, faqData, numberOfColumns);
}

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

renderPage().then(() => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});