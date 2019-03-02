class Plotteroni {
    constructor(options) {
        if(typeof options != 'object') {
            return console.error('invalid options')
        } else {
            for(var i in options) {
                let is = false
                for(var j in valOpts) {
                    if(valOpts[j].name == i) {
                        for(var m in valOpts[j].type) {
                            if(typeof options[i] == valOpts[j].type[m]) {
                                is = true
                            }
                        }
                    }
                }
                if(!is) return console.error('invalid options')
            }
        }

        function check(x) {
            return options.hasOwnProperty(x)
        }

        if(!check('scale')) options.scale = 1

        if(!check('height') || !check('width'))
            return console.error('invalid options')

        this.options = options
        this.functions = []
    }

    add(...funcs) {
        for(var i in funcs) {
            let func = funcs[i]
            if(typeof func != 'function') {
                return console.error('invalid function')
            }
            this.functions.push(func)
        }
    }

    draw() {
        this.load()
    }

    load() {
        var script1 = document.createElement("script")
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js'
        document.head.appendChild(script1)
        let script2 = document.createElement("script")
        script2.src = 'https://cdn.jsdelivr.net/gh/codingbobby/Plotteroni/p5instance.min.js'
        document.body.appendChild(script2)
    }
}

let valOpts = [{
    name: 'width',
    type: ['number']
}, {
    name: 'height',
    type: ['number']
}, {
    name: 'scale',
    type: ['number', 'object']
}]
