import {enableGesture} from './gesture'
export function create(Cls, attributes, ...children) {
    console.log(children, 'args');
    let o;
    if (typeof Cls === 'string') {
        o = new Wraper(Cls)
    } else {
        o = new Cls({
            timer: {}
        })
    }
    // o = new Cls();
    for (const name in attributes) {
        o.setAttribute(name, attributes[name])
    }
    let visit = (children) => {
        for (const child of children) {
            if (typeof child === 'object' && child instanceof Array) {
                visit(child);
                continue;
            }
            if (typeof child === 'string') {
                child = new Text(child)
            }
            o.appendChild(child)
        }
    }

    visit(children)


    return o
}
export class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
        // for (const child of this.children) {
        //     child.mountTo(this.root)
        // }
    }
}  
export class Wraper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type)
    }
    // set id(v) {//property
    //     console.log(v, 'parent::id');

    // };
    setAttribute(name, value) {//attr
        console.log(name, value);
        this.root.setAttribute(name, value)
        if(name.match(/^on([\s\S]+)$/)){
            let eventname=RegExp.$1.replace(/^[\s\S]/,c=>c.toLowerCase())
            this.addEventListener(eventname,value)
            console.log(eventname,'name');
        }
        if(name==='enableGesture'){
            enableGesture(this.root)
        }
    };
    addEventListener() {
        this.root.addEventListener(...arguments)
    }

    get style() {
        return this.root.style
    }
    mountTo(parent) {
        parent.appendChild(this.root)
        for (const child of this.children) {
            child.mountTo(this.root)
        }
    }
    appendChild(child) {
        // this.root.appendChild(child)
        // child.mountTo(this.root)
        this.children.push(child)
    }
};