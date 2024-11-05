"use client";

import { follow } from "@/actions/follow";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { following } from "@/lib/following";
import { getCount } from "@/lib/getCount";

interface ProfileInteractionProps {
	userId: string;
}

const ProfileInteraction = ({ userId }: ProfileInteractionProps) => {
	const [isFollowing, setIsFollowing] = useState(false);
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

	let currentUserId: string = "";

	const user = useUser();

	if (user !== null || user !== undefined)
		currentUserId = user?.user?.id as string;

	useEffect(() => {
		const checkIfFollowing = async () => {
			try {
				const follows = await following({ userId, currentUserId });
				setIsFollowing(follows as boolean);
				const fetchCount = await getCount({ userId });
				setFollowerCount(fetchCount?.followers ?? 0);
				setFollowingCount(fetchCount?.following ?? 0);
			} catch (error) {
				console.log(error);
			}
		};
		checkIfFollowing();
	}, [userId, currentUserId]);

	const handleClick = async () => {
		const result = await follow({ userId, currentUserId });
		if (result?.success) {
			setIsFollowing(!isFollowing);
		}
		const fetchCount = await getCount({ userId });
		setFollowerCount(fetchCount?.followers ?? 0);
		setFollowingCount(fetchCount?.following ?? 0);
	};

	return (
		<div>
			<div className="flex justify-evenly my-6">
				<div>
					<p className="font-semibold">{followingCount}</p>
					<p className="text-gray-500 text-sm">Following</p>
				</div>
				<div>
					<p className="font-semibold">{followerCount}</p>
					<p className="text-gray-500 text-sm">Followers</p>
				</div>
			</div>
			<Button
				className={`rounded-full hover:bg-green-500 ${
					isFollowing ? "bg-green-700 " : "bg-green-500 "
				}`}
				onClick={handleClick}>
				{isFollowing ? "Following" : "Follow"}
			</Button>
		</div>
	);
};

export default ProfileInteraction;
