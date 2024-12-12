import { list } from '@vercel/blob';


export async function GET() {
  const l = await list()
  return Response.json(l.blobs);
}
