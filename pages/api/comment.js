import { MongoClient } from "mongodb";

async function connectToDb(){
  const doubleSlash = '//';
  const connectionString = `mongodb+srv:${doubleSlash}${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.pnsykkk.mongodb.net/?retryWrites=true&w=majority`;
   
  return await MongoClient.connect(connectionString);
}

async function handler(req, res){

  // === Get ===
  if(req.method === 'GET'){
    console.log('Getting data from db...'); 
  
    let client;
  	try {
			client = await connectToDb();
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}

		const db = client.db();
    let result;
    try{
      result = await db.collection('comments').find({}).toArray();
    } catch(err){
      console.log('error getComments()', err);
      client.close();
      res.status(500).json({message: err});
      return;
    }

    console.log(result);
    
  res.status(200).json({message: 'success', data: result});
  }

  // === Post ===
  if(req.method === 'POST'){
    const { commentData } = req.body;
    const {comment, name, postId } = commentData;
 
    console.log('back-end-comment-handler', commentData);

    if(comment.trim() === '' || name.trim() === ''){
      res.status(422).json({message: 'Invalid input. Comment and name fields must not be blank.'});
      return;
    }

    // Store in db
		let client;
    let commentDataAndDate = {comment, name, postId, date: new Date()};

		try {
			client = await connectToDb();
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}

		const db = client.db();

		try {
			const result = await db.collection('comments').insertOne(commentDataAndDate);
			commentDataAndDate.id = result.insertedId; // {id:..., comment: newComment, date: new Date()}
		} catch (error) {
			client.close();
      console.log('error: ', error);
			res.status(500).json({ message: 'Storing comment failed' });
			return;
		}

		client.close();

		res
			.status(201)
			.json({ message: 'Comment successfully stored', data: commentDataAndDate});
  }
}


export default handler;