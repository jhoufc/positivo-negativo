const env = process.env.NODE_ENV || 'dev';
import 'dotenv/config'

const config  = () => {
    return {bdString: process.env.DATABASE_URL, jwtKey: process.env.JWT_SECRET}
}
 export {config};