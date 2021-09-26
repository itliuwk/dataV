export const isFullscreenForNoScroll = () => {
  var explorer = window.navigator.userAgent.toLowerCase()
  if (explorer.indexOf('chrome') > 0) {
    // webkit
    if (
      document.body.scrollHeight === window.screen.height &&
      document.body.scrollWidth === window.screen.width
    ) {
      return true
    } else {
      return false
    }
  } else {
    // IE 9+  fireFox
    if (
      window.outerHeight === window.screen.height &&
      window.outerWidth === window.screen.width
    ) {
      return true
    } else {
      return false
    }
  }
}
