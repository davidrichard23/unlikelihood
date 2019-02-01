import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchAssets } from '../../actions/search_actions';
import { highlightMatch } from '../../util/text_util';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      showDropdown: false,
      isFocused: false,
    };

    this.Asset = this.Asset.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  
  render() {
    const { searchText, showDropdown, isFocused } = this.state;
    let wrapperClass = 'search-wrapper';
    if (isFocused) wrapperClass += ' focused';
    
    return (
      <div className='search'>
        <div className={wrapperClass}>
          <input 
            type="text" 
            placeholder='Search' 
            value={searchText} 
            onChange={this.handleInput} 
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {isFocused && showDropdown && this.Dropdown()}
        </div>
      </div>
    );
  }

  Dropdown() {
    const { assets } = this.props

    return (
      <div className="search-dropdown">
        {assets.length > 0 && 
          <p className='search-list-header'>
            Stocks
          </p>
        }
        {assets.length === 0 &&
          <p style={{color: 'rgb(180,180,180)'}}>
          We are unable to find any results for your search
          </p>
        }

        {assets.map(this.Asset)}
      </div>
    );
  }

  Asset(asset) {
    const symbol = asset.symbol;
    const highlightedSymbol = highlightMatch(symbol.toUpperCase(), this.state.searchText.toUpperCase());
    const highlightedName = highlightMatch(asset.name, this.state.searchText);

    return (
      <Link key={symbol} to={`/assets/${symbol}`} className='search-list-item'>
        {highlightedSymbol}
        {highlightedName}
      </Link>
    );
  } 

  handleInput(e) {
    const val = e.target.value
    this.setState({
      searchText: val,
      showDropdown: val.length > 0,
    }, () => {
      this.props.searchAssets(this.state.searchText);
    });
  }

  handleFocus() {
    this.setState({isFocused: true});
  }
  handleBlur(e) {
    let timer = 0
    if (e.relatedTarget && e.relatedTarget.className === 'search-list-item') timer = 300;
    setTimeout(() => this.setState({isFocused: false, searchText: ''}), timer);
  }
}





const msp = state => {
  const assets = state.searchIds.map(id => state.entities.assets[id])

  return {
    assets
  }
};

const mdp = dispatch => ({
  searchAssets: searchText => dispatch(searchAssets(searchText)),
});

export default connect(msp, mdp)(Search);