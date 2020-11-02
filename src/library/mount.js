import {createNode} from "./createNode";

/**
 * virtualNode - object
 * parent - DOM element
 */
export function mount(virtualNode, parent) {
    const element = createNode(virtualNode);
    parent.append(element);
}

