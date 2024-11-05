"use server";

import db from "@/lib/db";

interface PostData {
	title: string;
	headline?: string;
	description: string;
	authorName: string;
	authorImage: string;
}

interface PublishPostResponse {
	success: boolean;
	post?: {
		title: string;
		description: string;
		authorId: string;
		authorName: string;
		headline?: string;
		authorImage: string;
	};
	error?: string;
}

export const publishPost = async (
	data: PostData,
	clerkUserId: string
): Promise<PublishPostResponse> => {
	try {
		const { title, description, headline, authorName, authorImage } = data;

		if (!title || !description || !authorName || !authorImage)
			throw new Error("Post title and post description are required.");

		const post = await db.post.create({
			data: {
				title,
				description,
				authorId: clerkUserId,
				headline: headline,
				authorName,
				authorImage,
			},
		});

		return {
			success: true,
			post: {
				title: post.title,
				description: post.description,
				authorId: post.authorId,
				authorName: post.authorName,
				headline: post.headline as string,
				authorImage,
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
