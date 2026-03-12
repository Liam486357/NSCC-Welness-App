import { Buffer } from 'buffer';

// Ensure this is 32 characters long for AES-256
const DEMO_ENCRYPTION_KEY = import.meta.env.VITE_JOURNAL_ENCRYPTION_KEY || 'nscc_wellness_default_key_32chars!';

/**
 * Derives a CryptoKey from a string password.
 */
async function getKey(password) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    // We use a static salt for demo purposes so the same password always yields the same key
    const salt = enc.encode("nscc_wellness_salt");

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypts a string using AES-256-GCM.
 * Returns a Base64 string combining the IV and the Ciphertext
 */
export async function encryptJournal(plainText) {
    if (!plainText) return "";

    const key = await getKey(DEMO_ENCRYPTION_KEY);
    const enc = new TextEncoder();

    // AES-GCM requires a unique Initialization Vector per encryption
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const cipherTextBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(plainText)
    );

    // Combine IV and Ciphertext so we can decrypt later
    const cipherTextArray = new Uint8Array(cipherTextBuffer);
    const combined = new Uint8Array(iv.length + cipherTextArray.length);
    combined.set(iv);
    combined.set(cipherTextArray, iv.length);

    // Return as Base64 string for safe database storage
    return Buffer.from(combined).toString('base64');
}

/**
 * Decrypts a Base64 string using AES-256-GCM.
 */
export async function decryptJournal(base64CipherText) {
    if (!base64CipherText) return "";

    try {
        const key = await getKey(DEMO_ENCRYPTION_KEY);
        const combined = new Uint8Array(Buffer.from(base64CipherText, 'base64'));

        // Extract the IV (first 12 bytes) and the actual ciphertext
        const iv = combined.slice(0, 12);
        const cipherText = combined.slice(12);

        const plainTextBuffer = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            cipherText
        );

        const dec = new TextDecoder();
        return dec.decode(plainTextBuffer);
    } catch (e) {
        console.error("Decryption failed:", e);
        return "[Encrypted Entry - Cannot Decrypt]";
    }
}
