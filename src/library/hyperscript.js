/**
 *
 * @param nodeName
 * @param attributes
 * @param children
 * @returns {{nodeName: *, children: *[], attributes: {}}}
 */

export default function h(nodeNameOrComponent, attributes = {}, ...children) {
    return {
        nodeNameOrComponent,
        attributes,
        children
    };
}