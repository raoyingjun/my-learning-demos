

// 创建一个自定义元素 Card 卡片
class Card extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        console.log('组件被插入文档');

        const shadow = this.attachShadow({ mode: 'open' })

        // 克隆 template 模板的内容。template 可以重复利用，与自定义组件组合使用时非常方便
        shadow.appendChild(document.getElementById('card-template').content.cloneNode(true))

        const wrapper =shadow.getElementById('card-wrapper')
        const header = shadow.getElementById('card-header')
        const main = shadow.getElementById('card-main')

        const h1 = document.createElement('h1')

        const details = document.createElement('details')
        const summary = document.createElement('summary')
        const p = document.createElement('p')

        h1.textContent = this.getAttribute('title')

        summary.textContent = 'The details'
        p.textContent = this.getAttribute('content')
        
        const close = shadow.getElementById('card-close')
        close.addEventListener('click', ()=> {
            // 分发自定义事件。可以通过订阅该事件监听组件的状态变更
            this.dispatchEvent(new CustomEvent('oncardclose', {detail:{isClose: true}}))
        })

        header.prepend(h1)

        details.append(summary)
        details.append(p)
        main.append(details)

        // 如果存在 shadow 属性，则添加阴影
        if (this.hasAttribute('shadow')) {
            wrapper.style.boxShadow = '0 0 10px grey';
        }
    }
    disconnectedCallback() {
        console.log('组件从文档移除');
    }
    adoptedCallback() {
        console.log('组件被移动到新文档');
    }
    attributeChangedCallback(name, oVaule, nValue) {
        console.log(`属性变更：${name} : ${oVaule} -> ${nValue}`);
    }
    // 要监听的属性。当监听的属性变更时，会调用 attributeChangedCallback
    static observedAttributes = ['shadow', 'title', 'content']
}
// 注册该元素。推荐添加前缀和短横线分隔符，与原生元素区别
customElements.define('com-card', Card)