import { NextResponse } from "next/server";
import { supabase } from "../util/supabase";

export async function POST(request: Request) {
    const formData = await request.formData();
    const { data, error } = await supabase.from('users').insert([
            { wallet: formData.get("wallet") as string, "First Name": formData.get("firstName") as string, "Last Name": formData.get("lastName") as string, patients: [], doctors: []}
        ])
        .select()
    if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ message: 'success!' }, { status: 200 });
}