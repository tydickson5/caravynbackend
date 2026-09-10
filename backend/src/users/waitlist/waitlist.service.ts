import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class WaitlistedUserService{
    constructor(
        private readonly supabase: SupabaseService,
    ){}

    async addUserToWaitlist(email: string, betaTesting: boolean, bestTravelExperience: string, nextTrip: string){
        const {data, error} = await this.supabase.client.from('waitlisted').insert({
            "email": email, 
            "beta_testing": betaTesting,
            "best_travel_experience": bestTravelExperience,
            "next_trip": nextTrip
        }).select().single()

        if(error){
            throw error
        }
        
        return data
    }
}