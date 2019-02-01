import React, { Component } from 'react';

export default class AnimatedNumbers extends Component {

  constructor(props) {
    super(props);

    this.state = {number: 9};

    this.NumColumn = this.NumColumn.bind(this);
  }
  
  render() {
    const { number } = this.props;
    const fontSize = this.props.fontSize || 24;
    const digits = number.toFixed(2).toString().replace('.', '').split('');
    const columns = digits.map(this.NumColumn);
    
    columns.splice(columns.length - 2, 0, <p key='decimal' style={{ fontSize }}>.</p>);
    
    return (
      <div className='rotating-numbers' style={{ height: fontSize - 2 }}>
        <p style={{ fontSize }}>$</p>
        {columns}
      </div>
    )
  }
  
  NumColumn(number, i) {
    const fontSize = this.props.fontSize || 24;
    const y = -(9 - number) * (fontSize-1);

    return (
      <div key={i} className='number-column' style={{height: fontSize-2}} onClick={() => this.setState({number: 0})}>
        <div 
          className="number-wrapper"
          style={{
            transform: `translateY(${y}px)`
          }}
        >
          <p style={{fontSize}}>9</p>
          <p style={{fontSize}}>8</p>
          <p style={{fontSize}}>7</p>
          <p style={{fontSize}}>6</p>
          <p style={{fontSize}}>5</p>
          <p style={{fontSize}}>4</p>
          <p style={{fontSize}}>3</p>
          <p style={{fontSize}}>2</p>
          <p style={{fontSize}}>1</p>
          <p style={{fontSize}}>0</p>
        </div>
      </div>
    )
  }
}