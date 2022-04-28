let leftSide;
let rightSide;

createAutoComplete({
    root: document.querySelector('.autocomplete-one'),
    renderOption(movie) {
        const {Poster, Title} = movie;
        return `
            <img src="${Poster}"/>
            ${Title}
        `
    },
    onOptionSelect(movie, root, left, details) {
        left = 'left';
        onMovieSelect(movie, root, left, details);
        leftSide = true;
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
    onOptionSelect(movie, root, right, details) {
        right = 'right'
        onMovieSelect(movie, root, right, details);
        rightSide = true;
    },
    inputValue(movie) {
        return movie.Title;
    },
    
});





const onMovieSelect = async (movieName, container, className, details) => {
    const subreq = await searchMovieWithID(movieName.imdbID);

    details.innerHTML = '';
    const {Poster, Title, Genre, Runtime, imdbRating, Country, Actors, Awards, Plot, Released, BoxOffice, Metascore,imdbVotes} = subreq;

    const data_totalAward = Awards.match(/\d+/g).reduce((total,num) => +total + +num);
    const data_boxOfficeCollection = +BoxOffice.match(/\d+/g).reduce((total,num) => total + num);
    const data_metaScore = +Metascore;
    const data_rating = +imdbRating;
    const data_votes = +imdbVotes.match(/\d+/g).reduce((total,num) => total + num);


    details.innerHTML = `
    <div class="is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center">
    <img src="${Poster}" alt="" class="p-5">
    <div class="is-flex-direction-column is-justify-content-space-evenly is-align-content-center p-5">
        <h2 class="title">${Title}</h2>
        <p class="Subtitle">${Plot}</p>

        <p><b>Genre</b>: ${Genre}</p>
        <p><b>Actors</b>: ${Actors}</p>
        <p><b>Released</b>: ${Released}</p>
        <p><b>Run-time</b>: ${Runtime}</p>
        <p><b>Country</b>: ${Country}</p>
    </div>
    </div>

    <div class="is-flex-direction-column p-5">
        <section class="hero is-primary ${className}" data-value="${data_totalAward}">
        <div class="hero-body">
            <p class="title"">
            ${Awards}
            </p>
            <p class="subtitle">
            Awards
            </p>
        </div>
        </section> 

        <section class="hero is-primary ${className}" data-value="${data_boxOfficeCollection}">
        <div class="hero-body">
            <p class="title"">
            ${BoxOffice}
            </p>
            <p class="subtitle">
            Box office collection
            </p>
        </div>
        </section>
        
        <section class="hero is-primary ${className}" data-value="${data_metaScore}">
        <div class="hero-body">
            <p class="title">
            ${Metascore}
            </p>
            <p class="subtitle">
            Metascore
            </p>
        </div>
        </section>
  
        <section class="hero is-primary ${className}" data-value="${data_rating}">
        <div class="hero-body">
            <p class="title">
            ${imdbRating}
            </p>
            <p class="subtitle">
            IMDB Rating
            </p>
        </div>
        </section>
  
        <section class="hero is-primary ${className}" data-value="${data_votes}">
        <div class="hero-body">
            <p class="title">
            ${imdbVotes}
            </p>
            <p class="subtitle">
            IMDB Votes
            </p>
        </div>
        </section>
    </div> 
    `
    container.append(details);

    if (leftSide && rightSide) {
        movieFight();
    }
}



















function movieFight() {
        const leftMovie = document.querySelectorAll('.left');
        console.log(leftMovie);
        const rightMovie = document.querySelectorAll('.right');
        console.log(rightMovie)
        for (let i = 0; i < leftMovie.length; i++) {
            if (leftMovie[i].dataset.value > rightMovie[i].dataset.value) {
                rightMovie[i].classList.remove('is-primary');
                rightMovie[i].classList.add('is-warning');
            }
            else {
                leftMovie[i].classList.remove('is-primary');
                leftMovie[i].classList.add('is-warning');
            }
        }

}
