


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

    // Render the background mashup for the free trial CTA section
    const freeTrialCTA = document.getElementById('free-trial-cta');
    const backgroundMashup = freeTrialCTA.querySelector('.background-mashup');
    selectedEntries.forEach((entry) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('background-mashup-image');
        const img = document.createElement('img');
        img.src = entry.poster;
        img.alt = entry.title;
        imgContainer.appendChild(img);
        backgroundMashup.appendChild(imgContainer);
    });
});
