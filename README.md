# Chromatic Sketch

Create good-looking and perceptually uniform gradients and color scales (using [Chroma.js](https://github.com/gka/chroma.js) and the Lab color space)

![intro](https://cloud.githubusercontent.com/assets/1426460/25557981/a0e96b40-2d1d-11e7-9a5a-0bd3cbbdc746.png)

## Background
I came across [this](https://blog.bugsnag.com/chromatic-sass/) blog post recently. It opened my eyes to the [Lab color space](https://en.wikipedia.org/wiki/Lab_color_space), and how you can use it to create perceptually uniform gradients and color scales with SASS. Chroma.js is the underlying library powering it. Check it out if you want a deeper understanding of the Lab color space and why it's good for creating color scales. Basically, it's a color space that, unlike RGB, was built to mirror the visual response of the human eye. That makes it very well suited for interpolating colors.

I thought this technique would be useful in design tools as well, and was kind of surprised that I couldn't find any Sketch plugins that implemented it. So I created this :)

## Usage
#### Chromatic Sketch -> Fix Gradient
This command will take the gradient of the selected shape and add new color stops to create a more aesthetically pleasing one.

##### Before:
![gradient-before](https://cloud.githubusercontent.com/assets/1426460/25557875/2d980b26-2d1b-11e7-8e64-7615d15c1c41.png)

##### After:
![gradient-after](https://cloud.githubusercontent.com/assets/1426460/25557874/2d977bac-2d1b-11e7-9be6-b475f4ea74ae.png)

#### Chromatic Sketch -> Create Color Scale
This command will create a scale between the fill colors of two selected shapes.

##### Before:
![scale-before](https://cloud.githubusercontent.com/assets/1426460/25557873/2d89ba62-2d1b-11e7-8324-2ac7304687e6.png)

##### After:
![scale-after](https://cloud.githubusercontent.com/assets/1426460/25557872/2d7068fa-2d1b-11e7-980f-194eacb5a795.png)

## Install instructions
1. [Download .zip](https://github.com/petterheterjag/chromatic-sketch/archive/master.zip)
2. Extract contents
3. Navigate into the extracted folder and open chromatic-sketch.sketchplugin
4. Follow the on-screen prompts


## Building from source
1. Install dependencies: `npm install`
2. Install [skpm](https://github.com/sketch-pm/skpm): `npm install -g skpm`
3. Build plugin: `skpm build`
