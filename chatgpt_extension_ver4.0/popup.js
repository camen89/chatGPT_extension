// バックグラウンドから最新の文字数を取得して表示
function updateCount() {
    chrome.runtime.sendMessage({ type: "getCount" }, (response) => {
        document.getElementById("count").textContent = response.count;
    });
}

// リアルタイムで文字数が更新されたときに表示を更新
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "countUpdated") {
        document.getElementById("count").textContent = message.count;
    }
});

// ポップアップが開かれたときに文字数を初期化
document.addEventListener("DOMContentLoaded", updateCount);
