export class TimeLine {
    constructor() {
        this.animations = [];
        this.requestId = null;
        this.state = 'inited'
        this.tick = () => {
            let t = Date.now() - this.startTime;
            // console.log(t, 'aa');
            let animations = this.animations.filter(animation => !animation.finished)
            for (let animation of animations) {

                let { object, property, template, start, end, duration, timingFunction, delay, addTime } = animation;

                console.log(duration + delay, addTime, 'delay',animations.length);
                let progression = timingFunction((t - delay - addTime) / duration);
                if (t > (duration + delay + addTime)) {
                    // console.log('over');
                    progression = 1;
                    animation.finished = true
                }
                let value = animation.valueFromProgression(progression)
                object[property] = template(value)
                // console.log(1);

            }
            if (true||animations.length) {
                this.requestId = requestAnimationFrame(this.tick)
            }
        }
    }
    start() {
        if (this.state !== 'inited') {
            return;
        }
        this.startTime = Date.now()
        this.state = 'playing'
        this.tick()
    }
    add(animation, addTime) {
        this.animations.push(animation)
        animation.finished = false;
        if (this.state === 'playing') {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0
        }
    }
    pause() {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused'
        this.pauseTime = Date.now()
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId)
        }

    }
    resume() {
        if (this.state !== 'paused') {
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }
   
    restart() {
        if (this.state === 'playing') {
            this.pause()
        } else {
            this.animations = [];
            this.requestId = null;
            this.state = 'playing';
            this.startTime = Date.now();
            this.pauseTime = null;
            this.tick()
        }
    }

}
export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.property = property;
        this.template = template;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction

    }
    valueFromProgression(progression){
        return this.start + progression * (this.end - this.start)
    }
}
export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction,template) {
        this.object = object;
        this.property = property;
        this.template = template||((v)=>`rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction

    }
    valueFromProgression(progression){
        return {
            r:this.start.r + progression * (this.end.r - this.start.r),
            g:this.start.g + progression * (this.end.g - this.start.g),
            b:this.start.b + progression * (this.end.b - this.start.b),
            a:this.start.a + progression * (this.end.a - this.start.a)
        }
    }
}