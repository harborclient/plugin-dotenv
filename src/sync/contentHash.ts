/**
 * Computes a stable SHA-256 hash for `.env` file content.
 *
 * @param content - UTF-8 `.env` file contents.
 */
export async function hashContent(content: string): Promise<string> {
  const buffer = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
