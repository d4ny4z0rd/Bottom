"use server";

import db from "@/lib/db";

interface CommentData {
	content: string;
	authorName: string;
	authorImage: string;
	postId: string;
}

interface PublishCommentResponse {
	success: boolean;
	comment?: {
		content: string;
		authorName: string;
		authorImage: string;
		postId: string;
		authorId: string;
	};
	error?: string;
}

export const postComment = async (
	data: CommentData,
	clerkUserId: string
): Promise<PublishCommentResponse> => {
	try {
		const { content, authorName, authorImage, postId } = data;

		if (!content || !authorImage || !authorName || !postId) {
			throw new Error("All properties are required to comment on a post");
		}

		const comment = await db.comment.create({
			data: {
				content,
				authorImage,
				authorName,
				authorId: clerkUserId,
				postId,
			},
		});

		await db.post.update({
			where: { id: postId },
			data: { commentCount: { increment: 1 } },
		});

		return {
			success: true,
			comment: {
				content: comment.content,
				authorId: comment.authorId,
				authorImage: comment.authorImage,
				authorName: comment.authorName,
				postId: comment.postId,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			error: error as string,
		};
	}
};
