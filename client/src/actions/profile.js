import axios from "axios";
import { setAlert } from "./alert";
import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from "./types";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//Create or update profile
export const createProfile =
	(formData, navigateDashboard, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(formData);
			const res = await axios.post("api/profile", body, config);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(
				setAlert(
					edit ? "Profile Updated" : "Profile Created",
					"success"
				)
			);

			if (!edit) {
				navigateDashboard();
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

//Add experience
export const addExperience =
	(formData, navigateDashboard, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(formData);
			const res = await axios.put("api/profile/experience", body, config);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			});
			dispatch(setAlert("Experience Added", "success"));

			if (!edit) {
				navigateDashboard();
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

//Add education
export const addEducation =
	(formData, navigateDashboard, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(formData);
			const res = await axios.put("api/profile/education", body, config);

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			});
			dispatch(setAlert("Education Added", "success"));

			if (!edit) {
				navigateDashboard();
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

//Delete experience
export const deleteExperience = (id) => async dispatch => {
	try {
		const res = await axios.delete(`api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Removed", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
}; 

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Removed", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//Delete account
export const deleteAcccount = () => async (dispatch) => {

	if(window.confirm('Are you sure? This can NOT be undone!')){
		try {
			const res = await axios.delete(`api/profile`);
	
			dispatch({
				type: CLEAR_PROFILE,
			});
			dispatch({
				type: ACCOUNT_DELETED,
			});
	
			dispatch(setAlert("Your account has been permanently deleted", "success"));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
	
};