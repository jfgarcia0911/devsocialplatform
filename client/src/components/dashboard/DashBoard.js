import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAcccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";

const DashBoard = ({
	auth: { user },
	profile: { profile, loading },
	getCurrentProfile,
	deleteAcccount
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile == null ? (
		<Spinner />
	) : (
		<>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome {user && user.name}
			</p>
			{profile ? (
				<>
					<DashboardAction />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div class="my-2">
						<button class="btn btn-danger" onClick={()=> deleteAcccount()}>
							<i class="fas fa-user-minus"></i>
							Delete My Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>
						You have not yet setup a profile, please add some info
					</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</>
			)}
		</>
	);
};

DashBoard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAcccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAcccount })(DashBoard);