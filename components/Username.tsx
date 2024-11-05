"use client";

import { useRouter } from "next/navigation";

interface UsernameProps {
	authorName: string;
	authorId: string;
}

const Username: React.FC<UsernameProps> = ({ authorName, authorId }) => {
	const router = useRouter();

	return (
		<h2
			className="hover:underline hover:cursor-pointer"
			onClick={() => router.push(`/user/${authorId}`)}>
			{authorName}
		</h2>
	);
};

export default Username;
