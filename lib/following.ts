"use server";

import db from "@/lib/db";

interface followingProps {
	userId: string;
	currentUserId: string;
}

export const following = async ({ userId, currentUserId }: followingProps) => {
	try {
		if (!userId || !currentUserId) {
			throw new Error("Both userId and currentUserId are required");
		}
		const user = await db.user.findUnique({
			where: {
				clerkUserId: currentUserId,
			},
		});

		if (!user) {
			return false;
		}

		const isFollowing = user.following
			? user.following.includes(userId)
			: false;
		console.log(isFollowing);

		return isFollowing;
	} catch (error) {
		console.log(error);
		return false;
	}
};
