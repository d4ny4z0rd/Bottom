import Navbar from "@/components/Navbar";
import PostComment from "@/components/PostComment";
import ShowComments from "@/components/ShowComments";
import db from "@/lib/db";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
import Username from "@/components/Username";
import DeletePostButton from "@/components/DeletePostButton";
import { auth } from "@clerk/nextjs/server";

const Page = async ({ params }: { params: { postId: string } }) => {
	const { postId } = await params;

	const { userId } = await auth();

	const post = await db.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		return <div className="m-10">Post not found.</div>;
	}

	const isAuthor = userId === post.authorId;

	return (
		<div>
			<Navbar />
			<div className="post-details-container mx-60 my-4 p-6">
				<h1 className="text-3xl font-bold mb-4 flex justify-between">
					<div>{post.title}</div>
					{isAuthor && <DeletePostButton postId={post.id} />}
				</h1>
				<p className="text-gray-500 text-lg mb-4">{post.headline}</p>
				<div className="s mb-8">
					<div className="flex items-center gap-2 mt-8">
						<Image
							src={post.authorImage}
							alt="Author Image"
							height={30}
							width={30}
							className="rounded-full"
						/>
						<Username authorId={post.authorId} authorName={post.authorName} />
					</div>
					<p className="text-gray-500 text-sm text-right mb-8">
						{new Date(post.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<div className=" flex gap-1 items-center px-10 py-2">
						<PiHandsClappingLight className="text-gray-500" />
						<p className="text-gray-500 mt-1 items-center">{post.likeCount}</p>
						<FaRegComment className="text-gray-500 ml-8" />
						<p className="text-gray-500 mt-1 items-center">
							{post.commentCount}
						</p>
					</div>
				</div>
				<div className="text-gray-700 text-base leading-relaxed">
					{post.description}
				</div>
				<PostComment postId={postId} />
				<ShowComments postId={postId} />
			</div>
		</div>
	);
};

export default Page;
