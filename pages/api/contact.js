import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		// const data = JSON.parse(req.body); // ! set content-type in headers to avoid needing to do this
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({
				message:
					'Invalid input. Check that you wrote your email, name, and message correctly.',
			});
			return;
		}

		// Store in db
		const newMessage = { email, name, message };
		let client;
  
    const doubleSlash = '//'; 
		const connectionString = `mongodb+srv:${doubleSlash}${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.pnsykkk.mongodb.net/?retryWrites=true&w=majority`;
		try {
			client = await MongoClient.connect(connectionString);
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}

		const db = client.db();

		try {
			const result = await db.collection('messages').insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (error) {
			client.close();
			res.status(500).json({ message: 'Storing message failed' });
			return;
		}

		client.close();

		res
			.status(201)
			.json({ message: 'Message successfully stored', data: newMessage });
	}
}

export default handler;
