import classes from './post-content.module.css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

import PostHeader from './post-header';

const PostContent = ({ post }) => {
	const { title, image, date, slug, content } = post;

	const imagePath = `/images/posts/${slug}/${image}`;

	const customRenderers = {
		/* https://www.npmjs.com/package/react-markdown */
		// img(image) {
		// 	// This method will be called instead of the default img element
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 		/>
		// 	);
		// },
		p(paragraph) {
			const { node } = paragraph;

			if (node.children[0].tagName === 'img') {
				const image = node.children[0];

				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.properties.src}`}
							alt={title}
							width={600}
							height={300}
						/>
					</div>
				);
			}

			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
			return (
				<SyntaxHighlighter style={atomDark} language={language} children={children} />
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
		</article>
	);
};

export default PostContent;
