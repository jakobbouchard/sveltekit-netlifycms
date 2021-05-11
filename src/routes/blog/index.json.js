import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const getAllPosts = () => {
	try {
		return fs.readdirSync('content/posts/').map((fileName) => {
			const slug = fileName.slice(0, -3);
			const post = fs.readFileSync(
				path.resolve('content/posts', fileName),
				'utf-8'
			);
			return { title: grayMatter(post).data.title, slug };
		});
	} catch (e) {
		return [];
	}
};

export async function get() {
	const posts = getAllPosts();

	return {
		body: {
			posts
		}
	};
}