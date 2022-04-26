const searchMovieWithName = async (searchTerm) => {
    const responce = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '948117b',
            s:searchTerm,
        }
    })

    if (responce.data.Error) {
        return [];
    }

    return responce.data.Search;
}

const searchMovieWithID = async (searchTerm) => {
    const responce = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '948117b',
            i:searchTerm,
        }
    })

    if (responce.data.Error) {
        return [];
    }

    return responce.data;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <div class="dropdown">
    <input type="text" class="movieInput">
    <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`

const summary = root.querySelector('.results');
const dropdown = root.querySelector('.dropdown');
const input = root.querySelector('input');

const ontyping = async eventObj => {
    const data = await searchMovieWithName(eventObj.target.value);

    if (!data.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    summary.innerHTML = ''
    dropdown.classList.add('is-active');

    for (let movie of data) {
        const anchor = document.createElement('a');
        anchor.classList.add('dropdown-item');
        anchor.innerHTML = `
            <img src="${movie.Poster}"/>
            ${movie.Title}
        `
        summary.append(anchor);

        anchor.addEventListener('click',async () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;

            const subreq = await searchMovieWithID(movie.imdbID);
            
            const detail = document.querySelector('.cont');
            detail.innerHTML = '';
            const {Poster, Title, Genre, Runtime, imdbRating, Country, Actors, Awards} = subreq;
            detail.innerHTML = `
                <div class="is-flex is-flex-direction-row is-justify-content-space-evenly is-align-content-center is-align-items-center">
                <img src="${Poster}" alt="">
                <div class="is-flex-direction-column is-justify-content-space-around is-align-content-center">
                <h2 class="title">${Title}</h2>
                <p><b>Genre</b>: ${Genre}</p>
                <p><b>Run-time</b>: ${Runtime}</p>
                <p><b>IMDB Ratings</b>: ${imdbRating}</p>
                <p><b>Country</b>: ${Country}</p>
                </div>
            </div>
            
            <div class="is-flex-direction-column">
                <p class="notification is-primary">Actors: ${Actors}</p>
                <p class="notification is-primary">Awards: ${Awards}</p>  
            </div>
            `

        })
    }
}

input.addEventListener('input', debounce(ontyping,300));

document.addEventListener('click', eventObj => {
    if (!root.contains(eventObj.target)) {
        dropdown.classList.remove('is-active');
    }
})