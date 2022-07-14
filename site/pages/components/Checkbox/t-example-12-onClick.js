/**
 * cn - 点击回调
 *    -- 点击选择框后的回调
 * en - OnClick
 *    -- Checkbox click callback
 */
import React, { Component } from 'react'
import { Checkbox } from 'shineout'

export default class extends Component {
    constructor() {
        super()
        this.state = {
            total: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    render() {
        return (
            <div>
                <Checkbox onClick={this.handleClick}>Click Me {this.state.total} Times !</Checkbox>
            </div>
        )
    }

    handleClick(e) {
        this.setState({
            total: this.state.total + 1
        })

    }
}
