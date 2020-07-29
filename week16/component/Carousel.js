import { create, Text, Wraper } from './create.js'
import { TimeLine, Animation } from './animation.js'
import { ease, linear } from './cubicBezier'
import { enableGesture } from './gesture'
export class Carousel {
    constructor(config) {
        this.children = [];
    }
    set id(v) {//property
        console.log(v, 'parent::id');

    };
    render() {
        let timeline = new TimeLine();
        timeline.start()
        let position = 0;
        let nextPicStopHandler = null;
        let offset = 0;


        let children = this.data.map((url, currentPosition) => {
            let onstart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler)
                let currentElement = children[currentPosition];
                console.log(currentElement.style.transform, currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/));
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }

            let onPan = () => {
                let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
                let nextPosition = (currentPosition + 1) % this.data.length;
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = -500 * currentPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            }
            let onPanend = event => {
                console.log('onPanEnd',222);
                let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
                let nextPosition = (currentPosition + 1) % this.data.length;
                let direction = 0;
                let dx = event.clientX - event.startX;
                if (dx + offset > 250) {
                    direction = 1;
                } else if (dx + offset < -250) {
                    direction = -1;
                }

                timeline.restart();
                timeline.start();

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', v => `translateX(${v}px)`, -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, ease);
                let currentAnimation = new Animation(currentElement.style, 'transform', v => `translateX(${v}px)`, - 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease);
                let nextAnimation = new Animation(nextElement.style, 'transform', v => `translateX(${v}px)`, 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                console.log(timeline,'line');

                position = (position - direction + this.data.length) % this.data.length;
               
                nextPicStopHandler = setTimeout(nextPic, 3000);
            }


            let element = <img
                src={url}
                onStart={onstart}
                onPan={onPan}
                onPanend={onPanend}
                enableGesture={true}
                alt="" />
            element.addEventListener('dragstart', event => { event.preventDefault() });
            return element;
        })
        let root = <div class='carousel'>
            {
                children
            }
        </div>




        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', v => `translateX(${5 * v}px)`,
                -100 * position, -100 - 100 * position, 500, 0, ease)
            let nextAnimation = new Animation(next.style, 'transform', v => `translateX(${5 * v}px)`,
                100 - 100 * nextPosition, -100 * nextPosition, 500, 0, ease)
            position = nextPosition;
            timeline.add(currentAnimation)
            timeline.add(nextAnimation)
            nextPicStopHandler = setTimeout(nextPic, 3000);
        }
        nextPicStopHandler = setTimeout(nextPic, 3000);
        return root;
    }
    appendChild(child) {
        // this.root.appendChild(child)
        // child.mountTo(this.root)
        this.children.push(child)
    }
    setAttribute(name, value) {//attr
        console.log(name, value);
        // this.root.setAttribute(name, value)
        this[name] = value

    };

    mountTo(parent) {
        this.render().mountTo(parent)
        // for (const child of this.children) {
        //     this.slot.appendChild(child)
        // }
    }

};
