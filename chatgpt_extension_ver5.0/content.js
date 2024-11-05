// 画像読み込み用の関数
function addImage() {
    const img = document.createElement('img');
    img.id = 'custom-image';
    img.src = 'https://raw.githubusercontent.com/camen89/chatGPT_extension/dad9ecbfd13cb423ce8083cb75d700a35292d204/%E6%B0%B4%E7%94%BB%E5%83%8F_%E3%82%A2%E3%83%BC%E3%83%88%E3%83%9C%E3%83%BC%E3%83%89%201%20%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC%203.svg';
    img.style.position = 'fixed';
    img.style.top = '100px';
    img.style.right = `${10 + document.querySelectorAll('.custom-image').length * 40}px`; // 画像を横にずらして追加
    img.style.zIndex = '9999';
    img.style.width = '40px'; // サイズを指定
    img.style.height = 'auto';
    img.className = 'custom-image'; // クラス名を追加して後で参照できるようにする
    // 画像をドキュメントに追加
    document.body.appendChild(img);
}


//////////英語のワード数カウント機能//////////
// ChatGPTの回答が表示される要素のセレクタ
const targetSelector = 'div[class="markdown prose w-full break-words dark:prose-invert dark"]';

let lastWordCount = 0;
let previousSum = 0;

// ml表示用の要素を作成
const counterDisplay = document.createElement('div');
counterDisplay.id = 'word-counter';
counterDisplay.style.position = 'fixed';
counterDisplay.style.bottom = '10px';
counterDisplay.style.right = '10px';
counterDisplay.style.fontSize = '50px';
counterDisplay.style.backgroundColor = 'rgb(33,33,33)';
counterDisplay.style.color = 'white';
counterDisplay.style.padding = '10px';
counterDisplay.style.zIndex = '10000000';
document.body.appendChild(counterDisplay); // ページに要素を追加

// 文字数表示用の要素を作成
const counterMlDisplay = document.createElement('div');
counterMlDisplay.id = 'ml-counter';
counterMlDisplay.style.position = 'fixed';
counterMlDisplay.style.top = '10px';
counterMlDisplay.style.left = '10px';
counterMlDisplay.style.fontSize = '30px';
counterMlDisplay.style.backgroundColor = 'rgb(23,23,23)';
counterMlDisplay.style.color = 'white';
counterMlDisplay.style.padding = '10px';
counterMlDisplay.style.zIndex = '10000000';
document.body.appendChild(counterMlDisplay); // ページに要素を追加

// 文字数をカウントして画面に表示する関数
function updateWordCount() {
    // const targetNode = document.querySelector(targetSelector);
    const targetNode = document.querySelectorAll(targetSelector);
    const targetNodeLength = document.querySelectorAll(targetSelector).length;
    console.log(targetNodeLength);
    const targetNodeItem = targetNode.item(`${targetNodeLength}` - 1);
    const targetNodeItemText = targetNode.item(`${targetNodeLength}` - 1).textContent;
    console.log(targetNodeItemText);


    if (targetNode) {
        const answerText = targetNodeItem.innerText || "";
        const words = answerText.trim().split(/\s+/); // スペースで分割
        const wordCount = words.filter(word => word.length > 0).length; // 空の文字列を除外してカウント

        // ワード数が変更された場合のみ処理
        if (wordCount !== lastWordCount) {
            lastWordCount = wordCount;
            console.log(`現在のワード数: ${wordCount}`); // コンソールに表示

            // counterDisplay.style.fontSize = `${wordCount}` / 5 + 'px';

            // バックグラウンドスクリプトにワード数を送信
            chrome.runtime.sendMessage({ type: "updateCount", count: wordCount });

            // ワード数を画面に表示
            counterDisplay.textContent = `${wordCount}` * 519 / 100 + 'ml';
            counterMlDisplay.textContent = `${wordCount} words`;
        }

        let sum = 0;
        for (let i = 0; i < targetNodeLength; i++) {
            const targetNodeItem = targetNode.item(i);
            const answerText = targetNodeItem.innerText || "";
            const words = answerText.trim().split(/\s+/);
            const wordCount = words.filter(word => word.length > 0).length;
            console.log(`テキスト${i}:${wordCount}words`);
            sum = sum + wordCount;
            console.log(sum);
        }
        console.log(sum);
        counterMl = `${sum}` * 519 / 100;
        console.log(counterMl);
        counterDisplay.textContent = `${sum}` * 519 / 100 + 'ml';

        // 画像を追加
        const imagesToDisplay = Math.floor(counterMl / 500); // 500ごとの章の数
        const existingImages = document.querySelectorAll('.custom-image');

        // すでに表示されている画像を削除
        existingImages.forEach(img => img.remove());

        // 画像を指定した数だけ追加
        for (let j = 0; j < imagesToDisplay; j++) {
            addImage(10 + j * 60); // 画像を横にずらして追加
        }
    }
}

// 1秒ごとにワード数を更新
setInterval(updateWordCount, 1000); // 更新頻度を1秒に変更


