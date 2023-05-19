import bcrypt from 'bcrypt';
export class HashPasswordProvider {
    public async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}