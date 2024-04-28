import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "../../config/default";

export async function createSession(userId: string, userAgent: string){
    const session = await SessionModel.create({user: userId, userAgent});

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken}: {refreshToken: string}){
    const { decoded } = verifyJwt(refreshToken);

    if(!decoded || !get(decoded, 'session')) {
        throw new Error("Invalid token or id not found.");
    }

    const session = await SessionModel.findById(get(decoded, 'session'));

    if(!session || !session.valid){
        throw new Error("No session found or session is invalid");
    }

    const user = await findUser({ _id: session.user });

    if(!user) {
        throw new Error("User not found.");
    }

    const accessToken = signJwt(
        {
            ...user,
            session: (await session)._id
        },
        { 
            expiresIn: config.accessTokenTtl 
        }
    );

    return accessToken;

}