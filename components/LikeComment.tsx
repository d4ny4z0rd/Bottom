"use client";

import { PiHandsClappingLight } from "react-icons/pi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toggleLike } from "@/actions/toggleLike";
import { useRouter } from "next/navigation";
import { checkIfCommentLiked } from "@/lib/checkIfLiked";

interface LikeCommentProps {
	commentId: string;
}

const LikeComment: React.FC<LikeCommentProps> = ({ commentId }) => {
	const router = useRouter();
	const [liked, setLiked] = useState(false);
	const { user } = useUser();
	let clerkUserId: string = "";

	if (user !== null || user !== undefined) {
		clerkUserId = user?.id as string;
	}

	const handleClick = async () => {
		try {
			if (!commentId) return;

			const userId = clerkUserId;

			const result = await toggleLike({ userId, commentId });

			if (result.success) {
				setLiked(!liked);
			}
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchLikeStatus = async () => {
			if (user) {
				const isLiked = await checkIfCommentLiked({
					userId: clerkUserId,
					commentId,
				});
				setLiked(isLiked);
			}
		};
		fetchLikeStatus();
	}, [user, clerkUserId, commentId]);

	return (
		<div className="text-right">
			<Button
				className={`rounded-full mr-4 ${
					liked
						? "bg-blue-500 hover:bg-blue-500 hover:text-white text-white"
						: ""
				}`}
				variant={"ghost"}
				onClick={handleClick}>
				Appreciate
				<PiHandsClappingLight />
			</Button>
		</div>
	);
};

export default LikeComment;
