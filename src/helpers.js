import WebUI from 'sketch-module-web-view'

export function makeColor(c) {
  return MSImmutableColor.colorWithRed_green_blue_alpha(
    c[0] / 255,
    c[1] / 255,
    c[2] / 255,
    c[3]
  ).newMutableCounterpart()
}

export function buildDialog(message, informativeText) {
  var alert = COSAlertWindow.new()
  alert.setMessageText(message)
  alert.setInformativeText(informativeText)
  return alert
}

export function createWebview(context, handlers, title, height) {
  const v = 242 / 255
  const grayColor = NSColor.colorWithRed_green_blue_alpha(v, v, v, 1)
  let options = {
    identifier: 'unique.id',
    x: 0,
    y: 0,
    width: 630,
    height: height,
    background: grayColor,
    blurredBackground: false,
    onlyShowCloseButton: false,
    title: title,
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    handlers: handlers,
  }
  return new WebUI(context, 'index.html', options)
}
