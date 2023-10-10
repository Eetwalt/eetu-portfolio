import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient (import.meta.env.NEXT_PUBLIC_SUPABASE_URL, import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const comment = await request.json();
    const createdComment = await client.db.comments.create(comment);
    const getComments = await client.db.comments.filter({ "blogPost.slug": comment.blogPost }).getMany();

    const responseData = {
      createdComment,
      comments: getComments, // Include fetched comments in the response
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle errors (e.g., database errors) and return an appropriate response
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
