import React, { Component } from "react"
import {DropTarget} from "react-dnd"

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}

class Target extends Component {
    render() {
        const { connectDropTarget, hovered, item } = this.props
        const targetContainer = {
            border: '1px solid black',
            padding: '5em 2em 0 2em',
            backgroundColor: hovered ? 'lightgreen' : 'white'
        }
        return connectDropTarget(
            <div style={targetContainer}>
                Target
            </div>
        )
    }
}

export default DropTarget('item', {}, collect)(Target)