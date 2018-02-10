const React = require('react');
const PropTypes = require('prop-types');

class ThemeProvider extends React.Component {
  getChildContext() {
    return {
      tagColors: this.props.tagColors,
    };
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

ThemeProvider.childContextTypes = {
  tagColors: PropTypes.object,
};

module.exports = ThemeProvider;
