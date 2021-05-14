<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const { postType } = page.params;
		const res = await fetch(`/${ postType }.json`);

		if (res.ok) {
			return {
				props: {
					posts: await res.json(),
					postType
				}
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
			error: new Error(`There was an error while loading the ${ postType }`)
		};
	}
</script>

<script>
	export let posts;
	export let postType;
</script>

<svelte:head>
	<title>{ postType.replace(/^\w/, firstLetter => firstLetter.toUpperCase()) }</title>
</svelte:head>

<h1 class="text-2xl">{ postType.replace(/^\w/, firstLetter => firstLetter.toUpperCase()) }</h1>

{#if posts.length != 0}
	<ul>
		{#each posts as post}
			<li>
				<a sveltekit:prefetch
				   class="text-blue-600 underline"
				   href="{ postType }/{ post.slug }"
				   >{ post.title }</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No { postType } were found.</p>
{/if}
