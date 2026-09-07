import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/supabaseModule";
import { WaitlistedUsers } from "./waitlist.controller";
import { WaitlistedUserService } from "./waitlist.service";

@Module({
    imports: [SupabaseModule],
    controllers: [
        WaitlistedUsers
    ],
    providers: [
        WaitlistedUserService
    ]
})
export class WaitlistUserModule{}