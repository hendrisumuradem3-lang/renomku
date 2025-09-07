// app/api/blob-url/route.js
import { generateUploadURL } from '@vercel/blob';

export const runtime = 'edge';

export async function POST() {
  try {
    const { url, pathname } = await generateUploadURL({
      access: 'public',
    });
    return new Response(JSON.stringify({ uploadUrl: url, pathname }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to create URL', detail: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
