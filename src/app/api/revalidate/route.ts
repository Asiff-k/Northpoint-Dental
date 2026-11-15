import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CATALOGUE_TAG, SETTINGS_TAG } from "@/lib/data";

/**
 * Refreshes cached catalogue data after a change in Supabase.
 *   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" <site>/api/revalidate
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "REVALIDATE_SECRET is not set" }, { status: 503 });
  }

  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }

  // expire: 0 so the next page load shows the new data, not a stale copy.
  revalidateTag(CATALOGUE_TAG, { expire: 0 });
  revalidateTag(SETTINGS_TAG, { expire: 0 });
  return Response.json({ revalidated: [CATALOGUE_TAG, SETTINGS_TAG] });
}
