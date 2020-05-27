function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    for (const prop in element.computedStyle) {

        // let p=
        element.style[prop] = element.computedStyle[prop].value
        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }

    }
    console.log(element)
    return element.style
}
function layout(element) {
    if (!element.computedStyle) {
        return;
    }
    let elementStyle = getStyle(element)
    if (elementStyle.display !== 'flex') {
        return
    }
    let items = element.children.filter(e => e.type === 'element')
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    })
    let style = elementStyle;
    ['width','height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    //抽象一个坐标轴
    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom'
    }
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom'
    }
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'
    }
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'
    }
    if (style.flexWrap === 'wrap-reverse') {
        let tmp = crossStart
        crossStart = crossEnd;
        crossEnd = crossStart;
        crossSign = -1
    } else {
        crossSign = 1;
        crossBase = 0
    }


    let isAutoMainSize = false
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] += item[mainSize]
            }
        }
        isAutoMainSize = true
    }

    let flexLine = []
    let flexLines = [flexLine]
    let mainSpace = elementStyle[mainSize]
    let crossSpace = 0
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let itemStyle = getStyle(item)
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }
        if (itemStyle.flex) {
            flexLine.push(item)
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize]
            if (itemStyle.crossSize !== null && itemStyle.crossSize !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            flexLine.push(item)
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace
                flexLine.crossSpace = crossSpace
                flexLine = []
                flexLines.push(flexLine)
                flexLine.push(item)
                mainSpace = style[mainSpace]
                crossSpace = 0
            } else {
                flexLine.push(item)
            }

            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize]
        }



    }
    flexLine.mainSpace = mainSpace

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSpace] : crossSpace
    } else {
        flexLine.crossSpace = crossSpace
    }

    if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemStyle = getStyle(item)
            if (itemStyle.flex) {
                itemStyle[mainSize] = 0
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale
            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * scale
            currentMain = itemStyle[mainEnd]

        }
    } else {
        flexLines.forEach((items) => {
            let mainSpace = items.mainSpace
            let flexTotal = 0

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                let itemStyle = getStyle(item)
                if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex
                }
            }

            if (flexTotal > 0) {
                let currentMain = mainBase
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    let itemStyle = getStyle(item)
                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign
                    currentMain = itemStyle[mainEnd]
                }
            } else {
                let currentMain, step;
                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase;
                    step = 0
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainSpace * mainSign / 2 + mainBase;
                    step = 0
                }
                if (style.justifyContent === 'space-between') {
                    currentMain = mainSpace / (items.length - 1) * mainSign;
                    step = mainBase
                }
                if (style.justifyContent === 'space-around') {
                    currentMain = mainSpace / items.length * mainSign
                    step = step / 2 + mainBase
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i]
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step
                }
            }
        })
    }

    //cross axis sizes
    if(!style[crossSize]){
        crossSpace=0
        elementStyle[crossSize]=0
        flexLines.forEach(line=>{
            elementStyle[crossSize]=elementStyle[crossSize]+line.crossSpace
        })
    }else{
        crossSpace=style[crossSize]
        flexLines.forEach(line=>{
            crossSpace-=line.crossSpace
        })
    }
    if(style.flexWrap==='wrap-reverse'){
        crossBase=style[crossSize]
    }else{
        crossBase=0
    }
    let lineSize=style[crossSize]/flexLines.length
    let step
    if (style.alignContent === 'flex-start') {
       crossBase+=0
        step = 0
    }
    if (style.alignContent === 'flex-end') {
        crossBase += crossSpace * crossSign 
        step = 0
    }
    if (style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2 ;
        step = 0
    }
    if (style.alignContent === 'space-between') {
        crossBase+=0
        step = crossSpace/(flexLines.length-1)
    }
    if (style.alignContent === 'space-around') {
        
        step = crossSpace/(flexLines.length)
        crossBase += crossSign*step/2
    }
    if(style.alignContent==='stretch'){
        crossBase+=0
        step=0
    }
    flexLines.forEach(items=>{
        let lineCrossSize=style.alignContent==='stretch'?
            items.crossSpace+crossSpace/flexLines.length:
            items.crossSpace
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemStyle = getStyle(item)
            let align=itemStyle.alignSelf||itemStyle.alignItems
            console.log(a=itemStyle[crossSize])
            if(itemStyle[crossSize]===null||itemStyle[crossSize]===(void 0)){
                itemStyle[crossSize]=(align==='stretch')?lineCrossSize:0
            }
            if(align==='flex-start'){
                itemStyle[crossStart]=crossBase;
                itemStyle[crossEnd]=itemStyle[crossStart]+crossSign*itemStyle[crossSize]
            }
            if(align==='flex-end'){
                itemStyle[crossEnd]=crossBase+crossSign*lineCrossSize
                itemStyle[crossStart]=itemStyle[crossEnd]-crossSign*itemStyle[crossSize]
            }
            if(align==='center'){
                itemStyle[crossStart]=crossBase+crossSign*(lineCrossSize-itemStyle[crossSize])/2
                itemStyle[crossEnd]=itemStyle[crossStart]+crossSign*itemStyle[crossSize]
            }
            if(align==='stretch'){
                itemStyle[crossStart]=crossBase
                itemStyle[crossEnd]=crossBase+crossSign*((itemStyle[crossSize]!==null&&itemStyle[crossSize]!==(void 0))?
                itemStyle[crossSize]:lineCrossSize)
                itemStyle[crossSize]=crossSize*(itemStyle[crossEnd]-itemStyle[crossStart])
            }
            
        }
        crossBase+=crossSign*(lineCrossSize+step)
    })
    console.log(items,'items');
    
    
}

module.exports = layout;