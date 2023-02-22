import { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './comment.module.css';
import { postComment } from '../../lib/comments-util';

const Comment = ({updateComments}) => {
	const [enteredComment, setEnteredComment] = useState('');
	const [enteredName, setEnteredName] = useState('');
  const router = useRouter();
  const {slug: postId} = router.query;

  const clearComments = () => {
    setEnteredComment('');
    setEnteredName('');
  }

	const commentHandler = (e) => {
		e.preventDefault();
		console.log('handling comment...', enteredComment, enteredName, postId);
    postComment({comment: enteredComment, name: enteredName, postId});
    setTimeout(() => updateComments(), 500); // ensures new comment is already posted to database
    clearComments();
   
	};

	return (
		<form className={classes.comment} onSubmit={commentHandler}>
			<div className={classes.controls}>
				<input
					id='name'
					placeholder='Name'
          value={enteredName}
          onChange={(e) => setEnteredName(e.target.value)}
					required/>
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
	);
};

export default Comment;
