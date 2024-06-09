import {idToName} from "@/app/api/util/convert";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const uuid = request.url.split("?")[1];
    const name = await idToName(uuid);
    return NextResponse.json({name}, {status: 200});
}