import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

// import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    constructor(configService:ConfigService) {
        console.log(configService.get("JWT_SECRET"))
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey:configService.get("JWT_SECRET")})
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        
        console.log("inside validate function")
        
        return { userId: payload.sub, email: payload.email };

    }

}