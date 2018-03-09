const React = require('react');
const PropTypes = require('prop-types');

const Badges = ({ tags = [], deprecated }, context) => {
  const classname = 'o2h-badges';
  const { tagColors = {} } = context;
  if (!tagColors.deprecated) {
    tagColors.deprecated = 'danger';
  }
  const badges = deprecated ? [...tags, 'deprecated'] : tags;
  return (
    <span className={classname}>
      { badges.map((tag, i) => (
        <span key={`tag-${i}`}>
          {' '}<span className={`badge badge-${tagColors[tag] || 'secondary'}`}>{tag}</span>
        </span>))
      }
    </span>
  );
};

Badges.contextTypes = {
  tagColors: PropTypes.object,
};

module.exports = Badges;
