import { createWebview, makeColor, buildDialog } from './helpers'

function makeStop(position, color) {
  return MSGradientStop.stopWithPosition_color_(position, makeColor(color))
}

export default function(context) {
  if (context.selection.length == 0) {
    buildDialog(
      'Fix Gradient',
      'Select a shape with a gradient first'
    ).runModal()
    return
  }

  const selected = context.selection[0]
  const gradient = selected
    .style()
    .fills()
    .firstObject()
    .gradient()
  let positionArray = []
  let colorArray = []

  for (let i = 0; i < gradient.stops().length; i++) {
    const stop = gradient.stops()[i]
    colorArray.push(
      String(
        stop
          .color()
          .immutableModelObject()
          .stringValueWithAlpha(true)
      )
    )
    positionArray.push(stop.position())
  }

  const handlers = {
    ready: function() {
      webview.eval(
        `window.renderGradientView(${JSON.stringify(
          colorArray
        )}, ${JSON.stringify(positionArray)})`
      )
    },
    applyGradient: function(stopArray) {
      let sketchStopArray = []
      stopArray.forEach(function(stop) {
        sketchStopArray.push(makeStop(stop.position, stop.color))
      })
      gradient.setStops(sketchStopArray)
      webview.close()
    },
  }

  const webview = createWebview(context, handlers, 'Fix Gradient', 410)
}
