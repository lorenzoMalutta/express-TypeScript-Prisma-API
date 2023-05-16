interface User {
    id: number;
    name: string;
    email: string;
    cpf: number;
    password: {
        type: string;
        required: [true, 'Password is required'];
        minlength: [6, 'Password must be at least 6 characters long'];
        select: false;
    };
}

export default User;