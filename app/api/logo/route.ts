import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "internshala-uploads.internshala.com",
  "internshala.com",
]);

export const revalidate = 86400;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("src");
  if (!target) return new NextResponse("missing src", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("bad url", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new NextResponse("host not allowed", { status: 400 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Safari/537.36",
        Referer: "https://internshala.com/",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });
    if (!upstream.ok) {
      return new NextResponse("upstream " + upstream.status, {
        status: 502,
      });
    }
    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "image/webp",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch (e) {
    return new NextResponse("error " + String(e), { status: 500 });
  }
}
