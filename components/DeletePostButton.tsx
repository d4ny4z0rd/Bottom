"use client";

import { deletePost } from "@/lib/deletePost";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
	postId: string;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
	const router = useRouter();
	const handleClick = async () => {
		try {
			const result = await deletePost({ postId });
			if (result.success) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Button
				variant={"destructive"}
				className="rounded-full text-lg"
				onClick={handleClick}>
				Delete
			</Button>
		</div>
	);
};

export default DeletePostButton;
