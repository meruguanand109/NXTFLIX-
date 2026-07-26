export async function signIn(email: string, password: string) {
  const res = await fetch("https://serverless-api-teal.vercel.app/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body?.success === false) {
    throw new Error(body?.message || body?.error || "Sign in failed");
  }
  const token =
    body?.jwt_token ||
    body?.token ||
    body?.jwtToken ||
    body?.data?.token ||
    body?.data?.jwt_token ||
    body?.data?.jwtToken;
  if (!token) throw new Error("No token returned");
  return { token, user: body?.data?.user };
}
