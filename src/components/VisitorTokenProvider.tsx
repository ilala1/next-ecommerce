"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function VisitorTokenProvider() {
	useEffect(() => {
		// Check if refresh token exists
		const refreshToken = Cookies.get("refreshToken");
		
		if (!refreshToken) {
			// Generate visitor token via API route
			fetch("/api/auth/visitor")
				.catch((error) => {
					console.error("Failed to generate visitor token:", error);
				});
		}
	}, []);

	return null;
}

