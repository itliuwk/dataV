export const isFullscreenForNoScroll = () => {
  var explorer = window.navigator.userAgent.toLowerCase()
  let flag = false
  if (explorer.indexOf('chrome') > 0) {
    if (
      document.body.scrollHeight === window.screen.height &&
      document.body.scrollWidth === window.screen.width
    ) {
      flag = true
    } else {
      flag = false
    }
  } else {
    if (
      window.outerHeight === window.screen.height &&
      window.outerWidth === window.screen.width
    ) {
      flag = true
    } else {
      flag = false
    }
  }
  console.log('flag: ', flag)
  return flag
}
