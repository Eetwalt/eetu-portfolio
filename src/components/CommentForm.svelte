<script lang="ts">
    export let post: any;
    export let buttonText: any;
    export let comment: any;

    interface FormData {
        author: string;
        comment: string;
        blogPost: string;
        replyToComment?: string;
    }

    let errorMessage = "";

    async function submitComment(e: SubmitEvent, commentId?: string) {
        const form = e.currentTarget as HTMLFormElement;

        const formData: FormData = {
            author: form.author.value,
            comment: form.comment.value,
            blogPost: post.id,
            replyToComment: commentId,
        };
        try {
            const response = await fetch("../api/comments", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                errorMessage = "";
                await response.json();
                window.location.href = `/posts/${post.slug}#comments`;
            } else {
                const data: any = await response.json();
                errorMessage = data.message || "Error submitting the comment";
                console.error("Error submitting the comment");
            }
        } catch (error) {
            errorMessage = "Network error. Error sending the email";
            console.error('Error submitting comment:', error);
            // Provide feedback to the user, e.g., show an error message.
        }
    }

    export let isFormVisible = false;

    function showForm() {
        isFormVisible = true;
    }
</script>

{#if !isFormVisible}
    <button on:click={showForm} class="btn cc-light cc-smaller ml-auto flex gap-2 mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        {buttonText}
    </button>
{/if}
{#if isFormVisible}
    <form on:submit={(e) => submitComment(e, comment.id)}>
        <div id="commentsection" class="mt-8 flex flex-col relative">
            <div class="mb-4 relative">
                <label for="author" class="block mb-2 text-sm font-medium text-gray-900 absolute left-[2px] top-[2px] px-3 py-1 bg-gray-50">Your name:</label>
                <input type="text" id="author" name="author" class="block w-full px-4 pt-4 h-16 text-gray-900 border border-gray-500 bg-gray-50 focus:ring-purple-800 focus:border-purple-800" />
            </div>
            <div class="mb-4 relative">
                <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 absolute left-[2px] top-[2px] px-3 py-1 bg-gray-50">Comment:</label>
                <textarea rows=3 id="comment" name="comment" style="form-sizing: content" class="block w-full p-4 pr-36 pt-8 text-gray-900 border border-gray-500 bg-gray-50 sm:text-md focus:ring-purple-800 focus:border-purple-800" />
            </div>
            <button type="submit" class="btn cc-light cc-smaller ml-auto flex gap-2 absolute bottom-7 right-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                {buttonText}
            </button>
        </div>
        {#if errorMessage}
            <p>{errorMessage}</p>
        {/if}
    </form>
{/if}