import { NextResponse } from "next/server";
import { supabase } from "../util/supabase";

export async function GET(request: Request) {
    const wallet = request.url.split("?")[1];
    const { data, error } = await supabase.from('users').select("First Name", "Last Name",  "wallet").eq('wallet', wallet);
    if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 200 });
}