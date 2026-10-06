/**
 * Password hashing for KiddoTube's LOCAL-DEVICE accounts.
 *
 * KiddoTube accounts live only in this device's storage (no cloud backend). Passwords are therefore never
 * stored in plaintext: they are salted and stretched with PBKDF2-SHA256 through the Web Crypto API.
 * Nothing in this module logs, transmits, or returns the plaintext password.
 *
 * Stored format:  pbkdf2$<iterations>$<saltBase64>$<hashBase64>
 * Anything not starting with "pbkdf2$" is a legacy plaintext record written by an older app version;
 * it is accepted once and upgraded on a successful login (see AuthContext).
 */

const PREFIX = 'pbkdf2';
const ITERATIONS = 120_000;
const SALT_BYTES = 16;
const HASH_BITS = 256;

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function isHashAvailable(): boolean {
  return typeof crypto !== 'undefined' && !!crypto.subtle;
}

export function isHashedPassword(stored: string): boolean {
  return typeof stored === 'string' && stored.startsWith(`${PREFIX}$`);
}

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: salt as BufferSource, iterations },
    keyMaterial,
    HASH_BITS
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  if (!isHashAvailable()) {
    throw new Error('Secure password storage is unavailable on this device.');
  }
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(password, salt, ITERATIONS);
  return `${PREFIX}$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verifies a password against either a hashed record or a legacy plaintext record. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (!isHashedPassword(stored)) {
    return constantTimeEqual(password, stored);
  }
  try {
    const [, iterations, salt, expected] = stored.split('$');
    const actual = await derive(password, fromBase64(salt), parseInt(iterations, 10));
    return constantTimeEqual(toBase64(actual), expected);
  } catch {
    return false;
  }
}
