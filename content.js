console.log('Content script from Dead Frontier Scrapping Data version 1.0.0 loaded.');

document.addEventListener('mouseover', (event) => {
    if (event.target.dataset.type) {
        chrome.runtime.sendMessage({ dataType: event.target.dataset.type });
    }
});