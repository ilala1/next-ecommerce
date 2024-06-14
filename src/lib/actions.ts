"use server";

import { wixClientServer } from "./wixClientServer";
import { members } from "@wix/members";

export const updateUser = async (formData: FormData) => {
	const wixClient = await wixClientServer();

	const id = formData.get("id") as string;
	const username = formData.get("username") as string;
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const email = formData.get("email") as string;
	const phone = formData.get("phone") as string;

	const user = await wixClient.members.getCurrentMember({
		fieldsets: [members.Set.FULL],
	});

	try {
		const response = await wixClient.members.updateMember(id, {
			contact: {
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				phones: phone ? [phone] : user.member?.contact?.phones,
			},
			loginEmail: email || undefined,
			profile: { nickname: username || undefined },
		});

		console.log(response);
	} catch (err) {
		console.log(err);
	}
};
