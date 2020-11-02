/**
 * funkcija turi sukurti DOM elementa ir ji grazinti.
 * virtualNode viduje turi nodeName, attributes ir ...
 * virtualNode - object
 */
import h from "./hyperscript";


export function createNode({nodeNameOrComponent, attributes, children}) {
    if (typeof nodeNameOrComponent === 'function') {
        return renderComponent(nodeNameOrComponent, attributes);
    }

    const element = document.createElement(nodeNameOrComponent);
    for (const attributeName in attributes) {
        if (typeof attributes[attributeName] === "function") {
            element.addEventListener(attributeName, attributes[attributeName]);
        } else {
            element.setAttribute(attributeName, attributes[attributeName]);
        }
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            const textNode = document.createTextNode(child);
            element.append(textNode);
        } else {
            element.append(createNode(child));
        }
    });

    return element;
}

function renderComponent(classComponent, attributes) {
    const component = new classComponent(attributes);
    const virtualNode = component.render();
    component.element = createNode(virtualNode);
    return component.element;
}


