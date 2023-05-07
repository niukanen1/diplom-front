import { AuthError } from "firebase/auth";

export function getAuthError(error: AuthError): string { 
    switch (error.code){ 
        case 'auth/email-already-exists': 
            return "Пользователь с такой почтой уже существует"
        case 'auth/internal-error': 
            return "Внутренняя ошибка, пожалуйста, попробуйте снова"
        case 'auth/invalid-email': 
            return "Неправильный формат электронной почты"
        case 'auth/invalid-password': 
            return 'Неверный пароль'
        case 'auth/user-not-found': 
            return 'Пользователь не найден'
        default: 
            return "Неизвестная ошибка, попробуйте позже"
    }
}