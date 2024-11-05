"use server";

import db from "@/lib/db";

interface deletePostProps {
	postId: string;
}

export const deletePost = async ({ postId }: deletePostProps) => {
	try {
		if (!postId) {
			throw new Error("postId required to delete the post");
		}

		await db.post.delete({
			where: {
				id: postId,
			},
		});

		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
};
