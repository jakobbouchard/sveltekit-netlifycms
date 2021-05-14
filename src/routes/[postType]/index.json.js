import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const getAllPosts = (postType) => {
	try {
		return fs.readdirSync(`content/${ postType }/`).map((fileName) => {
			const slug = fileName.slice(0, -3);
			const file = fs.readFileSync(
				path.resolve(`content/${ postType }/`, fileName),
				'utf-8'
			);
			return { title: grayMatter(file).data.title, slug };
		});
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};

export async function get({ params }) {
	const { postType } = params;
	const allPosts = getAllPosts(postType);

	if (!allPosts) {
		return {
			status: 404
		}
	}

	return {
		body: allPosts
	};
}
