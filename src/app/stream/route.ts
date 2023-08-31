import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getCount } from "../count";

export const runtime = "edge"; // 'nodejs' is the default

export function GET(request: NextRequest) {
  let timer: NodeJS.Timeout;
  const body = new ReadableStream({
    start(controller) {
      timer = setInterval(() => {
        const msg = `count: ${getCount()}\n`;
        controller.enqueue(new TextEncoder().encode(msg));
      }, 1000);
    },
    cancel() {
      console.log("client disconnected");
      clearInterval(timer);
    },
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "no-sniff",
    },
  });
}
