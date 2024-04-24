import UserModel, { UserDocument } from 'models/user.model';
import { CreateUserInput } from 'schema/user.schema';

export async function createUser(input: CreateUserInput['body']) {
    try{
        return await UserModel.create(input);
    } catch(error: any) {
        throw new Error(error);
    }
    
}