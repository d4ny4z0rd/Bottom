import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { PiHandsClappingLight } from "react-icons/pi";
import Username from "./Username";

interface Post {
	id: string;
	authorName: string;
	title: string;
	headline: string | null;
	authorImage: string;
	createdAt: Date;
	likeCount: number;
	commentCount: number;
	authorId: string;
}

const Posts = async () => {
	let allPosts: Post[] = [];
	const error = "";

	try {
		allPosts = await db.post.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.log(error);
		error = "Failed to fetch the posts.";
	}

	if (error) {
		return <div className="m-10">{error}</div>;
	}

	if (allPosts.length === 0) {
		return (
			<div className="m-10 items-center flex flex-col">
				<div className="font-semibold text-3xl mb-8">No posts available...</div>
				<Image
					src={
						"https://imgs.search.brave.com/YaSIIdUxPC7zQcsfG-p8V6jAMTxRg2RvuJRduST7crs/rs:fit:500:0:0:0/g:ce/aHR0cDovL3d3dy5x/dWlja21lbWUuY29t/L2ltZy8xMi8xMjY0/NzIyMjY4NDZlNjJj/YjE3Mjk1NGE3Yjdh/ZDRjNzY2ODk4MGJm/NzYyZGZkYmI2NmE0/M2YyOTNjMmU0ZmNl/LmpwZw"
					}
					alt="Newton"
					height={500}
					width={500}
					className="rounded-lg"
				/>
			</div>
		);
	}

	return (
		<div className="posts-container mx-96 my-4 p-6">
			<div className="space-y-4">
				{allPosts.map((post) => (
					<div
						className=" p-4 border-b hover:cursor-pointer mb-8"
						key={post.id}>
						<div>
							<div className="text-sm text-center items-center mb-8 cursor-pointer flex">
								<Image
									src={post.authorImage}
									alt="Author Image"
									height={25}
									width={25}
									className="rounded-full mr-2"
								/>
								<Username
									authorId={post.authorId}
									authorName={post.authorName}
								/>
							</div>
						</div>
						<Link href={`/post/${post.id}`}>
							<h2 className="text-xl font-semibold">{post.title}</h2>
							<p className="text-gray-500 text-lg">{post.headline}</p>
							<div className="flex justify-between my-4">
								<div className=" flex gap-1 items-center py-2 ">
									<PiHandsClappingLight className="text-gray-500" />
									<p className="text-gray-500 mt-1 items-center">
										{post.likeCount}
									</p>
									<FaRegComment className="text-gray-500 ml-8" />
									<p className="text-gray-500 mt-1 items-center">
										{post.commentCount}
									</p>
								</div>
								<p className="text-sm text-gray-400 mt-4 text-right">
									{new Date(post.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
