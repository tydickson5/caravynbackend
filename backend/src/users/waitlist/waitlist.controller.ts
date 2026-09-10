import { Body, Controller, Post } from "@nestjs/common";
import { WaitlistedUserService } from "./waitlist.service";
import { emit } from "process";

@Controller('waitlistUser')
export class WaitlistedUsers {
    constructor(private waitlistUserService: WaitlistedUserService){}

    @Post('waitlist')
    waitlistUserByEmail(
        @Body()
        body: {
            email: string,
            betaTesting: boolean,
            bestTravelExperience: string,
            nextTrip: string,
        }
    ){
        return this.waitlistUserService.addUserToWaitlist(body.email, body.betaTesting, body.bestTravelExperience, body.nextTrip)
    }
}