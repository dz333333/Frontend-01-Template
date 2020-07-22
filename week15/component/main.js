import { create, Text, Wraper } from './create.js'
import { Carousel } from './carousel.view'
// class Carousel {
//     constructor(config) {
//         this.children = [];
//     }
//     set id(v) {//property
//         console.log(v, 'parent::id');

//     };
//     render() {
//         let chidren = this.data.map(url => {
//             let element = <img src={url} alt="" />
//             element.addEventListener('dragstart', event => { event.preventDefault() });
//             return element;
//         })
//         let root = <div class='carousel'>
//             {
//                 chidren
//             }
//         </div>


//         let position = 0;
//         let nexPic = () => {
//             let nextPosition = (position + 1) % this.data.length;
//             let current = chidren[position];
//             let next = chidren[nextPosition];

//             current.style.transition = "ease 0s";
//             next.style.transition = "ease 0s";
//             //图片更换位置的开始状态
//             current.style.transform = `translateX(${- 100 * position}%)`;
//             next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
//             //一帧大概16S
//             setTimeout(() => {
//                 current.style.transition = "ease 0.5s";
//                 next.style.transition = "ease 0.5s";
//                 //图片更换位置的结束状态
//                 current.style.transform = `translateX(${-100 - 100 * position}%)`;
//                 next.style.transform = `translateX(${-100 * nextPosition}%)`;
//                 position = nextPosition;
//             }, 16);


//             setTimeout(nexPic, 3000);
//         }
//         setTimeout(nexPic, 3000);



//         root.addEventListener('mousedown', event => {
//             let startX = event.clientX, startY = event.clientY;

//             let nextPosition = (position + 1) % this.data.length;
//             let lastPosition = (position + this.data.length - 1) % this.data.length;

//             let current = chidren[position];
//             let last = chidren[lastPosition];
//             let next = chidren[nextPosition];

//             current.style.transition = 'ease 0s';
//             last.style.transition = 'ease 0s';
//             next.style.transition = 'ease 0s';

//             current.style.transform = `translateX(${- 500 * position}px)`;
//             last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
//             next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

//             let move = event => {
//                 current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
//                 last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
//                 next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;

//             };
//             let up = event => {
//                 let offset = 0;
//                 if (event.clientX - startX > 250) {
//                     offset = 1
//                 } else if (event.clientX - startX < -250) {
//                     offset = -1
//                 }

//                 //打开transition
//                 current.style.transition = "ease 0.5s";
//                 last.style.transition = "ease 0.5s";
//                 next.style.transition = "ease 0.5s";

//                 current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
//                 last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
//                 next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

//                 position = (position + this.data.length - offset) % this.data.length;
//                 document.removeEventListener('mousemove', move);
//                 document.removeEventListener('mouseup', up);
//             }
//             document.addEventListener('mousemove', move);
//             document.addEventListener('mouseup', up);
//         });

//         return root;
//     }
//     appendChild(child) {
//         // this.root.appendChild(child)
//         // child.mountTo(this.root)
//         this.children.push(child)
//     }
//     setAttribute(name, value) {//attr
//         console.log(name, value);
//         // this.root.setAttribute(name, value)
//         this[name] = value

//     };

//     mountTo(parent) {
//         this.render().mountTo(parent)
//         // for (const child of this.children) {
//         //     this.slot.appendChild(child)
//         // }
//     }

// };


// // let component = <div id='a' style="width:100px;height:100px;background-color:pink">
// //     <div>text</div>
// //     <p />
// //     <div></div>
// //     <div></div>
// // </div>;
let component = new Carousel()

component.mountTo(document.body)
console.log(component, 'cc');

// component.setAttribute('id', 'a')