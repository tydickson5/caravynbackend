import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JWTStrategy } from "src/auth/jwt.strategy";
import { TripService } from "./trips.service";

@Controller('trips')
@UseGuards(JWTStrategy)
export class TripController {
    constructor(
        private tripsService: TripService,
    ) {}

    @Post('start')
    async start(
        @Body()
        body: {
            userId: string,
            username: string,
            name: string,
            description: string,
        }
    ){
        return this.tripsService.startTrip(body.userId, body.username, body.name, body.description)
    }

    @Post('end')
    async end(
        @Body()
        body: {
            tripId: string
        }
    ){
        return this.tripsService.endTrip(body.tripId)
    }

    @Post('update')
    async update(
        @Body()
        body: {
            tripId: string,
            name: string,
            description: string,
            created_at: string,
            ended_at: string,
        }
    ){
        return this.tripsService.updateTrip(body.tripId, body.name, body.description, body.created_at, body.ended_at)
    }
}