export class validateUserInputProvider {
    public async validateInput(name: string, email: string, cpf: string, password: string) {
        try {
            if (!password) throw new Error("Password is required.");
            if (password.length < 6) throw new Error("Password must have at least 6 characters.");
            if (password === password.toLowerCase()) throw new Error("Password must have at least 1 uppercase character.");
            if (!name) throw new Error("Name is required.");
            if (name.length < 3) throw new Error("Name must have at least 3 characters.");
            if (!email) throw new Error("Email is required.");
            if (!email.includes("@")) throw new Error("Email must have @.");
            if (!cpf) throw new Error("Cpf is required.");
            if (cpf.length !== 11) throw new Error("Cpf must have 11 digits.");
            if (cpf.length < 0) throw new Error("Cpf must be a positive number.");
            if (!/^\d+$/.test(cpf)) throw new Error("Cpf must contain only digits.");
            return { name, email, cpf, password };
        } catch (error) {
            console.error("Error validating input:", error);
            throw new Error("Failed to validate input.");
        }
    }
}