import db from "@/lib/db";
import { PiHandsClappingLight } from "react-icons/pi";
import LikeComment from "./LikeComment";
import Image from "next/image";

interface ShowCommentsProps {
	postId: string;
}

const ShowComments: React.FC<ShowCommentsProps> = async ({ postId }) => {
	const allComments = await db.comment.findMany({
		where: {
			postId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div>
			{allComments.map((comment) => (
				<div key={comment.id} className="mb-6 border-b pb-4">
					<div className="flex items-center gap-2">
						<Image
							src={comment.authorImage}
							alt="Author Image"
							height={30}
							width={30}
							className="rounded-full"
						/>
						<h2 className="font-bold hover:cursor-pointer hover:underline">
							{comment.authorName}
						</h2>
					</div>
					<p className="text-sm text-gray-500  pl-10">
						{new Date(comment.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<div className="my-2 pl-10 mb-2">{comment.content}</div>
					<div className="flex justify-between">
						<div className="flex items-center text-gray-500 ml-10 gap-1">
							<PiHandsClappingLight />
							{comment.likeCount}
						</div>
						<LikeComment commentId={comment.id} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ShowComments;
