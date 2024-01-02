import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Post</Link>
			</li>
			<li>
				<Link  to="/dashboard">
					<i className="fas fa-user"> </i>
					<span className="hide-sm"> DashBoard</span>
				</Link>
			</li>
			<li>
				<Link onClick={logout} to="/">
					<i className="fas fa-sign-out-alt"> </i>
					<span className="hide-sm"> Logout</span>
				</Link>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevPlatform
				</Link>
			</h1>
			{isAuthenticated ? authLinks : guestLinks}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateProps, { logout })(Navbar);
