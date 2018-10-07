import React from 'react';

export default class OrganizationSearch extends React.Component {
  state = { text: this.props.name };

  handleSearch = e => {
    e.preventDefault();
    this.props.onSearch(this.state.text);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          onChange={e => this.setState({ text: e.target.value })}
          onSubmit={this.handleSearch}
          value={this.state.text}
        />
        <button type="submit" onClick={this.handleSearch}>
          Search
        </button>
      </form>
    );
  }
}
