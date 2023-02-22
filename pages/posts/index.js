import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from './../../lib/posts-util';
import Head from "next/head";

function AllPostsPage({posts}){
  
  return <>
    <Head>
      <title>All Posts</title>
      <meta name="description" content="A list of all my interests and sometimes programming, like javascript, written as blog posts."></meta>
    </Head>
    <AllPosts posts={posts} />
  </>;
}

export function getStaticProps(){
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    }
  }
}
export default AllPostsPage;