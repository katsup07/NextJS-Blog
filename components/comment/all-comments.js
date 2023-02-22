import classes from './all-comments.module.css';


const AllComments = ({ comments }) => {
  const items = comments || [];
	// name, date, comment
	// const temp_comments = [
	// 	{
	// 		name: 'Luke',
	// 		date: new Date('11/11/11').toString(),
	// 		comment: 'Nice post! I like it!',
	// 	},
	// ];
  if(items.length === 0)
    return <section className={classes.comments}>
      <p className={classes.noComments}>Oh no! Currently there are no comments. How about you leave me one?</p>
    </section>
	return (
		<section className={classes.comments}>
			<ul>
        {items.map((c) => (
          <li key={c.date}>
            <p>{c.comment}</p>
            <div className={classes.metaContainer}>
              <div>{c.name}</div>
              <div>{c.date}</div>
            </div>
          </li>
        ))}
      </ul>
		</section>
	);
};

export default AllComments;
