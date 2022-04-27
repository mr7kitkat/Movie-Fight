createAutoComplete({
    root: document.querySelector('.autocomplete-one'),
    renderOption(movie) {
        const {Poster, Title} = movie;
        return `
            <img src="${Poster}"/>
            ${Title}
        `
    },
    onOptionSelect(movie, root) {
        onMovieSelect(movie, root);
    },
    inputValue(movie) {
        return movie.Title;
    },

});

createAutoComplete({
    root: document.querySelector('.autocomplete-two'),
    renderOption(movie) {
        const {Poster, Title} = movie;
        return `
            <img src="${Poster}"/>
            ${Title}
        `
    },
    onOptionSelect(movie, root) {
        onMovieSelect(movie, root);
    },
    inputValue(movie) {
        return movie.Title;
    },
    
});

