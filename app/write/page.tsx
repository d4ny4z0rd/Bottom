"use client";

import { publishPost } from "@/actions/publish";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [headline, setHeadline] = useState("");
	const [error, setError] = useState("");
	const { user } = useUser();
	let clerkUserId: string, authorName: string, authorImage: string;

	if (user !== undefined || user !== null) {
		clerkUserId = user?.id as string;
		authorName = `${user?.firstName} ${user?.lastName}` as string;
		authorImage = user?.imageUrl as string;
	}

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const result = await publishPost(
				{ title, description, headline, authorName, authorImage },
				clerkUserId
			);

			if (result.success) {
				router.push("/");
				setError("");
				setTitle("");
				setHeadline("");
				setDescription("");
			} else throw new Error(result.error || "Failed to publish the post");
		} catch (error: any) {
			const message = error.message.replace(/^Error:\s*/, "");
			setError(message);
		}
	};

	return (
		<div className="flex py-20 min-h-screen px-96">
			<div className="bg-white rounded-lg p-8  w-full">
				<form className="space-y-4">
					<div>
						<Input
							value={title}
							className="border-0 text-3xl p-10"
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<Input
							value={headline}
							className="border-0 text-3xl p-10"
							placeholder="Make a headline"
							onChange={(e) => setHeadline(e.target.value)}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Textarea
							value={description}
							placeholder="Tell your story..."
							className="text-2xl border-0"
							rows={10}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					{error && <div className="text-red-500 text-lg">{error}</div>}
					<Button
						className="p-6 text-xl rounded-3xl bg-green-400"
						onClick={handleClick}>
						Publish
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Page;
