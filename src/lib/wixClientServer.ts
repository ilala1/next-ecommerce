import { OAuthStrategy, TokenRole, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
// import { orders } from "@wix/ecom";
import { cookies } from "next/headers";
import { members } from '@wix/members';

const emptyTokens = {
  accessToken: { value: "", expiresAt: 0 },
  refreshToken: { value: "", role: TokenRole.NONE },
};

export const wixClientServer = async () => {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID?.trim();
  if (!clientId) {
    throw new Error(
      "NEXT_PUBLIC_WIX_CLIENT_ID is missing or empty. Add it under Vercel Project Settings → Environment Variables for Production and Preview, then redeploy."
    );
  }

  let refreshToken = emptyTokens.refreshToken;

  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get("refreshToken")?.value;
    if (raw) {
      const parsed = JSON.parse(raw) as { value?: string; role?: TokenRole };
      if (parsed && typeof parsed === "object" && parsed.value) {
        refreshToken = {
          value: parsed.value,
          role: parsed.role ?? TokenRole.VISITOR,
        };
      }
    }
  } catch {
    refreshToken = emptyTokens.refreshToken;
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
    //   orders,
      members,
    },
    auth: OAuthStrategy({
      clientId,
      tokens: {
        refreshToken,
        accessToken: emptyTokens.accessToken,
      },
    }),
  });

  return wixClient;
};