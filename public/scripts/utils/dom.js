/**
 * @typedef {Array<HTMLElement | string>} Children
 */

/**
 * @param {Children?} children
 * @param {Array<string>? } classes
 * @param {function(MouseEvent): void? } onClick
 * @return {HTMLButtonElement}
 */
export function createButton({ children, classes, onClick }) {
  const button = document.createElement("button")
  addChildren(button, children)
  addClasses(button, classes)
  if (onClick) {
    button.addEventListener("click", onClick)
  }
  return button
}

/**
 * @param {Children?} children
 * @param {Array<string>?} classes
 * @return {HTMLSpanElement}
 */
export function createSpan({ children, classes }) {
  const span = document.createElement("span")
  addClasses(span, classes)
  addChildren(span, children)
  return span
}

/**
 * @param {Children?} children
 * @param {Array<string>?} classes
 * @return {HTMLElement}
 */
export function createStrong({ children, classes }) {
  const strong = document.createElement("strong")
  addClasses(strong, classes)
  addChildren(strong, children)
  return strong
}

/**
 * @param {Children?} children
 * @param {Array<string>?} classes
 * @param {string?} id
 * @return {HTMLLIElement}
 */
export function createLi({ children, classes, id }) {
  const li = document.createElement("li")
  addClasses(li, classes)
  addChildren(li, children)
  addAttribute(li, "id", id)
  return li
}

/**
 * @param {HTMLElement} element
 * @param {Array<string>?} classes
 */
function addClasses(element, classes) {
  if (classes) {
    classes.forEach(className => element.classList.add(className))
  }
}

/**
 * @param {HTMLElement} element
 * @param {Children?} children
 */
function addChildren(element, children) {
  if (children) {
    children.forEach(child => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    })
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {string?} value
 */
function addAttribute(element, name, value) {
  if (value) {
    element.setAttribute(name, value)
  }
}

/**
 * @param {HTMLElement?} node
 */
export function removeNode(node) {
  if (node !== undefined && node !== null) {
    const parent = node.parentNode
    if (parent !== undefined && node !== null) {
      parent.removeChild(node)
    }
  }
}