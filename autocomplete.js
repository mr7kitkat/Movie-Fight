const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue
}) => {
    root.innerHTML = `
        <div class="dropdown">
        <input class="input is-normal is-fluid" type="text" placeholder="Normal input" >
        <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    `;

    const summary = root.querySelector('.results');
    const dropdown = root.querySelector('.dropdown');
    const input = root.querySelector('input');

    const ontyping = async eventObj => {
        const list = await searchMovieWithName(eventObj.target.value);
        console.log(list);

        if (!list.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        summary.innerHTML = ''
        dropdown.classList.add('is-active');

        for (let item of list) {
            const anchor = document.createElement('a');
            anchor.classList.add('dropdown-item');
            anchor.innerHTML = renderOption(item);
            summary.append(anchor);

            anchor.addEventListener('click',() => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item, root);
            })
        }
    }

    input.addEventListener('input', debounce(ontyping,300));
    

    document.addEventListener('click', eventObj => {
        if (!root.contains(eventObj.target)) {
            dropdown.classList.remove('is-active');
        }
    })
}


