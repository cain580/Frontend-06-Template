const css = require('css');

// 把CSS规则暂存到数组里
let rules = [];
function addCSSRules(text) {
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
    if (!selector || !element.attributes)
        return false;
    
        if (selector.charAt(0) === '#') {
            let attr = element.attributes.filter(attr => attr.name === 'id')[0];
            if (attr && attr.value === selector.replace('#', ''))
                return true;
        } else if (selector.charAt(0) === '.') {
            let attr = element.attributes.filter(attr => attr.name === 'class')[0];
            if (attr && attr.value === selector.replace('.', ''))
                return true;
        } else {
            if (element.tagName === selector) {
                return true;
            }
        }
        return false;
}

function computeCSS(element,stack) {
    // css选择器，匹配从内向外，类似事件冒泡
    let elements = stack.slice().reverse();

    if (!element.computedStyle)
        element.computedStyle = {};

    for(let rule of rules) {
        // rule.selector[0] -> "body div #myid"
        let selectorParts = rule.selectors[0].split(' ').reverse();

        if(!match(element, selectorParts[0]))
            continue;

        let matched = false;

        // 选择器位置
        let j = 1;
        for(let i = 0; i < elements.length; i++) {
            if(match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length)
            matched = true;

        if (matched) {
            // 匹配成功！
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for(let declaration of rule.declarations) {
                if(!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {};

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    console.log('computedStyle[declaration.property].value: ', computedStyle[declaration.property].value);
                    computedStyle[declaration.property].specificity = sp;
                    
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }

        }
    }
}

module.exports = {
    addCSSRules,
    computeCSS
}