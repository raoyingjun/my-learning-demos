export default {
    name: 'Royin',
    age: 21,
    introduce() {
        console.log(this.name, this.age)
    },
    insertInfoToHtml() {
        document.body.insertAdjacentHTML('beforeend', `<p>${this.name}, ${this.age}</p>`)
    }
}