import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import db from "@/lib/db";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { PiHandsClappingLight } from "react-icons/pi";

const page = async ({ params }: { params: { userId: string } }) => {
	const { userId } = await params;

	const allPosts = await db.post.findMany({
		where: {
			authorId: userId,
		},
	});

	if (!userId) {
		return <div>User not found!</div>;
	}

	return (
		<div className="overflow-hidden">
			<Navbar />
			<div className="flex justify-center h-screen w-[60%] ml-96">
				<div className="flex w-full gap-10">
					<div className="font-semibold  w-[60%]">
						{allPosts.map((post) => (
							<div
								className=" p-8 border-b hover:cursor-pointer mb-8"
								key={post.id}>
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
					<div className="flex-1 text-center border-l">
						<Profile userId={userId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
