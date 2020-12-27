
const {addCSSRules, computeCSS} = require('./css');

let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children: []}];
let currentTextNode = null;

function emit(token) {
    // 当前栈顶，未遇关闭标签元素
    let top = stack[stack.length - 1];

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: [],
        };

        element.tagName = token.tagName;

        for (let p in token) {
            if (p !== 'type' && p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p],
                });
            }

        }

        // 入栈时，计算 CSS 样式
        computeCSS(element);

        // 添加至栈顶
        top.children.push(element,stack);

        // 自封闭标签不入栈，默认内部无元素;
        if(!token.isSelfClosing)
            stack.push(element);
        
        currentTextNode = null;  
        
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end dosen't match");
        } else {
            // 遇到style标签时，执行添加CSS规则的操作
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content);
            }

            // 遇到结束标签时出栈;
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: '',
            };
            // 添加给栈顶
            top.children.push(currentTextNode);
        }
        // 拼接文本节点
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol("EOF");

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if ( c === EOF ) {
        emit({
            type: 'EOF',
        });
        return ;
    } else {
        emit({
            type: 'text',
            content: c,
        });
        return data;
    }
}

// 遇到 < 开始标签时进入此状态机
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: '',
        };
        return tagName(c);
    } else {
        return ;
    }
}
// 遇到 / 自封闭标签 或者 >结束标签时进入此状态机
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: '',
        };
        return tagName(c);
    } else if (c === '>') {
        // throw error
    } else if (c === EOF) {
        // throw error
    } else {

    }
}

function tagName(c) {
    // \t ->tab符  \n -> 换行符 \f-> 禁止符  " "-> 空格   4种空白符 表示属性
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {   //  自封闭标签
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
        // 开始解析下一个标签
        return data;
    } else {
        return tagName;
    }
}

//  标签中遇到空白符时启用此状态机
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: "",
            value: "",
        };
        return attributeName(c);
    }
}

//  属性名 状态机
function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === "'" || c === '<') {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

// 属性名结束 状态机
function afterAttributeName(c) {
    if (c.match(/^\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    }  else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: '',
        };
        return attributeName(c);
    }
} 

// 属性内容状态机
function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeName;
    } else if (c === '\"') {
        return doubleQuotedAttributeValue;
    } else if (c === "\'") {
        return singleQuotedAttributeValue;
    } else if (c === '>') {
        // return data;
    } else {
        return UnquotedAttributeValue(c);
    }
}

// " 双引号 状态机
function doubleQuotedAttributeValue(c) {
    if (c === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

// ' 单引号 状态机
function singleQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

// 无引号
function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data; 
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === "'" || c === '<' || c === '=' || c === '`') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}


// 自封闭 标签 状态机
function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        //emit(currentToken);
        return data;
    } else if (c === 'EOF') {

    } else {

    }
}


module.exports.parseHTML = function parseHTML(HTML){
    let state = data;
    for(let c of HTML){
        state = state(c);
    }
    state = state(EOF);
    return stack;
}