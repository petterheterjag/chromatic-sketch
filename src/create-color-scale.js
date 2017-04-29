import chroma from 'chroma-js'
import {makeColor, buildDialog} from './common'

function buildInputDialog() {
  let alert = buildDialog('Create Color Scale', 'How many steps do you want in the scale?')

  alert.addTextLabelWithValue('Steps')
  alert.addTextFieldWithValue('5')
  alert.addButtonWithTitle('OK')
  alert.addButtonWithTitle('Cancel')

  return alert;
}

function handleAlertResponse(alert, responseCode) {
  if (responseCode == "1000") {
    return alert.viewAtIndex(1).stringValue()
  }

  return null;
}

export default function (context) {
  if (context.selection.length != 2) {
    buildDialog('Create Color Scale', 'Select two shapes with color fills!').runModal()
    return
  }

  //console.log(context.selection.treeAsDictionary())
  const selectedLayers = [context.selection[0], context.selection[1]]
  selectedLayers.forEach(function(layer) {
    layer.hex = '#' + layer.style().fills().firstObject().color().immutableModelObject().hexValue()
  });

  const scale = chroma.scale([selectedLayers[0].hex, selectedLayers[1].hex]).mode('lab')

  let alert = buildInputDialog()
  let numberOfColors = handleAlertResponse(alert, alert.runModal())

  for (let i = 0; i < numberOfColors; i++) {
    let layerCopy = selectedLayers[0].duplicate()
    layerCopy.moveBySuggestedOffset({
      width: i * layerCopy.frame().width(),
      height: layerCopy.frame().height() + 50
    })
    
    let fill = layerCopy.style().fills().firstObject()
    fill.setColor(makeColor(scale(1 / (numberOfColors - 1) * i).hex()))
  }
}
