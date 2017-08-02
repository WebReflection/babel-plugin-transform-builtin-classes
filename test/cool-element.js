class CoolElement extends HTMLElement {
  connectedCallback () {
    this.innerText = 'Hello World';
  }
}

customElements.define('cool-element', CoolElement);