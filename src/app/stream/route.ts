import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getCount } from "../count";

export const runtime = "edge"; // 'nodejs' is the default

export function GET() {
  const bc = new BroadcastChannel("count");
  const body = new ReadableStream({
    start(controller) {
      bc.addEventListener("message", (count) => {
        const msg = `count: ${count}\n`;
        console.log("message recieved", count);
        controller.enqueue(new TextEncoder().encode(msg));
      });
    },
    cancel() {
      bc.close();
      console.log("client disconnected");
    },
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "no-sniff",
    },
  });
}
