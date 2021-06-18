import dotenv from 'dotenv';
dotenv.config();

export function isDev(): boolean {

    return process.env.VITE_APP_ENV === 'development'

}