<script lang="ts">
  import CommentForm from "./CommentForm.svelte";

    export let comment: any;
    export let post: any;
    export let postComments: any;
    console.log(comment);

    postComments.sort((a: any, b: any) => {
        const dateA: Date = new Date(a.xata.createdAt);
        const dateB: Date = new Date(b.xata.createdAt);
        return dateA.getTime() - dateB.getTime();
    });

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
            blogPost: post,
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
                window.location.href = "/posts/new-portfolio-launched#comments";
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

</script>

<div class="card mb-4 px-6 py-4">
    <div class="flex justify-between">
        <div class="flex gap-2">
            <p class="mb-4 font-bold">{comment.author}</p>
            {#if comment.isAdmin === true}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
            {/if}           
        </div>
        <p class="text-sm">{comment.xata.createdAt.toLocaleDateString('fi-FI')}</p>
    </div>
    <p>{comment.comment}</p>
    <CommentForm comment={comment} buttonText="Reply to comment" post={post} />
    {#each postComments.filter(reply => reply.replyToComment && reply.replyToComment.id === comment.id) as reply (reply.id)}
        <div class="card mt-4 px-6 py-4 ml-6">
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <p class="mb-4 font-bold">{comment.author}</p>
                    {#if reply.isAdmin === true}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                        </svg>
                    {/if}           
                </div>
                <p class="mb-4 text-sm">{reply.xata.createdAt.toLocaleDateString('fi-FI')}</p>
            </div>
            <p>{reply.comment}</p>
            <CommentForm comment={reply} buttonText="Reply to comment" post={post}/>
            {#each postComments.filter(answer => answer.replyToComment && answer.replyToComment.id === reply.id) as answer (answer.id)}
            <div class="card mt-4 px-6 py-4">
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        <p class="mb-4 font-bold">{comment.author}</p>
                        {#if answer.isAdmin === true}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>
                        {/if}           
                    </div>
                    <p class="mb-4 text-sm">{answer.xata.createdAt.toLocaleDateString('fi-FI')}</p>
                </div>
                <p>{answer.comment}</p>
            </div>
        {/each}
        </div>
    {/each}
</div>