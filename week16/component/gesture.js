export function enableGesture(element) {
    let contexts = Object.create(null)
    let MOUSE_SYMBOL = Symbol('mouse')


    if (document.ontouchstart !== null) 
        element.addEventListener("mousedown", (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null)
            start(event, contexts[MOUSE_SYMBOL])
            let mousemove = (event) => {
                move(event, contexts[MOUSE_SYMBOL])
            }
            let mouseend = () => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
        })
    

    element.addEventListener('touchstart', event => {
        console.log('touchstart');
        for (const touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null)
            start(touch, contexts[touch.identifier])
        }
    })
    element.addEventListener('touchmove', event => {
        for (const touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    })
    element.addEventListener('touchend', event => {
        for (const touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })
    element.addEventListener('touchcancel', event => {
        for (const touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })


    //tap
    //pan panstart panmove panend
    //flick
    //press pressstart pressend

    let start = (point, context) => {
        console.log(point.clientX, point.clientY);

        let e = new CustomEvent('start')
        Object.assign(e, {
            startX:  point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY,
        })
        element.dispatchEvent(e)
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.moves = []
        context.timeoutHandler = setTimeout(() => {
            if (context.isPan) {
                return
            }
            context.isTap = false
            context.isPan = false
            context.isPress = true
            console.log('pressstart');
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500)
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                console.log('presscancel');
                element.dispatchEvent(new CustomEvent('presscancel', {}))
            }
            context.isTap = false
            context.isPan = true
            context.isPress = false
            console.log('panstart');
            let e = new CustomEvent('panstart')
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
            })
            element.dispatchEvent(e)

        }

        if (context.isPan) {
            context.moves.push({
                dx, dy,
                t: Date.now()

            })
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            console.log('pan', context);
            let e = new CustomEvent('pan')
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(e)
        }
    }
    let end = (point, context) => {
        if (context.isTap) {
            console.log('tap');
            element.dispatchEvent(new CustomEvent('tap', {}))
        }
        if (context.isPan) {
            let dx = point.clientX - context.startX;
            let dy = point.clientY - context.startY;
            console.log(dx,dy,'ddddd');
            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
            console.log(speed, 'speed');
            let isFlick = speed > 2
            if (isFlick) {
                console.log('flick');
                let e = new CustomEvent('flick')
                Object.assign(e, {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed
                })
                element.dispatchEvent(e)

            }

            let e = new CustomEvent('panend')
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed
            })
            element.dispatchEvent(e)
            console.log('panend');
        }
        if (context.isPress) {
            console.log('pressend');
            element.dispatchEvent(new CustomEvent('pressend', {}))
        }
        clearTimeout(context.timeoutHandler)
    }
    let cancel = (point, context) => {
        console.log('canceled');
        element.dispatchEvent(new CustomEvent('canceled', {}))
        clearTimeout(context.timeoutHandler)
    }
}