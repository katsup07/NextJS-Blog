import PostContent from '../../components/posts/posts-detail/post-content';
import { getPostData, getPostsFiles } from './../../lib/posts-util';
import Head from 'next/head';
import Comment from '../../components/comment/comment';
import AllComments from '../../components/comment/all-comments';
import { getComments, filterCommentsByPostId } from '../../lib/comments-util';
import { useState, useEffect } from 'react';

function PostDetailPage(props) {
  const [allComments, setAllComments ] = useState(); // [{comment:..., date:..., name:..., postId:..., _id:...},...]
  const [triggerAnEffect, setTriggerAnEffect] = useState(false);
 
  useEffect(() => {// fetch all comments
    const doGetComments = async() => {
      if(props && props.post && props.post.slug){
        const filteredComments = await filterCommentsByPostId(props.post.slug || '');
        setAllComments(filteredComments);
      }
    }
   doGetComments();
  },[triggerAnEffect]); 

	return <>
   <Head>
    <title>{props.post.title}</title>
    <meta name="description" content={props.post.excerpt}></meta>
  </Head>
    <PostContent post={props.post} />
    <Comment updateComments={() => setTriggerAnEffect(!triggerAnEffect)}/>
    <AllComments comments={allComments} />
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
