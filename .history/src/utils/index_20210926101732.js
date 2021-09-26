export const isFullscreenForNoScroll = () => {
  var explorer = window.navigator.userAgent.toLowerCase()
  if (explorer.indexOf('chrome') > 0) {
    if (
      document.body.scrollHeight === window.screen.height &&
      document.body.scrollWidth === window.screen.width
    ) {
      Promise.resolve(true)
    } else {
      Promise.resolve(false)
    }
  } else {
    if (
      window.outerHeight === window.screen.height &&
      window.outerWidth === window.screen.width
    ) {
      Promise.resolve(true)
    } else {
      Promise.resolve(false)
    }
  }
}
