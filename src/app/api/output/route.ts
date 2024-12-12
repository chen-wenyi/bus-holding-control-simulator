import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const outputUrl = searchParams.get('outputUrl');
  if (outputUrl) {
    const result = await axios.get(outputUrl)
    return Response.json(result.data);
  }
}
