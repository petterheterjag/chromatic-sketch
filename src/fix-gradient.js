import chroma from 'chroma-js'
import {makeColor, buildDialog} from './common'

const NEW_STOPS_IN_BETWEEN = 4

function makeStop(position, hexColor) {
  return MSGradientStop.stopWithPosition_color_(position, makeColor(hexColor))
}

export default function (context) {
  if (context.selection.length == 0) {
    buildDialog('Fix Gradient', 'Select a shape with a gradient first!').runModal()
    return
  }

  selected = context.selection[0]
  let gradient = selected.style().fills().firstObject().gradient()
  //console.log(gradient.treeAsDictionary())
  
  let stops = gradient.stops()
  let improvedStops = []

  for (let i = 1; i < stops.length; i++) {
    const stopPair = [stops[i - 1], stops[i]]
    stopPair.forEach(function(stop) {
      stop.pos = stop.position()
      stop.hex = '#' + stop.color().immutableModelObject().hexValue()
    });

    const prevStop = stopPair[0]
    const nextStop = stopPair[1]
    const scale = chroma.scale([prevStop.hex, nextStop.hex]).mode('lab')
    const distance = nextStop.pos - prevStop.pos

    if (i == 1) { improvedStops.push(makeStop(prevStop.pos, prevStop.hex)) }

    for (let j = 1; j <= NEW_STOPS_IN_BETWEEN; j++) {
      const newStopDistance = 1 / (NEW_STOPS_IN_BETWEEN + 1) * j
      improvedStops.push(makeStop(prevStop.pos + newStopDistance * distance, scale(newStopDistance).hex()))
    }

    improvedStops.push(makeStop(nextStop.pos, nextStop.hex))
  }

  gradient.setStops(improvedStops)
}
