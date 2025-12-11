import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const cookies = request.cookies;
		
		// If refresh token already exists, return success
		if (cookies.get("refreshToken")) {
			return NextResponse.json({ success: true });
		}

		const wixClient = createClient({
			auth: OAuthStrategy({
				clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
			}),
		});

		const tokens = await wixClient.auth.generateVisitorTokens();
		
		const response = NextResponse.json({ success: true });
		response.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		});

		return response;
	} catch (error) {
		console.error("Error generating visitor tokens:", error);
		return NextResponse.json(
			{ error: "Failed to generate visitor tokens" },
			{ status: 500 }
		);
	}
}

