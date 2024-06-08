import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "./supabase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { wallet } = req.body;
        res.status(200).json(supabase.from('users').select().eq('wallet', wallet));
    } else {
        // Handle any other HTTP method
    }
}