<script lang="ts">
    import { XataClient } from "../xata";

    const xata = new XataClient({
        apiKey: import.meta.env.XATA_API_KEY,
        branch: import.meta.env.XATA_BRANCH,
    });
    
    export let comments: any;
    export let post: any;

    async function submitComment(e: SubmitEvent) {
        const form = e.currentTarget as HTMLFormElement;
        try {
            const record = await xata.db.comments.create({
                blogPost: post,
                author: form.author.value,
                comment: form.comment.value,
            });
            console.log('Comment submitted successfully:', record);
            form.reset();
            // Provide feedback to the user, e.g., show a success message.
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Provide feedback to the user, e.g., show an error message.
        }
    }
</script>

<form on:submit|preventDefault={submitComment}>
    <div class="mb-8">
        <h2 class="h3 mt-16">
            Comment section:
        </h2>
        <div class="relative z-0 w-full u-mb-2 group">
            <input type="text" name="author" id="author" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="author" class="absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Your name
            </label>
        </div>
        <div class="relative z-0 w-full u-mb-2 group">
            <input type="text" name="comment" id="comment" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="comment" class="absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Comment
            </label>
        </div>
        <button type="submit" class="btn cc-light cc-smaller">Submit comment</button>

    </div>
</form>

{#if comments}
    {#if comments.length > 1}
        <h3 class="h4 mt-16">
            Comments:
        </h3>
    {:else}
        <h3 class="h4 mt-16">
            Comment:
        </h3>
    {/if}

  
    {#each comments.filter(comment => !comment.replyToComment) as comment (comment.id)}
        <div class="card mb-16 px-8 py-4">
            <div class="flex justify-between">
                <p class="mb-4 font-bold">{comment.author}</p>
                <p class="mb-4 text-sm">{comment.xata.createdAt.toLocaleDateString('fi-FI')}</p>
            </div>
            <p>{comment.comment}</p>
            {#each comments.filter(reply => reply.replyToComment && reply.replyToComment.id === comment.id) as reply (reply.id)}
                <div class="card mt-4 px-6 py-4">
                    <div class="flex justify-between">
                        <p class="mb-4 font-bold">{reply.author}</p>
                        <p class="mb-4 text-sm">{reply.xata.createdAt.toLocaleDateString('fi-FI')}</p>
                    </div>
                    <p>{reply.comment}</p>
                    {#each comments.filter(answer => answer.replyToComment && answer.replyToComment.id === reply.id) as answer (answer.id)}
                    <div class="card mt-4 px-6 py-4">
                        <div class="flex justify-between">
                            <p class="mb-4 font-bold">{answer.author}</p>
                            <p class="mb-4 text-sm">{answer.xata.createdAt.toLocaleDateString('fi-FI')}</p>
                        </div>
                        <p>{answer.comment}</p>
                    </div>
                {/each}
                </div>
            {/each}
        </div>
    {/each}
{/if}