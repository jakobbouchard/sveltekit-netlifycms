import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import marked from 'marked';

const getPost = (fileName) => {
	return fs.readFileSync(
		path.resolve('content/posts/', `${ fileName }.md`),
		'utf-8'
	);
};


export async function get({ params }) {
	const { slug } = params;
	const post = getPost(slug);
	
	const renderer = new marked.Renderer();

	const { data, content } = grayMatter(post);
	const html = marked(content, { renderer });

	if (html) {
		return {
			body: {
				html, ...data
			}
		};
	}
}
