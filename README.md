# Chromatic Sketch

Create good-looking and perceptually uniform gradients and color scales (using [Chroma.js](https://github.com/gka/chroma.js) and the Lab color space)

![intro](https://cloud.githubusercontent.com/assets/1426460/25557981/a0e96b40-2d1d-11e7-9a5a-0bd3cbbdc746.png)

## New in version 2.0.0
- A proper UI that let's you preview and customize the gradient or color scale
- You can now use the Lch, HSL and RGB color modes in addition to Lab
- Support for colors with alpha

## Background
I came across [this](https://blog.bugsnag.com/chromatic-sass/) blog post recently. It opened my eyes to the [Lab color space](https://en.wikipedia.org/wiki/Lab_color_space), and how you can use it to create perceptually uniform gradients and color scales with SASS. Chroma.js is the underlying library powering it. Check it out if you want a deeper understanding of the Lab color space and why it's good for creating color scales. Basically, it's a color space that, unlike RGB, was built to mirror the visual response of the human eye. That makes it very well suited for interpolating colors.

I thought this technique would be useful in design tools as well, and was kind of surprised that I couldn't find any Sketch plugins that implemented it. So I created this :)

## Usage
#### Chromatic Sketch -> Fix Gradient
This command will take the gradient of the selected shape and add new color stops to create a more aesthetically pleasing one.

![Fix Gradient](https://user-images.githubusercontent.com/1426460/33186103-4ff74096-d087-11e7-940d-0ee41190aab4.png)

#### Chromatic Sketch -> Create Color Scale
This command will create a scale between the fill colors of two selected shapes.

![Create Color Scale](https://user-images.githubusercontent.com/1426460/33186102-4e2d8734-d087-11e7-8299-356ecbe83b58.png)

## Install instructions
1. [Download .zip](https://github.com/petterheterjag/chromatic-sketch/archive/master.zip)
2. Extract contents
3. Navigate into the extracted folder and open chromatic-sketch.sketchplugin
4. Follow the on-screen prompts


## Building from source
1. Install dependencies: `npm install`
2. Build plugin: `npm run build`

## Created by
Petter Nilsson  
[Twitter](https://twitter.com/petterheterjag)  
[Website](http://petter.pro)

