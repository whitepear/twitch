var React = require('react');

var MainContainer = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
});

module.exports = MainContainer;