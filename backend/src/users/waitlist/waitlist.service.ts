import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class WaitlistedUserService{
    constructor(
        private readonly supabase: SupabaseService,
    ){}

    async addUserToWaitlist(email: string, betaTester: boolean){
        const {data, error} = await this.supabase.client.from('waitlisted').insert({"email": email, "beta_tester": betaTester}).select().single()

        if(error){
            throw error
        }
        
        return data
    }
}