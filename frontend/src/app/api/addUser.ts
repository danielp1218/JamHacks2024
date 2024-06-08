import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "./supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { wallet, firstName, lastName } = req.body;
        const { data, error } = await supabase
            .from('users')
            .insert([
                { wallet: wallet, first_name: firstName, last_name: lastName }
            ])
            .select()
        if (error) {
            res.status(500).json({ error: 'An error occurred while adding the user' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}