import React from 'react'
import Item from '../item/item'


class Card extends React.Component {
    render() {
        const { card, cardIndex, moveCard, inputChange, submit, inputText } = this.props
        const appContainer = { width: '20%', margin: '0.8em 1em 0.8em 1em', display: 'inline-block', border: '1px solid black', padding: '2em' };
        return (
            <div style={appContainer} key={card.id}>
                <p> {card.title}</p>
                {card.items.map((item, i) => (
                    <Item key={item.id}
                          cardIndex={cardIndex}
                          index={i}
                          id={item.id}
                          text={item.text}
                          moveCard={moveCard}/>

                ))}
                <form key={card.id}
                      style={{margin: '1em 1em 0 1em'}}
                      onSubmit={(e) => submit(e, card.id, cardIndex)}>
                    <input onChange={(e) => inputChange(e, cardIndex)}
                           value={inputText}/>
                    <button type='submit'>Add Item</button>
                </form>
            </div>
        )
    }
}

export default Card