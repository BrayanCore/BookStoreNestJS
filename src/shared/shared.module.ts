import { Module } from "@nestjs/common";
import { MapperService } from "./mapper.service";

@Module({
    controllers: [],
    imports: [],
    providers: [
        MapperService
    ],
    exports: [
        MapperService
    ]
})
export class SharedModule {}