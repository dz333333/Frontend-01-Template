const css = require('css')

let rules = []
function addCSSRules(text) {
    let ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}
function match(element, selector) {
    if (!selector || !element.attributes) {
        return false
    }
    if (selector.charAt(0) === "#") {
        let attr = element.attributes.filter((attr) => attr.name === "id")[0]
        if (attr && attr.value === selector.replace("#", "")) {
            return true
        }
    } else if (selector.charAt(0) === ".") {
        let attr = element.attributes.filter((attr) => attr.name === "class")[0]
        if (attr && attr.value === selector.replace(".", "")) {
            return true
        }
    } else {
        if (element.tagName === selector) {
            return true
        }
    }
}

function specificity(selector) {
    let p = [0, 0, 0, 0]
    let selectorParts = selector.split(' ')
    for (const part of selectorParts) {
        if (part.charAt(0) === "#") {
            p[1] += 1
        } else if (part.charAt(0) === ".") {
            p[2] += 1
        } else {
            p[3] += 1
        }
    }
    return p
}


function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return sp1[3] - sp2[3]

}

function computeCSS(element, stack) {
    //reverse是为了从子元素往父元素计算
    let elements = stack.slice().reverse()
    if (!element.computedStyle) {
        element.computedStyle = {}
    }
    for (const rule of rules) {
        //selectParts=["#myid","div","body"]
        let matched = false
        let selectParts = rule.selectors[0].split(' ').reverse()
        //selectParts[0]就是匹配规则的最后一项
        if (!match(element, selectParts[0])) {
            continue;
        }
        let j = 1
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectParts[j])) {
                j++
            }

        }
        //匹配规则完成  例如遍历完div span img{}
        if (j >= selectParts.length) {
            matched = true
        }
        if (matched) {
            let computedStyle = element.computedStyle
            let sp = specificity(rule.selectors[0])
            for (const declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }
                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp

                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }

            }
            console.log(element.computedStyle)

        }
    }


}
module.exports = {
    addCSSRules,
    computeCSS
}