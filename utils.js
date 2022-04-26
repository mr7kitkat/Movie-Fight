const debounce = (func, delay = 1000) => {
    let timeout;
    return (...strs) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func.apply(null, strs);
        }, delay)
    }
}
