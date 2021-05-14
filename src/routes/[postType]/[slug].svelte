<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const { postType, slug } = page.params;
		const url = `/${ postType }/${ slug }`;
		const res = await fetch(`${ url }.json`);

		if (res.ok) {
			return {
				props: { post: await res.json() }
			};
		}

		if (res.status == 404) {
			return {
				status: res.status,
				error: new Error('This page does not exist')
			}
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${ url }`)
		};
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{ post.title }</title>
</svelte:head>

<!-- Post images are purely decorative -->
<!-- svelte-ignore a11y-missing-attribute -->
<img src="{ post.thumbnail }">

<article class="prose">
	{ @html post.html }
</article>
