export interface UserTypes {
    id: string;
    role_id: string; 
    username: string;
    email: string;
    password: string;
    profile_pic?: string; 
    balance: number;
    created_at?: Date; 
    updated_at?: Date; 
}
