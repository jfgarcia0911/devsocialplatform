import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = (
	{ getProfileById, profile: { profile, loading }, auth },
	props
) => {
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		getProfileById(params.id);
	}, [getProfileById, params]);

	const handleClick = () => {
		navigate(-1);
	};
	console.log(location.state?.from);

	return (
		<section className="container">
			{profile === null ? (
				<Spinner />
			) : (
				<>
					<Link onClick={handleClick} className="btn btn-light">
						Go Back
					</Link>
					{auth.isAuthenticated && params.id === auth.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}

					<div className="profile-grid my-1">
						{/* <!-- Top --> */}
						<ProfileTop profile={profile} />

						{/* <!-- About --> */}
						<ProfileAbout profile={profile} />

						{/* <!-- Experience --> */}
						<div className="profile-exp bg-white p-2">
							<h2 class="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<>
									{profile.experience.map((exp) => {
										return (
											<ProfileExperience
												key={exp._id}
												exp={exp}
											/>
										);
									})}
								</>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>

						{/* <!-- Education --> */}
						<div className="profile-edu bg-white p-2">
							<h2 class="text-primary">Education</h2>
							{profile.education.length > 0 ? (
								<>
									{profile.education.map((edu) => {
										return (
											<ProfileEducation
												key={edu._id}
												edu={edu}
											/>
										);
									})}
								</>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>

						{/* <!-- Github --> */}

						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</>
			)}
		</section>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
