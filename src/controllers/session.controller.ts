import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import config from "../../config/default";

export async function createUserSessionHandler(req: Request, res: Response){
    const user = await validatePassword(req.body);

    if(!user) {
        return res.status(401).send("Invalid email or password");
    }

    const session = createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
        {
            ...user,
            session: (await session)._id
        },
        { 
            expiresIn: config.accessTokenTtl 
        }
    );

    const refreshToken = signJwt(
        {
            ...user,
            session: (await session)._id
        },
        { 
            expiresIn: config.refreshTokenTtl 
        }
    );

    return res.send({ accessToken, refreshToken })
}