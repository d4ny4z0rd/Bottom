"use server";

import db from "@/lib/db";

interface getCountProps {
	userId: string;
}

export const getCount = async ({ userId }: getCountProps) => {
	try {
		if (!userId) {
			throw new Error("UserId is required to get the count");
		}

		const user = await db.user.findUnique({
			where: {
				clerkUserId: userId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		const followingCount = user?.followingCount,
			followersCount = user?.followersCount;

		return { followers: followersCount, following: followingCount };
	} catch (error) {
		console.log(error);
	}
};
