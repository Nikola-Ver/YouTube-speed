chrome.extension.onMessage.addListener((speed) => {
  document.getElementsByClassName(
    'video-stream html5-main-video'
  )[0].playbackRate = speed;
});
