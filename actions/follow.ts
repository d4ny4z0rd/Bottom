"use server";

import db from "@/lib/db";

interface followProps {
	userId: string;
	currentUserId: string;
}

export const follow = async ({ userId, currentUserId }: followProps) => {
	try {
		if (userId === currentUserId) {
			throw new Error("UserId and TargetUserId are same");
		}

		const currentUser = await db.user.findUnique({
			where: { clerkUserId: currentUserId },
		});

		const targetUser = await db.user.findUnique({
			where: {
				clerkUserId: userId,
			},
		});

		if (!currentUser || !targetUser) {
			throw new Error("User not found");
		}

		const isFollowing = currentUser.following.includes(userId);

		if (isFollowing) {
			await db.user.update({
				where: {
					clerkUserId: currentUserId,
				},
				data: {
					following: {
						set: currentUser.following.filter((id) => id !== userId),
					},
					followingCount: {
						decrement: 1,
					},
				},
			});

			await db.user.update({
				where: {
					clerkUserId: userId,
				},
				data: {
					followers: {
						set: targetUser.followers.filter((id) => id !== currentUserId),
					},
					followersCount: {
						decrement: 1,
					},
				},
			});
		} else {
			await db.user.update({
				where: {
					clerkUserId: currentUserId,
				},
				data: {
					following: {
						set: [...currentUser.following, userId],
					},
					followingCount: {
						increment: 1,
					},
				},
			});

			await db.user.update({
				where: {
					clerkUserId: userId,
				},
				data: {
					followers: {
						set: [...targetUser.followers, currentUserId],
					},
					followersCount: {
						increment: 1,
					},
				},
			});
		}
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
};
