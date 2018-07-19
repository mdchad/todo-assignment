import React, {Component} from 'react';
import './app.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import Card from "../card/card"
const update = require('immutability-helper')

class App extends Component {
    state = {
        inputText: [''],
        cardTitle: '',
        boardsCards: [
            { id: 1, title: 'hello world', items: [ {id: 1, text: 'heyyyaaa'} ] }
        ]
    }

    moveCard = (dragIndex, hoverIndex, index) => {
        const { boardsCards } = this.state
        const dragCard = boardsCards[index].items[dragIndex]

        this.setState(
            update(this.state, {
                boardsCards: {
                    [index]: {
                        items: {
                            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                        }
                    }
                },
            }),
        )
    }

    submit = (e, cardId, index) => {
        e.preventDefault();
        let inputField = this.state.inputText[index]
        this.setState(
            update(this.state, {
                inputText: {
                    [index]: {
                        $set: ''
                    }

                },
                boardsCards: {
                    [index]: {
                        items: {
                            $push: [{
                                id: this.state.boardsCards[index].items.length + 1,
                                text: inputField
                            }]
                        }
                    }
                }
            })
        )
    }

    submitCard = (e) => {
        e.preventDefault();
        this.setState(
            update(this.state, {
                inputText: {
                    [this.state.boardsCards.length]: {
                        $set: ''
                    }
                },
                cardTitle: {
                    $set: ''
                },
                boardsCards: {
                    $push: [{
                        id: this.state.boardsCards.length + 1,
                        title: this.state.cardTitle,
                        items: []
                    }]
                }
            })
        )
    }

    inputChange = (e, i) => {
        let inputText = [...this.state.inputText];
        inputText[i] = e.target.value;
        this.setState({ inputText })
    }

    inputCardChange = (e) => {
        this.setState({ cardTitle: e.target.value })
    }

    render() {
        const appContainer = { width: '20%', margin: '0.8em 2em', display: 'inline-block', border: '1px solid black', padding: '2em' };
        return (
            <div style={{width: '100%'}}>
                {this.state.boardsCards.map((boardsCard, boardIndex) => (
                    <div style={appContainer} key={boardsCard.id}>
                        <p> {boardsCard.title}</p>
                        {boardsCard.items.map((item, i) => (
                            <Card key={item.id}
                                  boardIndex={boardIndex}
                                  index={i}
                                  id={item.id}
                                  text={item.text}
                                  moveCard={this.moveCard}/>

                        ))}
                        <form key={boardsCard.id}
                              style={{margin: '1em 1em 0 1em'}}
                              onSubmit={(e) => this.submit(e, boardsCard.id, boardIndex)}>
                            <input onChange={(e) => this.inputChange(e, boardIndex)}
                                   value={this.state.inputText[boardIndex]}/>
                            <button type='submit'>Add Item</button>
                        </form>
                    </div>
                ))}
                <hr/>
                <form style={{margin: '1em 2em'}} onSubmit={(e) => this.submitCard(e)}>
                    <label>New Card:</label>
                    <input value={this.state.cardTitle}
                           onChange={(e) => this.inputCardChange(e)}
                           required/>
                    <button type='submit'>Add Card</button>
                </form>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App)
