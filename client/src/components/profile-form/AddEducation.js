import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";

const AddEducation = ({ addEducation, setAlert }) => {
	const navigate = useNavigate();
	const navigateDashboard = () => {
		navigate("/dashboard");
	};
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

        const onChange = (e) => {
            setFormData((prevFormData) => {
                if (e.target.name === 'current') {
                    return {
                        ...prevFormData,
                        [e.target.name]: e.target.checked,
                        to: e.target.checked ? null : prevFormData.to,
                    };
                } else {
                    return {
                        ...prevFormData,
                        [e.target.name]: e.target.value,
                        to: prevFormData.current ? null : prevFormData.to,
                    };
                }
            });
        };
    

        const onSubmit = (e) => {
            e.preventDefault();
            if (current === false && to === '') {
                setAlert('Incomplete date', 'danger');
            } else {
                addEducation(formData, navigateDashboard);
            }
        };
   
	return (
		<>
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any
				school/bootcamp you attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School / Bootcamp"
						name="school"
						value={school}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree"
						name="degree"
						value={degree}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={(e) => onChange(e)}
						/>{" "}
						Current School
					</p>
				</div>
				{!current && (
					<div className="form-group">
						<h4>To Date</h4>
						<input
							type="date"
							name="to"
							value={to}
							onChange={(e) => onChange(e)}
						/>
					</div>
				)}

				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addEducation, setAlert })(AddEducation);
