console.log('Popup script loaded from Dead Frontier Scrapping version 1.0.0 loaded.');

let jsonData;

let xhr = new XMLHttpRequest();
xhr.open('GET', '/data.json', true);
xhr.responseType = 'json';
xhr.onload = () => {
    if (xhr.status === 200) {
        jsonData = xhr.response;
    }
};
xhr.send()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.dataType) {
        const name = message.dataType.split('_')[0];
        const data = jsonData[name]
        if (data === undefined) document.getElementById('scrap-data').innerText = '';

        document.getElementById('scrap-data').innerHTML = `
            <span>
                <b>Name:</b> ${data.name}
                <br>
                <b>Scrap Value:</b> $${addCommas(data.scrap_price)} (MC $${addCommas(data.mc_scrap_price)})
            </span>
        `
    }
});

function addCommas(num) {
    if (typeof num !== 'number') {
        throw new TypeError('Expected a number!');
    }

    const characters = parseInt(num, 10).toString();
    let output = '';
    for (let offset = characters.length; offset > 0; offset -= 3) {
        output = characters.slice(Math.max(offset - 3, 0), offset) + (output ? ',' + output : '');
    }
    return output;
}