"use server";

import db from "@/lib/db";

interface checkIfPostLikedProps {
	userId: string;
	postId: string;
}

interface checkIfCommentLikedProps {
	userId: string;
	commentId: string;
}

export const checkIfPostLiked = async ({
	userId,
	postId,
}: checkIfPostLikedProps) => {
	const like = await db.like.findFirst({
		where: { userId, postId },
	});

	return !!like;
};

export const checkIfCommentLiked = async ({
	userId,
	commentId,
}: checkIfCommentLikedProps) => {
	const like = await db.like.findFirst({
		where: { userId, commentId },
	});

	return !!like;
};
