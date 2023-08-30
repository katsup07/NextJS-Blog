import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './comment.module.css';
import { postComment } from '../../lib/comments-util';
import Notification from '../ui/notification';

const Comment = ({ updateComments }) => {
	const [enteredComment, setEnteredComment] = useState('');
	const [enteredName, setEnteredName] = useState('');
	const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', or 'error'
	const [requestError, setRequestError] = useState('');
	const router = useRouter();
	const { slug: postId } = router.query;

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => setRequestStatus(''), 4000);
			setRequestError('');

			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	const clearComments = () => {
		setEnteredComment('');
		setEnteredName('');
	};

	const sendCommentHandler = async (e) => {
		e.preventDefault();
		setRequestStatus('pending');
		try {
			await postComment({ comment: enteredComment, name: enteredName, postId });
			setRequestStatus('success');
			setTimeout(() => updateComments(), 500); // ensures new comment is already posted to database
			clearComments();
		} catch (err) {
			console.log('handling comment error occurred');
			setRequestStatus('error');
			setRequestError(err.message);
		}
	};

	const notificationJSX = () => {
		if (requestStatus === 'success')
			return (
				<Notification
					status='success'
					title='Success'
					message='Comment successfully added.'
				/>
			);
		else if (requestStatus === 'pending')
			return (
				<Notification
					status='pending'
					title='Pending'
					message='Adding comment...'
				/>
			);
		else if (requestStatus === 'error')
			return (
				<Notification
					status='error'
					title='Error'
					message={
						requestError || 'Something went wrong. Please try again shortly.'
					}
				/>
			);
	};

	return (
		<>
			{notificationJSX()}
			<form className={classes.comment} onSubmit={sendCommentHandler}>
				<div className={classes.controls}>
					<input
						id='name'
						placeholder='Name'
						value={enteredName}
						onChange={(e) => setEnteredName(e.target.value)}
						required
					/>
				</div>
				<div className={classes.controls}>
					<textarea
						id='comment'
						placeholder='Add a comment...'
						value={enteredComment}
						onChange={(e) => setEnteredComment(e.target.value)}
						rows='2'
						required></textarea>
				</div>
				<div className={classes.actions}>
					<button>comment</button>
				</div>
			</form>
		</>
	);
};

export default Comment;
