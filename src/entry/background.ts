chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
     // 1-  First when we click the start activity and call the startactivty function underneath
    if (message.action === 'start_activity') {
        startActivity();
        console.log('elahly');
    }
    //5-he listen to the message and check if there is form or not and according to that he fetch a (quote-image)

   else if (message.action === 'form_detected') {
        try {
            const quote = await fetchRandomQuote();
            //there is typescript here if we removed the if condition he give us an error 
            if (sender.tab && sender.tab.id !== undefined) {
                chrome.tabs.sendMessage(sender.tab.id, { type: 'quote', content: quote });
            } else  {
                console.error('Sender tab is undefined.');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    } else if (message.action === 'no_form_detected') {
        try {
            const imageUrl = await fetchRandomImage();

            if (sender.tab && sender.tab.id !== undefined) {
                chrome.tabs.sendMessage(sender.tab.id, { type: 'image', url: imageUrl });
            } else {
                console.error('Sender tab is undefined.');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }
});
// 2- when the function called here it check if there is any Tab found and send the Id and message to content Script
// to check if there is any form in the page or not
function startActivity() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //there is typescript here if we removed the tabId!== undefined compiler will give us an error 
        const tabId = tabs[0].id;
        if (tabId !== undefined) {
            chrome.tabs.sendMessage(tabId, { action: 'detecting' });
        } else {
            console.error('No active tab found.');
        }
    });
}

async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error; // Propagate the error to the caller
    }
}

async function fetchRandomImage() {
    try {
        const response = await fetch('https://random.imagecdn.app/500/150');
        return response.url;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}
