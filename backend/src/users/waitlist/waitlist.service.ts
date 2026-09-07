import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class WaitlistedUserService{
    constructor(
        private readonly supabase: SupabaseService,
    ){}

    async addUserToWaitlist(email: string){
        const {data, error} = await this.supabase.client.from('waitlisted').insert({"email": email}).select().single()

        if(error){
            throw error
        }
        
        return data
    }
}