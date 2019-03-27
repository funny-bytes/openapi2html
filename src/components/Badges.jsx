const React = require('react');
const PropTypes = require('prop-types');
const ThemeContext = require('./ThemeContext');

const Badges = ({ tags = [], deprecated }) => {
  const classname = 'o2h-badges';
  const badges = deprecated ? [...tags, 'deprecated'] : tags;

  return (
    <ThemeContext.Consumer>
      { ({ tagColors }) => (
        <span className={classname}>
          { badges.map((tag, i) => (
            <span key={`tag-${i}`}>
              {' '}<span className={`badge badge-${tagColors[tag] || tagColors.fallback}`}>{tag}</span>
            </span>
          ))}
        </span>
      )}
    </ThemeContext.Consumer>
  );
};

Badges.contextTypes = {
  tagColors: PropTypes.object,
};

module.exports = Badges;
