import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
//Redux
import { useSelector } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import DashBoard from "./components/dashboard/DashBoard";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./posts/Posts";
import Post from "./post/Post";
import NotFound from "./components/layout/NotFound";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return (
		<Router>
		    <Navbar />
        <Alert />
		      <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/profiles' element={<Profiles />} />
            <Route exact path='/profile/:id' element={<Profile />} />
            <Route exact path='/dashboard' element={isAuthenticated ? <DashBoard /> : <Navigate to='/login' />} />
            <Route exact path='/create-profile' element={isAuthenticated ?<CreateProfile/> : <Navigate to='/login' />}/>
            <Route exact path='/edit-profile' element={isAuthenticated ?<EditProfile/> : <Navigate to='/login' />}/>
            <Route exact path='/add-experience' element={isAuthenticated ?<AddExperience/> : <Navigate to='/login' />}/>
            <Route exact path='/add-education' element={isAuthenticated ?<AddEducation/> : <Navigate to='/login' />}/>
            <Route exact path='/posts' element={isAuthenticated ?<Posts/> : <Navigate to='/login' />}/>
            <Route exact path='/posts/:id' element={isAuthenticated ?<Post/> : <Navigate to='/login' />}/>
            <Route exact path='*' element={<NotFound />} />
		      </Routes>
		</Router>

		// <Router>
		// 	<Navbar />
		// 		<Routes>
		// 			<Route exact path="/" element={<Landing />} />
					
          
		// 			<Route exact path="/register" element={<section className="container"><>
    //       <Alert />
    //       <Register />
    //       </><Register /></section>} />
		// 			<Route exact path="/login" element={<Login />} />
		// 			<Route exact path="/profiles" element={<Profiles />} />
		// 			<Route exact path="/profile/:id" element={<Profile />} />
		// 			<Route
		// 				exact
		// 				path="/dashboard"
		// 				element={
		// 					isAuthenticated ? (
		// 						<DashBoard />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/create-profile"
		// 				element={
		// 					isAuthenticated ? (
		// 						<CreateProfile />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/edit-profile"
		// 				element={
		// 					isAuthenticated ? (
		// 						<EditProfile />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/add-experience"
		// 				element={
		// 					isAuthenticated ? (
		// 						<AddExperience />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/add-education"
		// 				element={
		// 					isAuthenticated ? (
		// 						<AddEducation />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/posts"
		// 				element={
		// 					isAuthenticated ? (
		// 						<Posts />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route
		// 				exact
		// 				path="/posts/:id"
		// 				element={
		// 					isAuthenticated ? (
		// 						<Post />
		// 					) : (
		// 						<Navigate to="/login" />
		// 					)
		// 				}
		// 			/>
		// 			<Route exact path="*" element={<NotFound />} />
		// 		</Routes>
		// </Router>
	);
}

export default App;
