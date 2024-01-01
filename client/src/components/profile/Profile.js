import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const params = useParams();

	useEffect(() => {
		getProfileById(params.id);
	}, [getProfileById, params]);

	return (
		<>
			{profile === null ? (
				<Spinner />
			) : (
				<>
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
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

                        {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}

						
					</div>
				</>
			)}
		</>
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
