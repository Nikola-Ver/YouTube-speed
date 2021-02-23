const root = document.getElementById('root');
const btnMinus = document.getElementById('minus');
const btnPlus = document.getElementById('plus');
const txtNumber = document.getElementById('number');

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function changeSpeed(delta) {
  if (txtNumber.textContent.length > 0) {
    const speed = Number.parseFloat(txtNumber.textContent) + delta;

    if (!isNaN(speed) && speed <= 16 && speed > 0.07) {
      if (delta !== 0) txtNumber.textContent = speed;
      document.cookie = `youtubeSpeed=${speed}`;

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
  changeSpeed(0.25);
};

btnMinus.onmousedown = () => {
  changeSpeed(-0.25);
};

txtNumber.onkeyup = () => {
  changeSpeed(0);
};

document.body.onkeydown = (e) => {
  if (e.key === '+') {
    changeSpeed(0.25);
    root.classList.add('active');
  }

  if (e.key === '-') {
    changeSpeed(-0.25);
    root.classList.add('active');
  }
};

root.onmousemove = () => {
  if (root.classList.contains('active'))
    root.classList.remove('active');
}

(() => {
  const prevSpeed = Number.parseFloat(getCookie('youtubeSpeed'));
  if (prevSpeed) txtNumber.textContent = prevSpeed;
})();
