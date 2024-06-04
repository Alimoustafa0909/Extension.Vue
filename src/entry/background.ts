chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {

// i think i can write here the sender tab id it will work because it will detect from the contentScript
    if (message.action === 'start_activity') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0]?.id;
            if (tabId !== undefined) {
                chrome.tabs.sendMessage(tabId, { action: 'start_detecting' });
            } else {
                console.error("No active tab found.");
            }
        });
    }

    if (message.action === 'form_detected') {
        try {
            // Fetch a random quote from the API
            const quote = await fetchRandomQuote();
            // Ensure sender.tab and sender.tab.id are defined before sending the message
            if (sender.tab && typeof sender.tab.id === 'number') {
                console.log(sender);
                chrome.tabs.sendMessage(sender.tab.id, { type: 'quote', content: quote });
            } else {
                console.error('Sender tab or tab ID is undefined.');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    } else if (message.action === 'no_form_detected') {
        try {
            // Fetch a random image from the link
            const imageUrl = await fetchRandomImage();
            // Ensure sender.tab and sender.tab.id are defined before sending the message
            if (sender.tab && typeof sender.tab.id === 'number') {
                chrome.tabs.sendMessage(sender.tab.id, { type: 'image', url: imageUrl });
            } else {
                console.error('Sender tab or tab ID is undefined.');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }
});

// Function to fetch a random quote from the API
async function fetchRandomQuote(): Promise<string> {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error; // Propagate the error to the caller
    }
}

// Function to fetch a random image from the link
async function fetchRandomImage(): Promise<string> {
    try {
        const response = await fetch('https://random.imagecdn.app/500/150');
        return response.url;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error; // Propagate the error to the caller
    }

}
