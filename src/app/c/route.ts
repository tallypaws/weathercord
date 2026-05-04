import { connectionsTable, ConnectionType, sessionsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { resolveTxt } from "node:dns";

export async function GET(req: Request) {
  const authCookie = (await cookies()).get("auth")?.value;

  if (!authCookie) return new Response("Missing required cookie \"auth\"", { status: 401 });

  const sessionList = (await db.select().from(sessionsTable).where(eq(sessionsTable.code, authCookie))).values().toArray();
  if (!sessionList[0]) return new Response("Authorization token showed no results", { status: 401 });
  const id = sessionList[0].id;

  const searchParams = new URLSearchParams(req.url.split("?")[1]);

  const type = searchParams.get("type");
  const value = searchParams.get("value");

  if (typeof type !== "string") return new Response("Missing field \"type\"", { status: 400 });
  if (typeof value !== "string") return new Response("Missing field \"value\"", { status: 400 });

  if (type === ConnectionType.Domain) {
    const { err, addresses }: { err: NodeJS.ErrnoException | null, addresses: string[][] } = await new Promise((resolve) => {
      resolveTxt(`_weathercord.${value}`, (err, addresses) => {
        resolve({ err, addresses });
      });
    });
    if (err) {
      if (err.code === "ENODATA") return new Response("Could not verify connection", { status: 400 });
      return new Response(err.message, { status: 500 });
    }
    if (addresses.some((value) => value.includes(id))) {
      await db.insert(connectionsTable).values({
        id,
        type,
        value
      }).execute();
      return new Response();
    }
    return new Response("Could not verify connection", { status: 400 });
  } else return new Response("Unknown connection type", { status: 400 });
};
