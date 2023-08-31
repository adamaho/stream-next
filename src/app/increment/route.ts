import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

import { count, increment, decrement } from "../count";

export function GET(request: NextRequest) {
  increment();
  return new Response(JSON.stringify({ count }), {
    headers: {
      "content-type": "application/json",
      "x-content-type-options": "no-sniff",
    },
  });
}
