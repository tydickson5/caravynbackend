import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./posts.service";
import { JWTStrategy } from "src/auth/jwt.strategy";

@Controller('posts')
@UseGuards(JWTStrategy)
export class PostController {
    constructor(
        private postsService: PostService,
    ){}

    @Post('create')
    async create(
        @Body()
        body: {
            postId: string,
            userId: string,
            groupId: string,
            caption: string,
            mediaUrl: string,
            mediaType: string,
            videoUrl: string,
            latitude,
            longitude,
            state: string,
            isHead: boolean,
            created_at?: string
        }
    ){
        return this.postsService.createPost(body.postId,body.userId, body.groupId,body.caption,body.mediaUrl,body.mediaType,body.videoUrl,body.latitude,body.longitude, body.isHead, body.state, body.created_at)
    }

    @Post('delete')
    async join(
        @Body()
        body: {
            post_id: string,
            post_type: string,
            bucket_path: string
        }
    ){
        return this.postsService.deletePost(body.post_id, body.post_type, body.bucket_path)
    }

    @Post('get')
    async get(
        @Body()
        body: {
            user_id: string,
            created_at: string,
            ended_at: string
        }
    ){
        return this.postsService.getPostsByUserAndDate(body.user_id, body.created_at, body.ended_at)
    }

    
}