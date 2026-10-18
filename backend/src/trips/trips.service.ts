import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class TripService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ){}

    async startTrip(userId: string, username: string, name: string, description: string){
        //create trip + notification
        const { data, error } = await this.supabase.client
            .from("trips")
            .insert({
                user_id: userId,
                name: name,
                description: description
            })
            .select()
            .single()

        if(error){
            throw error
        }

        //add user to trip

        var response = await this.addUserToTrip(userId, data.id, true)
        if(response){
            this.tripStartedNotification(userId, username)

            return data
        }
        else{
            return false
        }
        
    }

    async addUserToTrip(userId: string, tripId: string, isThisUsersTrip: boolean){
        const { data, error } = await this.supabase.client
            .from("trip_friend")
            .upsert({
                user_id: userId,
                trip_id: tripId
            })
            .select()
            .single()

        if(error){
            throw error
        }

        if(!isThisUsersTrip){
            await this.sendAddFriendToTripNotification(userId, tripId)
        }

        return true
    }

    async sendAddFriendToTripNotification(userId: string, tripId: string){

        const {data: name, error} = await this.supabase.client.from('profiles').select("username").eq("id", userId).single()

        let title = name + " invited you to join their trip!"
        let body = "Tap to join"

        await this.notificationService.createNotification(userId, title, body, tripId, "trip")
    }

    async removeUserFromTrip(tripId: string, userId: string){
        const {error} = await this.supabase.client.from("trip_friend").delete().eq("trip_id", tripId).eq("user_id", userId)

        if(error){
            throw error
        }

        return true
    }

    async tripStartedNotification(userId: string, username: string){

    }

    async endTrip(tripId: string){
        //update ended_at to timestamp and active -> false + notification
        const { data, error } = await this.supabase.client
            .from("trips")
            .update({
                ended_at: new Date()
            })
            .eq("id", tripId)

        if(error){
            throw error
        }

        await this.tripEndNotification()

    }

    async tripEndNotification(){

    }

    async post(userId: string, postId: string){
        //call addTripToPost for all active trips to post


    }

    async addPostToTrip(userId: string, postId: string, tripId: string){

        const {data, error} = await this.supabase.client
            .from("trip_items")
            .insert({
                "user_id": userId,
                "post_id": postId,
                "trip_id": tripId
            })
            .select()
            .single()

        if(error){
            throw error
        }

        return data
    }

    async removePostFromTrip(tripItemId: string){
        
        const {error} = await this.supabase.client
            .from("trip_items")
            .delete()
            .eq("id", tripItemId)

        if(error){
            throw error
        }
    }

    async deleteTrip(tripId: string){
        //delete trip -> will delete all tripitems
        const {error} = await this.supabase.client
            .from("trips")
            .delete()
            .eq("id", tripId)

        if(error){
            throw error
        }

    }

    async updateTrip(tripId: string, name: string, description: string, created_at: string, ended_at: string) {
        const {data, error} = await this.supabase.client
            .from("trips")
            .update({
                name: name,
                description: description,
                created_at: created_at,
                ended_at: ended_at
            })
            .eq("id", tripId)
            .select()
            .single()

        if(error){
            throw error
        }

        return data
    }

    async getTripFromId(tripId: string){
        const {data, error} = await this.supabase.client.from("trips").select("*").eq("id", tripId).single()

        if(error){
            throw error
        }

        return data
    }

    
}