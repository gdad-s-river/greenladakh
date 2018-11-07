/* eslint-disable */

export default function(sketch) {
  sketch.setup = function setup() {
    sketch.noLoop()
    let { canvas: mountainsCanvas } = sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight
    )

    /**
     * implicit fixing of scrolls that come with canvas
     * done here, so that won't have to handle in global css
     * followed from https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window
     * but modified because `style` on default returned object from createCanvas was undefined instead of a function
     */
    mountainsCanvas.style.display = 'block'
    sketch.noStroke()
    sketch.colorMode(sketch.HSB, 360, 255, 255)
  }

  sketch.windowResized = function windowResized() {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
  }

  sketch.draw = function draw() {
    let addSharpness = -0.03 // -0.3 to 0.3 reasonable

    sketch.noiseDetail(9, 0.5 + addSharpness)

    let skyHeight = sketch.height / 10
    let noiseWidth = sketch.height / 3
    let noiseHeight = sketch.height
    let layerDifference = 100 // try 0.3
    let layers = 12
    let barWidth = 1 // try 15
    let minScale = 0.075
    let maxScale = 0.55

    sketch.background(getColor(0))

    for (var i = 1; i < layers; i++) {
      var scale = sketch.exp(
        sketch.map(i, 0, layers - 1, sketch.log(minScale), sketch.log(maxScale))
      )
      var y =
        sketch.map(i, 0, layers, 0, sketch.height) * 1.7 * scale + skyHeight // 1.7 is a quick fix

      var lightness = sketch.map(i, 0, layers - 1, 0, 1)
      sketch.fill(getColor(lightness))

      var xShift = 100 + sketch.millis() * 0.0002
      for (var x = 0; x < sketch.width; x = x + barWidth) {
        var xCentered = x - sketch.width / 2
        var noiseValue = sketch.noise(
          xCentered / scale / noiseWidth + xShift,
          i * layerDifference
        )
        var yMaxDifference = (-noiseHeight / 2) * scale
        var dy = sketch.map(noiseValue, 0, 1, -yMaxDifference, yMaxDifference)
        sketch.rect(sketch.int(x), sketch.int(y + dy), barWidth, sketch.height) // int() makes the edges more sharp
      }
    }
  }

  function getColor(lightness) {
    var gamma = sketch.exp(1.75 - lightness * 1.075) // lightness and contrast parameters
    lightness = (sketch.pow(lightness, gamma) * 192) / 255 // *192/255 is a quick fix

    var hue1 = 60
    var hue2 = 230
    var addSaturation = 0.05
    var addBrightness = -0.35

    return sketch.color(
      sketch.map(lightness, 0, 1, hue1, hue2),
      sketch.map(
        sketch.pow(lightness, sketch.exp(-addSaturation)),
        0,
        1,
        48,
        255
      ),
      sketch.map(
        sketch.pow(lightness, sketch.exp(addBrightness)),
        0,
        1,
        255 - 16,
        0
      )
    )
  }
}
