let yesButton;
let noButton;
let buttonsDiv;
let noCount = 0;

// Get the name from the current URL
let url = new URL(window.location.href);
let name = url.searchParams.get('naam');
console.log('Name:', name);

function init() {
    yesButton = document.getElementById('yes');
    noButton = document.getElementById('no');
    buttonsDiv = document.getElementById('buttons');

    yesButton.addEventListener('click', () => {
        yesButtonClicked();
    });

    noButton.addEventListener('click', () => {
        noButtonClicked();
    });
}

function noButtonClicked() {
    noCount++;
    setNoText(noCount);
}

function yesButtonClicked() {
    console.log('Yes button clicked');

    // Add an entry to a json file with name, date and time and the noCount and save it to entries.json
    let entry = {
        name: name,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        noCount: noCount
    };
    // save the entry to the json file
    saveEntry(entry);
}

function saveEntry(entry) {
    // get the entries from the json file ./entries.json
    let xhr = new XMLHttpRequest(),
        method = "POST",
        url = "/save-entry";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('Entry saved');
            // Redirect to the thank you page
            window.location.href = '/love.html?naam=' + name;
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(entry));
}

function setNoText(count) {
    switch (count) {
        case 0:
            noButton.innerText = 'Nee?';
            break;
        case 1:
            noButton.innerText = 'Echt niet?';
            break;
        case 2:
            noButton.innerText = 'Meen je dat? echt niet?';
            break;
        case 3:
            noButton.innerText = 'Nog steeds niet?';
            break;
        case 4:
            noButton.innerText = 'Echt niet? Nog steeds?';
            break;
        case 5:
            noButton.innerText = 'Maar hoezo niet?';
            break;
        case 6:
            noButton.innerText = 'Daar gaat mn hart... dan maar de enige optie die ik heb...';
            break;
        case 7:
            noButton.innerText = 'Je kunt nu nog op ja klikken...';
            break;
        case 8:
            noButton.innerText = 'Nu moet ik wel...';
            break;
        case 9:
            noButton.innerText = 'Nog een laatste kans...';
            break;
        case 10:
            noButton.innerText = 'Vooruit dan maar...';
            break;
        default:
            noButton.remove();
            break;
    }
}