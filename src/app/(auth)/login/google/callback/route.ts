import { cookies } from "next/headers";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { google, lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { redirects } from "@/lib/constants";
import { users } from "@/server/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
      headers: { Location: redirects.toLogin },
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUserRes = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser = (await googleUserRes.json()) as googleUser;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, googleUser.email));

    const user = existingUser[0];

    const avatar = googleUser.picture ? googleUser.picture : null;

    if (!user) {
      const userId = generateId(21);
      await db.insert(users).values({
        id: userId,
        email: googleUser.email,
        emailVerified: true,
        googleId: googleUser.sub,
        name: googleUser.name,
        avatar,
      });
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: { Location: redirects.afterLogin },
      });
    }

    if (user.googleId !== googleUser.sub || user.avatar !== avatar) {
      await db
        .update(users)
        .set({
          googleId: googleUser.sub,
          emailVerified: true,
          avatar,
        })
        .where(eq(users.id, user.id));
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: { Location: redirects.afterLogin },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
}

interface googleUser {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
}
