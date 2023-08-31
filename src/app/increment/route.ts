import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

import { increment } from "../count";

export function GET(request: NextRequest) {
  increment();
  return new Response("incremented count", {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "no-sniff",
    },
  });
}
