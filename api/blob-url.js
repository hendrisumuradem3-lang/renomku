// api/blob-url.js
export const config = { runtime: 'edge' }; // Edge Function

import { generateUploadURL } from '@vercel/blob';

export default async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Optional: kamu bisa validasi ukuran/tipe di client.
    const { url, pathname } = await generateUploadURL({
      // akses file publik
      access: 'public',
      // optional: mimeTypeHint: 'image/*',
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
