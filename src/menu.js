const btnMinus = document.getElementById('minus');
const btnPlus = document.getElementById('plus');
const txtNumber = document.getElementById('number');

function changeSpeed(delta) {
  if (txtNumber.textContent.length > 0) {
    const speed = Number.parseFloat(txtNumber.textContent) + delta;
    if (!isNaN(speed) && (speed <= 16) && (speed > 0.07)) {
      if (delta !== 0) txtNumber.textContent = speed;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, speed);
      });
    } else if (delta === 0) {
      const defaultVal = 1;
      txtNumber.textContent = defaultVal;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, defaultVal);
      });
    }
  }
}

btnPlus.onmousedown = () => {
  changeSpeed(1);
};

btnMinus.onmousedown = () => {
  changeSpeed(-1);
};

txtNumber.onkeyup = () => {
  changeSpeed(0);
};
