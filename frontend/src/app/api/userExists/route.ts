import {supabase} from "../supabase";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const wallet = request.url.split("?")[1];
    const { data, error } = await supabase.from('users').select().eq('wallet', wallet);
    if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ exists: (data !== null) }, { status: 200 });
}