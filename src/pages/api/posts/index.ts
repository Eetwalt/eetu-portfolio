import { XataClient } from "../../../xata";

const client = new XataClient({apiKey: import.meta.env.XATA_API_KEY})
export async function GET() {
  try {
    const blogPosts = await client.db.blogPosts.getAll();
    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
}
