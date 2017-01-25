var React = require('react');

function NotFound(props) {	
	return (
		<div className="container">
			<div className="not-found-code">404</div>
			<div className="not-found-message">The resource you requested could not be found.</div>
		</div>
	);	
}

module.exports = NotFound;