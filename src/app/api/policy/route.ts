import { list } from '@vercel/blob';
import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const policyName = searchParams.get('policy');
  const l = await list()
  const blob = l.blobs.find(b => b.pathname === policyName)!;
  const result = await axios.get(blob.downloadUrl)
  return Response.json(result.data);
}
