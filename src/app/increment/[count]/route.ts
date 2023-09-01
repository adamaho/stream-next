import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

export function GET(
  request: NextRequest,
  { params }: { params: { count: number } }
) {
  const bc = new BroadcastChannel("count");
  bc.postMessage(params.count);

  return new Response("incremented count", {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "no-sniff",
    },
  });
}
