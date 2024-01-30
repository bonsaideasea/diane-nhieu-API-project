// ZEN QUOTES API
const urlQuotes = 'https://zenquotes.io/api/quotes/'
const requestQuotes = new Request(urlQuotes)

async function getQuotes() {
    let responseQuotes = await fetch(requestQuotes);
    let quotesArray = await responseQuotes.json();
    console.log("here are the quotes:", quotesArray);
    
    //GRAB A RANDOM QUOTE
    document.querySelector('#generateButton').addEventListener('click', () => {
        function getRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotesArray.length);
            return quotesArray[randomIndex].q;
        }

        const acquiredQuote = getRandomQuote();
        const titleQ = document.querySelector('#titleQ');
        if(titleQ) {
                titleQ.parentNode.removeChild(titleQ);}

        document.querySelector('#generated-quote').textContent = acquiredQuote;
        return quotesArray;
    })
}
const promise1 = getQuotes();


// CAT API
const urlCats = 'https://api.thecatapi.com/v1/images/search?limit=50'

const requestCats = new Request(urlCats, {
    headers: {
        'x-api-key': 'live_acRDKx0TIfO4sdhrpP4YcApkCC0J0TAZHnvIqqofFgtFXj2N4o3opwiDaI6QtrbI'
    }
});

const promise2 = fetch(requestCats)
        .then(responseCats => responseCats.json())
        .then(catsArray => {
            console.log("here are the cats:", catsArray);

            //ADDING A WORKER CLASS
            const worker = new Worker('./meowmeow.js');

            worker.addEventListener('message', (message) => {
                const acquiredCat = message.data;
                document.querySelector('#generated-cat').src = acquiredCat;
                console.log(acquiredCat);
            });
    
            document.querySelector('#generateButton').addEventListener('click', () => {
                // Send a message to the worker to get a random cat URL
                worker.postMessage({ action: 'getRandomCat', catsArray });
            });           
        })
        .catch(errorCats => {
            console.log('error: data not returned');
            throw errorCats; 
        });


// RESOLVING THE PROMISES
const fetchSuccess = Promise.all([promise1, promise2])
        .then((responses) => {
            for (const response of responses){
                console.log("wow it actually worked");
            }
        }) 
        .catch((error) => {
            console.error("error: we couldn't fetch");
        });     
console.log(fetchSuccess)


function fetchDesires() {
    fetchSuccess.then(() => {
        console.log('both promises resolved');
    })
    .catch(() => {
        console.log('at least one promise rejected');
    });
}
fetchDesires();


Promise.any([promise1, promise2])
    .then((value) => {
        console.log("one of the promises resolved. good job", value);
    }) 
    .catch((error) => {
        console.log("both promises were rejected", error);
    });


