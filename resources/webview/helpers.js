import chroma from 'chroma-js'

const GRADIENT_STOPS = 5

export function interpolateArray(array) {
  let interpolatedArray = []

  for (let i = 0; i < array.length - 1; i++) {
    const difference = array[i + 1] - array[i]
    const interpolatedDifference = difference / GRADIENT_STOPS

    for (let j = 0; j <= GRADIENT_STOPS; j++) {
      interpolatedArray.push(array[i] + interpolatedDifference * j)
    }
  }

  return interpolatedArray
}

export function createGradientStyle(scale, positionArray = [0, 1]) {
  let colorArray = []
  interpolateArray(positionArray).forEach(function(position) {
    colorArray.push(scale(position).css())
  })
  return `linear-gradient(to right, ${colorArray.join()})`
}

export function getTextColor(color) {
  if (chroma.contrast(color, '#fff') * color.alpha() < 2) {
    return '#000'
  } else {
    return '#fff'
  }
}
