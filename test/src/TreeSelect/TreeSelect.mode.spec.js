import { mount } from 'enzyme/build'
import { TreeSelect } from 'shineout'
import React from 'react'
import { appendToDOM } from '../../utils'

function ClickLabel(node, wrapper) {
    node.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
        target: {
            checked: true,
        },
    })
    wrapper.update()
}

/* global SO_PREFIX */
describe('Select[Mode]', () => {
    const dataHasStringKey = [
        { id: '0', title: '0', children: [{ id: '0-1', title: '0-1' }] },
        {
            id: '1',
            title: '1',
            children: [
                { id: '1-1', title: '1-1', children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
                { id: '1-2', title: '1-2' },
            ],
        },
        { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
        { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
    ]
    const dataHasNumberKey = [
        { id: 0, title: '0', children: [{ id: 0.1, title: '0-1' }] },
        {
            id: 1,
            title: '1',
            children: [
                { id: 11, title: '1-1', children: [{ id: 111, title: '1-1-1' }, { id: 112, title: '1-1-2' }] },
                { id: 12, title: '1-2' },
            ],
        },
        { id: 2, title: '2', children: [{ id: 21, title: '2-1' }, { id: 22, title: '2-2' }] },
        { id: 3, title: '3', children: [{ id: 31, title: 32 }] },
    ]

    test('should set mode 0 by string key', () => {
        const wrapper = mount(<TreeSelect multiple mode={0} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(4)
        options.forEach((node) => {
            // click label
            ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(12)
    })
    test('should set mode 0 by number key', () => {
        const wrapper = mount(<TreeSelect multiple mode={0} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(4)
        options.forEach((node) => {
            // click label
            ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(12)
    })

    test('should set mode 1 by string key', () => {
        const wrapper = mount(<TreeSelect multiple mode={1} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} defaultExpanded={['1']} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(6)
        options.forEach((node, index) => {
            index === 3 && ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(2)
    })
    test('should set mode 1 by number key', () => {
        const wrapper = mount(<TreeSelect multiple mode={1} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} defaultExpanded={[1]} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(6)
        options.forEach((node, index) => {
            index === 3 && ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(2)
    })

    test('should set mode 2 by string key', () => {
        const wrapper = mount(<TreeSelect multiple mode={2} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(4)
        options.forEach(node => {
            ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(7)
    })
    test('should set mode 2 by number key', () => {
        const wrapper = mount(<TreeSelect multiple mode={2} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(4)
        options.forEach(node => {
            ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(7)
    })

    test('should set mode 3 by string key', () => {
        const wrapper = mount(<TreeSelect multiple mode={3} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} defaultExpanded={['0', '1', '2', '3']} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(10)
        options.forEach((node, index) => {
            index === 1 && ClickLabel(node, wrapper)
            index === 3 && ClickLabel(node, wrapper)
            index === 4 && ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(2)
    })
    test('should set mode 3 by number key', () => {
        const wrapper = mount(<TreeSelect multiple mode={3} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} defaultExpanded={[0, 1, 2, 3]} />)
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
        const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
        expect(options.length).toBe(10)
        options.forEach((node, index) => {
            index === 1 && ClickLabel(node, wrapper)
            index === 3 && ClickLabel(node, wrapper)
            index === 4 && ClickLabel(node, wrapper)
        })
        const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
        expect(tags.length).toBe(2)
    })
})
