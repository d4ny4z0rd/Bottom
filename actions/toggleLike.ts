"use server";

import db from "@/lib/db";

interface LikeData {
	userId: string;
	postId?: string;
	commentId?: string;
}

export async function toggleLike({ userId, postId, commentId }: LikeData) {
	try {
		if (postId) {
			const existingLike = await db.like.findFirst({
				where: { userId, postId },
			});

			if (existingLike) {
				await db.like.delete({ where: { id: existingLike.id } });
				await db.post.update({
					where: { id: postId },
					data: { likeCount: { decrement: 1 } },
				});
			} else {
				await db.like.create({
					data: { userId, postId },
				});
				await db.post.update({
					where: { id: postId },
					data: { likeCount: { increment: 1 } },
				});
			}
		} else if (commentId) {
			const existingLike = await db.like.findFirst({
				where: { userId, commentId },
			});

			if (existingLike) {
				await db.like.delete({
					where: { id: existingLike.id },
				});
				await db.comment.update({
					where: { id: commentId },
					data: {
						likeCount: { decrement: 1 },
					},
				});
			} else {
				await db.like.create({
					data: { userId, commentId },
				});
				await db.comment.update({
					where: { id: commentId },
					data: { likeCount: { increment: 1 } },
				});
			}
		}
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false, error: "Failed to toggle the like" };
	}
}
