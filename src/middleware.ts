import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
	// Middleware runs on Edge Runtime, so we can't use Wix SDK here
	// Visitor token generation is handled by API route /api/auth/visitor
	// This middleware just passes through
	return NextResponse.next();
};
