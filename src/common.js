export function makeColor(SVGString) {
  return MSImmutableColor.colorWithSVGString(SVGString).newMutableCounterpart()
}

export function buildDialog(message, informativeText) {
  var alert = COSAlertWindow.new()

  alert.setMessageText(message)
  alert.setInformativeText(informativeText)

  return alert
}