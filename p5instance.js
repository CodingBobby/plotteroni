function setup() {
    createCanvas(cvs.w, cvs.h)
}
function draw() {
    background(255)

    // axis
    stroke(10)
    strokeWeight(1)
    line(0, center.y, cvs.w, center.y)
    line(center.x, cvs.h, center.x, 0)

    // tics
    for (var i = tics.y.n; i <= tics.y.p; i++) {
        if (i == 0) i++

        stroke(10)
        strokeWeight(1)
        line(center.x - 5, center.y - i * one.y, center.x + 5, center.y - i * one.y)

        noStroke()
        fill(1)
        text(i.toString(), center.x + 10, center.y - i * one.y + 5)
    }
    for (var i = tics.x.n; i <= tics.x.p; i++) {
        if (i == 0) i++

        stroke(10)
        strokeWeight(1)
        line(center.x - i * one.x, center.y - 5, center.x - i * one.x, center.y + 5)

        noStroke()
        fill(1)
        j = -i
        text(j.toString(), center.x - i * one.x - 2.5 * j.toString().length, center.y + 20)
    }

    // plot
    noFill()
    strokeWeight(1.5)
    for (var f in fig) {
        let cc = f % colors.length
        stroke(colors[cc].r, colors[cc].g, colors[cc].b)
        beginShape()
        for (var i in fig[f]) {
            vertex(fig[f][i].x, fig[f][i].y)
        }
        endShape()
    }

    // labels
    noStroke()
    let labels = {
        w: 70,
        h: 15 + fig.length * 15
    }
    fill(255)
    rect(cvs.w - labels.w, 0, cvs.w, labels.h)

    for(var f in fig) {
        let cc = f % colors.length
        fill(colors[cc].r, colors[cc].g, colors[cc].b)
        const left = cvs.w - labels.w
        rect(left + 5, 20 * f, 15, 15)
        fill(10)
        text(plot.functions[f].name, left + 30, 12 + 20 * f)
    }
}

let colors = [{
    r: 25, g: 25, b: 200
}, {
    r: 25, g: 200, b: 25
}, {
    r: 200, g: 25, b: 25
}, {
    r: 100, g: 125, b: 25
}, {
    r: 50, g: 75, b: 100
}, {
    r: 110, g: 12, b: 190
}, {
    r: 200, g: 110, b: 45
}]

let cvs = {
    h: plot.options.height,
    w: plot.options.width
}

let center = {
    x: cvs.w / 2,
    y: cvs.h / 2
}

let fig = []
let res = 1
let scale = {
    x: plot.options.scale,
    y: plot.options.scale
}

let one = {
    x: scale.x * cvs.w / 10,
    y: scale.y * cvs.w / 10
}

let yMax = {
    p: center.y / one.y + 10,
    n: -(cvs.h - center.y) / one.y - 10
}

let tics = {
    x: {
        p: Math.floor(center.x / one.x),
        n: Math.floor((center.x - cvs.w) / one.x)
    },
    y: {
        p: Math.floor(center.y / one.y),
        n: -Math.floor((cvs.h - center.y) / one.y)
    }
}

let functionArray = plot.functions

let counter = 0

functionArray.forEach(func => {
    fig.push([])
    for (var i = -center.x; i <= (cvs.w - center.x); i++) {
        if (i % res == 0) {
            let x = i / one.x
            let y = func(x)
            if (y > yMax.p) {
                y = yMax.p
            } else if (y < yMax.n) {
                y = yMax.n
            }
            let obj = {
                x: x * one.x + center.x,
                y: center.y - y * one.y
            }
            fig[counter].push(obj)
        }
    }
    counter++
})
