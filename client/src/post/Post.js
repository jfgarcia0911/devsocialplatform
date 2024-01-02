import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import Spinner from "../components/layout/Spinner";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading } }) => {
	const params = useParams();
	useEffect(() => {
		getPost(params.id);
	}, [getPost, params]);


	console.log(post)
	return loading || post === null ? (
		<Spinner />
	) : (
		<section className="container">
			<Link to={`/posts`} class="btn btn-secondary">
				Back to Posts
			</Link>
			<PostItem post={post} />
			<CommentForm postId={post._id} />
			<div class="comments">
				
				{post.comments.map((comment) => {
					return (
						<CommentItem
							key={comment._id}
							comment={comment}
							postId={post._id}
						/>
					);
				})}
			</div>
		</section>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
