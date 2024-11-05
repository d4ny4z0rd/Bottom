"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";
import { postComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import { PiHandsClappingLight } from "react-icons/pi";
import { toggleLike } from "@/actions/toggleLike";
import { checkIfPostLiked } from "@/lib/checkIfLiked";

interface PostCommentProps {
	postId: string;
}

const PostComment: React.FC<PostCommentProps> = ({ postId }) => {
	const router = useRouter();
	const [liked, setLiked] = useState(false);
	const [content, setContent] = useState("");
	const { user } = useUser();
	let clerkUserId: string = "",
		authorName: string,
		authorImage: string;

	if (user !== null || user !== undefined) {
		authorImage = user?.imageUrl as string;
		clerkUserId = user?.id as string;
		authorName = `${user?.firstName} ${user?.lastName}`;
	}

	useEffect(() => {
		const fetchLikeStatus = async () => {
			if (user) {
				const isLiked = await checkIfPostLiked({ userId: clerkUserId, postId });
				setLiked(isLiked);
			}
		};
		fetchLikeStatus();
	}, [user, clerkUserId, postId]);

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			const result = await postComment(
				{
					authorImage,
					authorName,
					postId,
					content,
				},
				clerkUserId
			);

			if (result.success) {
				setContent("");
				router.refresh();
			} else throw new Error(result.error || "Failed to comment on the post");
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async () => {
		try {
			if (!user) return;

			const userId = clerkUserId;

			const result = await toggleLike({ userId, postId });

			if (result.success) {
				setLiked(!liked);
			}
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="my-10 text-right">
			<Textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={3}
				placeholder="Share your thoughts..."
				className="text-lg"
			/>
			<Button
				variant={"ghost"}
				className={`rounded-full mr-4 text-lg ${
					liked
						? "bg-blue-500 hover:bg-blue-500 hover:text-white text-white"
						: ""
				}`}
				onClick={handleLike}>
				Appreciate
				<PiHandsClappingLight />
			</Button>
			<Button
				className="my-4 text-lg bg-green-500 rounded-full"
				onClick={handleClick}>
				Post
			</Button>
		</div>
	);
};

export default PostComment;
