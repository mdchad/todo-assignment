import React, {Component} from 'react';
import Item from '../item/item'
import './app.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import Target from '../target/target'
import Card from "../card/card"
const update = require('immutability-helper')

class App extends Component {
    state = {
        inputText: '',
        cardTitle: '',
        items: [
            { id: 1, name: 'item 1' },
            { id: 2, name: 'item 2' },
            { id: 3, name: 'item 3' },
            { id: 4, name: 'item 4' },
            { id: 5, name: 'item 5' }
        ],
        boardsCards: [
            { id: 1, title: 'hello world', items: [ {id: 1, text: 'heyyyaaa'} ] }
        ],
        cards: [
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text:
                    'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ]
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state
        const dragCard = cards[dragIndex]

        console.log(dragIndex, hoverIndex, dragCard)
        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    deleteItem = (id) => {
        this.setState(prevState => {
            return {
                items: prevState.items.filter(item => item.id !== id)
            }
        })
    }

    submit = (e, cardId) => {
        e.preventDefault();
        let inputField = this.state.inputText
        this.state.inputText = ''
        // let newCards = this.state.boardsCards.map((card, i) => {
        //     if (card.id === cardId) {
        //         return card
        //     }
        // })
        // console.log(newCards)
        this.setState(
            update(this.state, {
                boardsCards: [{
                    items: {
                        $push: [{
                            id: this.state.cards.length + 1,
                            text: inputField
                        }]
                    }
                }]
            })
        )
    }

    submitCard = (e) => {
        e.preventDefault();
        let inputField = this.state.cardTitle
        this.state.cardTitle = ''
        this.setState(
            update(this.state, {
                boardsCards: {
                    $push: [{
                        id: this.state.boardsCards.length + 1,
                        title: inputField,
                        items: []
                    }]
                }
            })
        )
        console.log(this.state)
    }

    inputChange = (e) => {
        this.setState({ inputText: e.target.value})
    }

    inputCardChange = (e) => {
        this.setState({cardTitle: e.target.value})
    }

    render() {
        const appContainer = { width: '20%', margin: '0 2em', display: 'inline-block' };
        return (
            <div style={{width: '100%'}}>
                {/*<form style={{margin: '1em 2em'}} onSubmit={(e) => this.submit(e)}>*/}
                    {/*<input value={this.state.inputText} onChange={(e) => this.inputChange(e)} /><button type='submit'>Submit</button>*/}
                {/*</form>*/}
                {/*<div style={appContainer}>{this.state.cards.map((card, i) => (*/}
                    {/*<Card key={card.id}*/}
                          {/*index={i}*/}
                          {/*id={card.id}*/}
                          {/*text={card.text}*/}
                          {/*moveCard={this.moveCard}/>*/}
                {/*))}*/}
                {/*</div>*/}
                {this.state.boardsCards.map((boardsCard, i) => (
                    <div style={appContainer} key={boardsCard.id}>
                        {boardsCard.title}
                        {boardsCard.items.map((item, i) => (
                            <Card key={item.id}
                                  index={i}
                                  id={item.id}
                                  text={item.text}
                                  moveCard={this.moveCard}/>

                        ))}
                        <form key={boardsCard.id} style={{margin: '1em 2em'}} onSubmit={(e) => this.submit(e, boardsCard.id)}>
                            <input onChange={(e) => this.inputChange(e)} /><button type='submit'>Submit</button>
                        </form>
                    </div>
                ))}
                <form style={{margin: '1em 2em'}} onSubmit={(e) => this.submitCard(e)}>
                    <label>New Card:</label>
                    <input value={this.state.cardTitle} onChange={(e) => this.inputCardChange(e)} /><button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App)
