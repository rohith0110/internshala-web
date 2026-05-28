import { NextResponse } from "next/server";
import type { RawSearchResponse } from "@/app/lib/types";

const UPSTREAM = "https://internshala.com/hiring/search";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? "1";

  try {
    const upstream = await fetch(
      `${UPSTREAM}?page=${encodeURIComponent(page)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json,text/plain,*/*",
          "X-Requested-With": "XMLHttpRequest",
        },
        cache: "no-store",
      },
    );

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}` },
        { status: 502 },
      );
    }

    const text = await upstream.text();
    const data = JSON.parse(text) as RawSearchResponse;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch internships", detail: String(err) },
      { status: 500 },
    );
  }
}
