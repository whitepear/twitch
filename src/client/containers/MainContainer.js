var React = require('react');

var MainContainer = React.createClass({
	render: function() {
		return (
			<div className="container">
				{this.props.children}
			</div>
		)
	}
});

module.exports = MainContainer;