import PostItem from './post-item';
import classes from './posts-grid.module.css';

const PostsGrid = ({ posts }) => {
	return (
		<div className={classes.container}>
			<ul className={classes.grid}>
				{posts.map((post) => (
					<PostItem key={post.slug} post={post} />
				))}
			</ul>
		</div>
	);
};

export default PostsGrid;
