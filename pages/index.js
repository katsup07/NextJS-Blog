import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import Head from 'next/head';

function HomePage({posts}) { // from getStaticProps()

	return (
		<>
    <Head>
      <title>LJ's World</title>
      <meta name="description" content="I post all about stuffed animals and sometimes web development too."></meta>
    </Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}

export function getStaticProps(){
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    },
  }
}

export default HomePage;