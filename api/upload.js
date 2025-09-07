import { put } from '@vercel/blob';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, data } = request.body;
    
    const blob = await put(filename, data, {
      access: 'public',
    });

    return response.status(200).json({ url: blob.url });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};
