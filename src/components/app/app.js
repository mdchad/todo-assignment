import React, {Component} from 'react';
import Item from '../item/item'
import './app.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'

class App extends Component {
    state = {
        items: [
            {id: 1, name: 'item 1'},
            {id: 2, name: 'item 2'},
            {id: 3, name: 'item 3'},
            {id: 4, name: 'item 4'},
            {id: 5, name: 'item 5'}
        ]
    }

    deleteItem = (id) => {
        console.log('deleting id:' + id)
    }

    render() {
        const appContainer = { width: '50%', margin: '0 20em' };
        return (
            <div style={appContainer}>{this.state.items.map((item, index) => (
                <Item key={item.id} item={item} handleDrop={(id) => this.deleteItem(id)}/>
            ))}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App)
