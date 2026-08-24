import { Module } from "@nestjs/common";
import { NotificationsModule } from "src/apn/notifications.module";
import { SupabaseModule } from "src/supabaseModule";
import { TripController } from "./trips.controller";
import { TripService } from "./trips.service";

@Module({
    imports: [SupabaseModule, NotificationsModule],
    controllers: [
        TripController
    ],
    providers: [
        TripService
    ]
})

export class TripModule{}