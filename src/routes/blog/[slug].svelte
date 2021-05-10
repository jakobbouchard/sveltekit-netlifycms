<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/blog/${ page.params.slug }`;
		const res = await fetch(`${ url }.json`);

		if (res.ok) {
			return {
				props: {
					post: await res.json()
				}
			};
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

<article>
	{ @html post.html }
</article>