let currentCharacterCount = 0;

// コンテンツスクリプトからメッセージを受け取り文字数を更新
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateCount") {
        currentCharacterCount = message.count;

        // コンソールに現在の文字数を表示
        console.log("受信した文字数:", currentCharacterCount);
        
        // ポップアップが開いている場合、リアルタイムで更新
        chrome.runtime.sendMessage({ type: "countUpdated", count: currentCharacterCount });
    }
});

// ポップアップが開かれたときに現在の文字数を提供
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getCount") {
        sendResponse({ count: currentCharacterCount });
    }
});
