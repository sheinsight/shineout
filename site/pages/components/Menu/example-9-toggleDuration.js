/**
 * cn - 菜单项状态改变后持续时间
 *    -- 当鼠标从菜单项中移开时，菜单项会在停留指定时间后消失
 * en - ToggleDuration
 *    -- When the mouse cursor is removed from  menuitem, the menuitem disappears for a specified period of time
 */
import React from 'react'
import { Menu, Button } from 'shineout'

const data = [
    {
        id: '1',
        title: 'Navigation One',
    },
    {
        id: '3',
        title: 'Navigation Two',
        children: [
            {
                id: '4',
                title: 'Option 1',
            },
            {
                id: '5',
                title: 'Option 2',
            },
        ],
    },
    {
        id: '6',
        title: 'Navigation Three',
        children: [
            {
                id: '7',
                title: 'Option 3',
            },
            {
                id: '8',
                title: 'Option 4',
                children: [
                    {
                        id: '9',
                        title: 'Optic 1',
                    },
                    {
                        id: '10',
                        title: 'Optic 2',
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Navigation Four',
    },
]

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: '1',
            toggleDuration: 500,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(d) {
        this.setState({
            active: d.id,
        })
    }

    checkActive = d => this.state.active === d.id

    render() {
        return (
          <div>
            <Button
              type={this.state.toggleDuration == 500 ? 'primary' : 'default'}
              onClick={() => this.setState({ toggleDuration: 500 })}
            >
              0.5s
            </Button>
            <Button
              type={this.state.toggleDuration == 2000 ? 'primary' : 'default'}
              onClick={() => this.setState({ toggleDuration: 2000 })}
            >
              2s
            </Button>
            <Menu
                keygen="id"
                data={data}
                mode="horizontal"
                renderItem={d => d.title}
                active={this.checkActive}
                inlineIndent={24}
                toggleDuration={this.state.toggleDuration}
                onClick={this.handleClick}
            />
          </div>
        )
    }
}
