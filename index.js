const options = {
    height: 500,
    width: 500,
    scale: 0.8
}

const plot = new Plotteroni(options)

let sin = function(x) {
    return Math.sin(5*x) + 4
}

let cool = function(x) {
    return Math.log(x + 4) * Math.sin(x)
}

let cooler = function(x) {
    return Math.asin(Math.sin(x - 1.75) - Math.cos(x)) - 3.7
}

plot.add(sin, cool, cooler)

plot.draw()
