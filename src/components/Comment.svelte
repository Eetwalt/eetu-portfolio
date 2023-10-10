<script lang="ts">
    import CommentForm from "./CommentForm.svelte";

    export let post: any;
    export let postComments: any;
    export let comment: any;

    const timestamp = new Date(comment.created_at);

    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const year = timestamp.getFullYear().toString().slice(-2);
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    postComments.sort((a: any, b: any) => {
        const dateA: Date = new Date(a.created_at);
        const dateB: Date = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
    });
</script>

<!-- Comments -->
<div class="card mb-4 px-6 py-4">
    <div class="flex justify-between">
        <div class="flex gap-4 items-start">
            <p class="mb-4 font-bold normal-case">{comment.author}</p>
            {#if comment.isAdmin === true}
                <div class="text-sm flex items-start gap-2 border border-solid border-gray-500 pl-1 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <p class="mb-0 font-bold">Author</p>
                </div>
            {/if}           
        </div>
        <p class="text-sm">{formattedDate}</p>
    </div>
    <p class="normal-case">{comment.comment}</p>
    <CommentForm comment={comment} buttonText="Reply to comment" post={post}/>

    <!-- Replies -->
    {#each postComments.filter(reply => reply.replyToComment && reply.replyToComment === comment.id) as reply (reply.id)}
        <div class="card mt-4 px-6 py-4 ml-6">
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <p class="mb-4 font-bold">{reply.author}</p>
                    {#if reply.isAdmin === true}
                        <div class="text-sm flex items-start gap-2 border border-solid border-gray-500 px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-5">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>
                            <p class="mb-0">Author</p>
                        </div>
                    {/if}           
                </div>
                <p class="mb-4 text-sm">{formattedDate}</p>
            </div>
            <p>{reply.comment}</p>
            <CommentForm comment={reply} buttonText="Reply to comment" post={post}/>

            <!-- Answers -->
            {#each postComments.filter(answer => answer.replyToComment && answer.replyToComment === reply.id) as answer (answer.id)}
            <div class="card mt-4 px-6 py-4">
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        <p class="mb-4 font-bold">{answer.author}</p>
                        {#if answer.isAdmin === true}
                            <div class="text-sm flex items-start gap-2 border border-solid border-gray-500 px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-5">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <p class="mb-0">Author</p>
                            </div>
                        {/if}           
                    </div>
                    <p class="mb-4 text-sm">{formattedDate}</p>
                </div>
                <p>{answer.comment}</p>
            </div>
        {/each}
        </div>
    {/each}
</div>