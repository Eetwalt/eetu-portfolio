<script lang="ts">
    import Comment from "./Comment.svelte";
    import CommentForm from "./CommentForm.svelte";

    export let postComments: any;

    postComments.sort((a: any, b: any) => {
        const dateA: Date = new Date(a.created_at);
        const dateB: Date = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
    });

    export let post: any;
</script>

<section>
    <h2 class="h3 mt-8 mb-8">
        Comment section:
    </h2>
    <CommentForm post={post} buttonText="Comment" comment="" isFormVisible={true}/>
    {#if postComments.length > 0}
        {#if postComments.length > 1}
            <h3 class="h4">
                Comments:
            </h3>
        {:else}
            <h3 class="h4">
                Comment:
            </h3>
        {/if}
        {#each postComments.filter(comment => !comment.replyToComment) as comment (comment.id)}
            <Comment comment={comment} postComments={postComments} post={post}/>
        {/each}
    {:else}
        <div>
            <p>No comments posted yet!</p>
        </div>
    {/if}
</section>