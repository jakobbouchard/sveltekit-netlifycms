<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({fetch}) {
		const res = await fetch('blog.json');

		if (res.ok) {
			return {
				props: await res.json()
			};
		}

		return {
			status: res.status,
			error: new Error('There was an error while loading the posts')
		};
	}
</script>

<script>
	export let posts;
</script>

<h1>Recent posts</h1>

{#if posts}
	<ul>
		{#each posts as post}
			<!-- we're using the non-standard `sveltekit:prefetch` attribute to
					 tell SvelteKit to load the data for the page as soon as
					 the user hovers over the link or taps it, instead of
					 waiting for the 'click' event -->
			<li><a sveltekit:prefetch href="blog/{ post.slug }">{ post.title }</a></li>
		{/each}
	</ul>
{/if}