import React, {Component} from 'react';
import './app.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import Card from "../card/card"
import Item from '../item/item'
const update = require('immutability-helper')

class App extends Component {
    state = {
        inputText: [''],
        cardTitle: '',
        cards: [
            { id: 1, title: 'hello world', items: [ {id: 1, text: 'heyyyaaa'} ] }
        ]
    }

    moveCard = (dragIndex, hoverIndex, index) => {
        const { cards } = this.state
        const dragCard = cards[index].items[dragIndex]

        this.setState(
            update(this.state, {
                cards: {
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
                cards: {
                    [index]: {
                        items: {
                            $push: [{
                                id: this.state.cards[index].items.length + 1,
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
                    [this.state.cards.length]: {
                        $set: ''
                    }
                },
                cardTitle: {
                    $set: ''
                },
                cards: {
                    $push: [{
                        id: this.state.cards.length + 1,
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
                {this.state.cards.map((card, cardIndex) => (
                    <Card card={card}
                          cardIndex={cardIndex}
                          key={card.id}
                          inputText={this.state.inputText[cardIndex]}
                          inputChange={this.inputChange}
                          submit={this.submit}
                          moveCard={this.moveCard}/>
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
