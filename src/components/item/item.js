import React from "react"
import { DragSource } from "react-dnd"

const itemSource = {
    beginDrag(props) {
        console.log('dragging')
        return props.item
    },
    endDrag(props, monitor, component) {
        return props.handleDrop(props.item.id)
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class Item extends React.Component {
    render() {
        const { isDragging, connectDragSource, item } = this.props
        const opacity = isDragging ? 0 : 1;
        const appItem = { border: '1px dotted black', padding: '0.5em 1.2em', margin: '1em 0', opacity: opacity };
        return connectDragSource(
            <div style={appItem}>
                <span>{item.name}</span>
            </div>
        )
    }
}

export default DragSource('item', itemSource, collect)(Item);
