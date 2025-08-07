export interface AuthenticatedUser {
  role: "admin" | "user";
}

export function getUserFromRequest(req: Request): AuthenticatedUser | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  if (token === process.env.ADMIN_TOKEN) {
    return { role: "admin" };
  }
  if (token === process.env.USER_TOKEN) {
    return { role: "user" };
  }
  return null;
}
