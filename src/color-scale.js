import { createWebview, makeColor } from './helpers'

const PALETTE_WIDTH = 550
const PALETTE_HEIGHT = 100

export default function(context) {
  const sketch = context.api()
  const document = sketch.selectedDocument
  const selection = document.selectedLayers
  const page = document.selectedPage
  let layerColors = []

  selection.iterate(layer => {
    if (layer.isShape) {
      layerColors.push(
        String(
          layer.style.sketchObject
            .fills()
            .firstObject()
            .color()
            .immutableModelObject()
            .stringValueWithAlpha(true)
        )
      )
    }
  })

  const handlers = {
    ready: function() {
      webview.eval(
        `window.renderColorScaleView('${layerColors[0] ||
          '#dddddd'}', '${layerColors[1] || '#000000'}')`
      )
    },
    insert: function(colorArray) {
      webview.close()
      const group = page.newGroup({
        frame: new sketch.Rectangle(0, 0, PALETTE_WIDTH, PALETTE_HEIGHT),
        name: 'Color Scale',
      })
      const swatchWidth = PALETTE_WIDTH / colorArray.length

      for (let i = 0; i < colorArray.length; i++) {
        const myStyle = new sketch.Style()
        myStyle.borders = ''
        myStyle.sketchObject
          .fills()
          .firstObject()
          .setColor(makeColor(colorArray[i]))
        const rect = group.newShape({
          frame: new sketch.Rectangle(swatchWidth * i, 0, swatchWidth, 100),
          style: myStyle,
        })
      }
    },
  }

  const webview = createWebview(context, handlers, 'Create Color Scale', 435)
}
