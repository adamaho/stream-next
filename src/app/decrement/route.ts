import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

import { decrement } from "../count";

export function GET(request: NextRequest) {
  decrement();
  return new Response("decremented count.", {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "no-sniff",
    },
  });
}
