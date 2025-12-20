import * as bcrypt from 'bcrypt';

export class PasswordUtil {

    static async hash(password: string): Promise<string> {
        const SALT_ROUNDS = 10;
        return bcrypt.hash(password, SALT_ROUNDS)
    }

    static async compare(plain: string, heshed: string): Promise<boolean> {
        return bcrypt.compare(plain, heshed);
    }
}
