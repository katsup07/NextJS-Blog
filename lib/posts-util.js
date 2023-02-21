const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles(){
  return fs.readdirSync(postsDirectory); // returns array of filenames
}

export function getPostData(postIdentifier) { // receives slug for page or .md file
 
	const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the markdown .md file extension
	const filePath = path.join(postsDirectory, `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent); // parses content and returns object with meta-data and content from file

	const postData = {
		slug: postSlug,
		...data,
		content,
	};

	return postData;
}

export function getAllPosts() {
	const postFiles = getPostsFiles() // returns array of filenames

	const sortedPosts = postFiles
		.map((postFile) => getPostData(postFile))
		.sort((postA, postB) => (postA.date > postB.date ? -1 : 1)); // sort by date

    return sortedPosts;
  }
  
export function getFeaturedPosts(){
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter( post => post.isFeatured);
    
  return featuredPosts;
}

