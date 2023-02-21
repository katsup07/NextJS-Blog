import PostContent from '../../components/posts/posts-detail/post-content';
import { getPostData, getPostsFiles } from './../../lib/posts-util';
import Head from 'next/head';

function PostDetailPage(props) {
	return <>
   <Head>
    <title>{props.post.title}</title>
    <meta name="description" content={props.post.excerpt}></meta>
  </Head>
    <PostContent post={props.post} />
  </>;
}

export function getStaticProps(context) {
	const { slug } = context.params;

	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
    revalidate: 600,
	};
}

export function getStaticPaths(){
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, '')) // remove any md extensions
              .map( slug => ({ params: { slug: slug } }));

  return {
    paths: slugs, // 'next-js.md'...
    fallback: false,
  }
}

export default PostDetailPage;
