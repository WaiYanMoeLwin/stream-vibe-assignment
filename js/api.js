// Mock API

const api = {
    fetchMoviesAndShows: async () => {
        const response = await fetch('temp/mock-movie-data.json');
        if (!response.ok) {
            console.error('Failed to fetch movies and shows');
        }
        return response.json();
    },
    fetchGenres: async (type) => {
        switch (type) {
            case 'movies':
                const responseMovies = await fetch('temp/movie-genres.json');
                if (!responseMovies.ok) {
                    console.error('Failed to fetch movie genres');
                }
                return responseMovies.json();
            case 'shows':
                const responseShows = await fetch('temp/show-genres.json');
                if (!responseShows.ok) {
                    console.error('Failed to fetch show genres');
                }
                return responseShows.json();
            default:
                const responseDefault = await fetch('temp/mock-genres.json');
                if (!responseDefault.ok) {
                    console.error('Failed to fetch genres');
                }
                return responseDefault.json();
        }
    },
    fetchFAQs: async () => {
        const response = await fetch('temp/faqs.json');
        if (!response.ok) {
            console.error('Failed to fetch FAQs');
        }
        return response.json();
    },
    fetchDevices: async () => {
        const response = await fetch('temp/devices.json');
        if (!response.ok) {
            console.error('Failed to fetch devices');
        }
        return response.json();
    },
    fetchPricingPlans: async () => {
        const response = await fetch('temp/pricing-plans.json');
        if (!response.ok) {
            console.error('Failed to fetch pricing plans');
        }
        return response.json();
    },
    fetchTrailers: async () => {
        const response = await fetch('temp/trailers.json');
        if (!response.ok) {
            console.error('Failed to fetch trailers');
        }
        return response.json();
    },
    fetchTrendingNow: async (type) => {
        switch (type) {
            case 'movies':
                const responseMovies = await fetch('temp/movies-trending-now.json');
                if (!responseMovies.ok) {
                    console.error('Failed to fetch trending movies');
                }
                return responseMovies.json();
            case 'shows':
                const responseShows = await fetch('temp/shows-trending-now.json');
                if (!responseShows.ok) {
                    console.error('Failed to fetch trending shows');
                }
                return responseShows.json();
            default:
                console.error('Invalid type for trending fetch');
        }
    },
    fetchPopularGenres: async (type) => {
        switch (type) {
            case 'movies':
                const responseMovies = await fetch('temp/popular-movie-by-genre.json');
                if (!responseMovies.ok) {
                    console.error('Failed to fetch popular movie genres');
                }
                return responseMovies.json();
            case 'shows':
                const responseShows = await fetch('temp/popular-show-by-genre.json');
                if (!responseShows.ok) {
                    console.error('Failed to fetch popular show genres');
                }
                return responseShows.json();
            default:
                console.error('Invalid type for popular genres fetch');
        }
    },
    fetchNewReleases: async (type) => {
        switch (type) {
            case 'movies':
                const responseMovies = await fetch('temp/new-release-movies.json');
                if (!responseMovies.ok) {
                    console.error('Failed to fetch new movie releases');
                }
                return responseMovies.json();
            case 'shows':
                const responseShows = await fetch('temp/new-release-shows.json');
                if (!responseShows.ok) {
                    console.error('Failed to fetch new show releases');
                }
                return responseShows.json();
            default:
                console.error('Invalid type for new releases fetch');
        }
    },
    fetchMustWatch: async (type) => {
        switch (type) {
            case 'movies':
                const responseMovies = await fetch('temp/must-watch-movies.json');
                if (!responseMovies.ok) {
                    console.error('Failed to fetch must-watch movies');
                }
                return responseMovies.json();
            case 'shows':
                const responseShows = await fetch('temp/must-watch-shows.json');
                if (!responseShows.ok) {
                    console.error('Failed to fetch must-watch shows');
                }
                return responseShows.json();
            default:
                console.error('Invalid type for must-watch fetch');
        }
    },
};

export default api;