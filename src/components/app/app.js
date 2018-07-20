import React, {Component} from 'react';
import './app.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import Card from "../card/card"
const update = require('immutability-helper')
const uuid = require('uuid/v1');

class App extends Component {
    state = {
        inputText: [''],
        cardTitle: '',
        cards: [
            { id: uuid(), title: 'hello world', items: [ {id: 1, text: 'heyyyaaa'} ] }
        ]
    }

    moveCard = (dragIndex, hoverIndex, index, cardIndex) => {
        const { cards } = this.state
        const dragCard = cards[cardIndex].items[dragIndex]
        console.log(`dragIndex: ${dragIndex} hoverIndex: ${hoverIndex} index: ${index}` )
        console.log(cardIndex)

        if (index === cardIndex) {
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

        if (index !== cardIndex) {
            this.setState(
                update(this.state, {
                    cards: {
                        [index]: {
                            items: {
                                $splice: [[hoverIndex, 0, dragCard]],
                            }
                        },
                        [cardIndex]: {
                            items: {
                                $splice: [[dragIndex, 1]]
                            }
                        }
                    },
                }),
            )
        }

        console.log(this.state.cards)
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
                                id: uuid(),
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

    handleDrop = (id) => {
        console.log('hover' + id)
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                {this.state.cards.map((card, cardIndex) => (
                    <Card card={card}
                          cardIndex={cardIndex}
                          key={card.id}
                          inputText={this.state.inputText[cardIndex]}
                          inputChange={this.inputChange}
                          submit={this.submit}
                          handleDrop={this.handleDrop}
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
