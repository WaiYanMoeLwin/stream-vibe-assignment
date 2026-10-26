import { renderBackgroundMashup } from './utils.js';

fetch('temp/mock-movie-data.json').then( async response => {
    const moviesAndShows = await response.json();
    console.log('Fetched movies and shows:', moviesAndShows);

    // Render the background mashup images
    const freeTrialCTA = document.querySelector('#free-trial-cta');
    const mashupContainer = freeTrialCTA.querySelector('.background-mashup');
    renderBackgroundMashup(mashupContainer, moviesAndShows);
});

fetch('temp/pricing-plans.json').then(async (response) => {
    const pricingPlansData = await response.json();
    console.log('pricingPlansData', pricingPlansData);

    const billingCycles = pricingPlansData.billingCycles;
    const currency = pricingPlansData.currency;
    const plans = pricingPlansData.plans;

    const pricingPlansElement = document.querySelector('#plans .pricing-cards');
    const billingCyclesSelectorElement = document.querySelector('#plans .billing-cycles-selector');
    renderBillingCycles(billingCyclesSelectorElement, billingCycles, currency, pricingPlansElement, plans, renderPricingPlans);

    const featureComparisonElement = document.querySelector('#features');
    renderFeatureComparison(featureComparisonElement, pricingPlansData);
});


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

const renderFeatureComparison = (element, pricingData) => {
    const featureComparisonDescription = element.querySelector('.feature-comparison-description');
    featureComparisonDescription.textContent = pricingData.comparisonDescription;

    const numberOfPlans = pricingData.plans.length;
    const numberOfFeatures = pricingData.comparisonRows.length;

    const featureComparisonTable = element.querySelector('.feature-comparison-table');
    const tableHeader = featureComparisonTable.querySelector('thead');
    const tableBody = featureComparisonTable.querySelector('tbody');

    const headerRow = document.createElement('tr');
    const featureHeaderCell = document.createElement('th');
    const featureHeaderTitle = document.createElement('h3');
    featureHeaderTitle.classList.add('feature-header-title');
    featureHeaderTitle.textContent = 'Features';
    featureHeaderCell.appendChild(featureHeaderTitle);
    headerRow.appendChild(featureHeaderCell);
    tableHeader.appendChild(headerRow);
    
    const featureRows = [];
    pricingData.comparisonRows.forEach((row) => {
        console.log('Rendering feature row:', row);
        const featureRow = document.createElement('tr');
        featureRow.classList.add('feature-row', `${row.key}`);
        const featureNameCell = document.createElement('td');
        featureNameCell.textContent = row.label;
        featureRow.appendChild(featureNameCell);
        featureRows.push(featureRow);

        tableBody.appendChild(featureRow);
    });

    pricingData.plans.forEach((plan) => {
        const planHeaderCell = document.createElement('th');
        const planTitle = document.createElement('h3');
        planTitle.classList.add('feature-header-title');
        planTitle.textContent = plan.name;
        planHeaderCell.appendChild(planTitle);
        headerRow.appendChild(planHeaderCell);

        if (plan.popular) {
            const popularBadge = document.createElement('span');
            popularBadge.classList.add('popular-badge');
            popularBadge.textContent = 'Popular';
            planHeaderCell.appendChild(popularBadge);
        }

        // Add plan-specific cells to each feature row
        featureRows.forEach((featureRow) => {
            const planCell = document.createElement('td');
            planCell.classList.add('plan-cell');
            if (featureRow.classList[1] != 'price') {
                planCell.textContent = plan.features[featureRow.classList[1]];
            } else {
                planCell.textContent = `${pricingData.currency.symbol}${plan.price[pricingData.billingCycles[0].id]}${pricingData.billingCycles[0].suffix}`;
            }
            featureRow.appendChild(planCell);
        });
    });

    // Styling
    const rows = featureComparisonTable.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.style.gridTemplateColumns = `repeat(${numberOfPlans + 1}, 1fr)`;
    });
}