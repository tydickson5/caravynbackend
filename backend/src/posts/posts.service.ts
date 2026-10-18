import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/apn/notification.service";
import { SupabaseService } from "src/supabaseService";

@Injectable()
export class PostService{
    constructor(
        private readonly supabase: SupabaseService,
        private readonly notificationService: NotificationService
    ) {}

    async createPost(postId: string, userId: string, groupId: string, caption:string, mediaUrl: string, mediaType: string, videoURL: string, latitude, longitude, isHead: boolean, state: string, created_at?: string){

        var threadId;

        isHead = false

        if(isHead){
            threadId = this.createThread()
            threadId = threadId.id
        } else {
            //calculate closest post
            threadId = "none"
        }

        console.log("post creating")
        const{data, error} = await this.supabase.client
            .from('posts')
            .insert({
                id: postId,
                user_id: userId,
                group_id: "6ce9c8f8-2ff2-4f12-8f74-19671fcfb265",
                caption: caption,
                media_url: mediaUrl,
                media_type: mediaType,
                latitude: latitude,
                longitude: longitude,
                state: state,
                thread_id: threadId,
                head: isHead,
                created_at: created_at
            })
            .select()
            .single()

        if(error){
            throw error
        }

        if(mediaType == "video"){
            console.log("uploading vid")
            await this.createUpload(userId, postId, videoURL,mediaType)
        }
        


        await this.sendNotificaitonToUsers(groupId, userId,latitude,longitude, postId)
        console.log("post notified")

        return data
    }

    async deletePost(postId: string, postType: string, bucketPath: string){

        if(postType == "image"){
            this.deleteUploadFromStorage(bucketPath)

            
        } else {
            const {data: upload, error: uploadError} = await this.supabase.client.from("uploads")
            .select("*").eq("post_id", postId).single()

            if(uploadError){
                throw uploadError
            }

            this.deleteUploadFromStorage(upload.file_url)
        }


        const {error} = await this.supabase.client
            .from('posts')
            .delete()
            .eq('id', postId)

        if(error){
            throw error
        }
    }

    async createUpload(userId: string, postId: string, filePath: string, mediaType: string){

        const {data, error} = await this.supabase.client
            .from('uploads')
            .insert({
                post_id: postId,
                user_id: userId,
                file_url: filePath,
                media_type: mediaType,
            })
            .select()
            .single()

        if(error){
            throw error
        }

        return data

    }


    async deleteUploadFromStorage(bucketPath: string){
        const {data, error} = await this.supabase.client.storage.from('postImages').remove([bucketPath])

        if(error){
            throw error
        }
    }

    async sendNotificaitonToUsers(userId: string, latitude, longitude, postId: string, state: string){

        const {data: m, error: e} = await this.supabase.client.from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        const {data: friends, error: friendsError} = await this.supabase.client.from("friends").select().eq("user_id", userId)

        if(friendsError){
            throw friendsError
        }

        for(let friend of friends){

            const {data, error} = await this.supabase.client.from("user_notification_settings").select("trips").eq("user_id", friend.friend_id).single()

            if(error){
                throw error
            }

            const trips = data.trips
            if(trips){
                var title = m.username + " posted"
                var text = "@ " + longitude + ", " + latitude

                await this.notificationService.createNotification(friend.user_id,title, text, postId, "post")
            }

            
        }

        if(state == "public"){

            

        } else {
            //friend


        }
    }

    async createThread(){
        const {data,error} = await this.supabase.client
            .from("threads")
            .insert({

            })
            .select()
            .single()

        if(error){
            throw error
        }

        return data
    }

    async getPostsByUserAndDate(userId: string, created_at: string, ended_at: string) {
        const { data, error } = await this.supabase.client
            .from('posts')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', created_at)
            .lte('created_at', ended_at)
            .order('created_at', { ascending: true });

        if (error) {
            throw error;
        }

        return data;
    }
}