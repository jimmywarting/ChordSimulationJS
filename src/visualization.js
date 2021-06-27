
class CanvasChord {
  /**
   * @param {number} [size]
   * @param {AbortSignal} [signal]
   */
  constructor (size = 700, signal) {
    /** @type {HTMLCanvasElement} */
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = size
    this.canvas = canvas
    let radius = size / 2
    ctx.translate(radius, radius)
    radius = radius * 0.60
    const interval = setInterval(draw.bind(null, ctx, radius, size), 500)
    signal && signal.addEventListener('abort', clearInterval.bind(null, interval), { once: true })
  }
}

function draw (ctx, radius, size) {
	// Reset canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0)
	ctx.clearRect(0, 0, size, size)
	ctx.translate(size / 2, size / 2)

  drawFace(ctx, radius)
  drawNumbers(ctx, radius)
  // drawTime(ctx, radius)

}

function drawFace(ctx, radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.stroke()
}

function drawNumbers(ctx, radius) {
	ctx.fillStyle = 'rgb(0, 102, 153)'
	ctx.closePath()
  var ang
  var num
  ctx.font = radius * 0.07 + "px arial"
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"

	// radius += 10

	var q = (90 * (Math.PI / 180))
	var maxId = Number('0x'+'f'.repeat(40))
	var half = maxId / 2
	var twoPi = Math.PI*2

	for (num = 0; num < maxId; num += Math.floor(maxId / 3)) {
		ctx.textAlign = num > half ? "right" : 'left'
    ang = num / maxId * twoPi + (num > half ? q : -q)
		ctx.save()
		ctx.rotate(ang)
    ctx.translate(num > half ? -radius : radius, 0)
    ctx.fillText(num.toString(16).padEnd(6, 0).slice(0, 6), num > half ? -10 : 10, 0)
		ctx.beginPath()
		ctx.arc(0, 0, 3, 0, 2 * Math.PI)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()
  }
}

const canvasChord = new CanvasChord()
document.querySelector('#canvas').append(canvasChord.canvas)
canvasChord.canvas.style.letterSpacing = '2px'

// var node = chord.nodes.slice(0).map(e => e.id)
// var drawid = 0
// var showText = true
// var gui
// function removeDuplicates(arr) {
// 	let unique_array = []
// 	for (let i = 0; i < arr.length; i++) {
// 		if (unique_array.indexOf(arr[i]) == -1) {
// 			unique_array.push(arr[i])
// 		}
// 	}
// 	return unique_array
// }

// var maxId = Number(BigInt(2) << BigInt(chord.addressSize - 1))
// function drawFingerprint(_node, color) {
// 	let a = map(_node.id, 0, maxId, 0, TWO_PI) - HALF_PI
// 	let x = 300 * cos(a)
// 	let y = 300 * sin(a)
// 	let fingerIds = removeDuplicates(_node.finger)

// 	for (let i = 0; i < fingerIds.length; i++) {
// 		let a1 = map(fingerIds[i], 0, maxId, 0, TWO_PI) - HALF_PI
// 		let x1 = 300 * cos(a1)
// 		let y1 = 300 * sin(a1)
// 		stroke(color)
// 		line(x, y, x1, y1)
// 		noStroke()
// 	}
// }

// let ids = chord.nodes

// var canvas

// function setup() {
// 	canvas = createCanvas(720, 720)
// 	canvas.parent("canvas")
// 	canvas.background('#f0f0f0')
// 	canvas.translate(width / 2, height / 2)
// 	for (let i = 0; i < chord.nodesNumber; i++) {
// 		let a = map(chord.nodes[i].id, 0, maxId, 0, TWO_PI) - HALF_PI
// 		let x = 300 * cos(a)
// 		let y = 300 * sin(a)
// 		textSize(12)
// 		fill(0, 102, 153)
// 		text(chord.nodes[i].id, x + 10, y + 10)
// 		fill(0xfff)
// 		ellipse(x, y, 5, 5)
// 	}
// 	noFill()
// 	stroke(color(0, 0, 0, 80))
// 	ellipse(0, 0, 600, 600)
// 	line(0, -310, 0, -290)
// 	text("0", -2, -315)

// 	sliderRange(0, 2 ** 16, 1)
// 	gui = createGui('Controller', 650, 50)
// 	gui.addGlobals("node", "showText")
// }

// function draw() {
// 	canvas.background('#f0f0f0')
// 	translate(canvas.width / 2, canvas.height / 2)
// 	for (let i = 0; i < chord.nodesNumber; i++) {
// 		let a = map(chord.nodes[i].id, 0, maxId, 0, TWO_PI) - HALF_PI
// 		let x = 300 * cos(a)
// 		let y = 300 * sin(a)
// 		if (showText) {
// 			textSize(12)
// 			fill(0, 102, 153)
// 			text(chord.nodes[i].id, x + 10, y + 10)
// 		}
// 		fill(0xfff)
// 		ellipse(x, y, 5, 5)
// 	}
// 	noFill()
// 	stroke('#000000aa')
// 	ellipse(0, 0, 600, 600)
// 	canvas.line(0, -310, 0, -290)
// 	canvas.text("0", -2, -315)
// 	for (let i = 0; i < ids.length; i++) {
// 		drawFingerprint(ids[i], '#00000020')
// 	}
// 	drawFingerprint(chord.getNodeById(parseInt(node)), 'red')
// 	translate(0,0)
// 	let val = drawid
// 	let a = map(val, 0, maxId, 0, TWO_PI) - HALF_PI
// 	let x = 300 * cos(a)
// 	let y = 300 * sin(a)
// 	canvas.fill('red')
// 	ellipse(5, 5, 20, 20)

// }

// document.getElementById("btn").onclick = function () {
// 	var val = document.getElementById("nn").value
// 	var n = parseInt(val)
// 	if (!isNaN(n)) {
// 		window.location.replace(location.protocol + '//' + location.host + location.pathname + "?nn=" + n)
// 	}
// }
