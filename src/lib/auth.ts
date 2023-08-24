export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret.length == 0) {
        throw new Error("Secret is not defined in env file")
    }
    return secret;
}