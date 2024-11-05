import { findUser } from "@/lib/findUser";
import Image from "next/image";
import ProfileInteraction from "./ProfileInteraction";

interface ProfileProps {
	userId: string;
}

const Profile = async ({ userId }: ProfileProps) => {
	const user = await findUser({ userId });

	return (
		<div>
			<div className=" p-4 mt-10">
				<div className="items-center flex flex-col">
					<Image
						src={user?.imageUrl as string}
						alt="User Image"
						height={100}
						width={100}
						className="rounded-full"
					/>
					<h2 className="mt-6 font-semibold text-lg">{user?.name}</h2>
					<p className="text-gray-500">{user?.email}</p>
				</div>
			</div>
			<div className=" mt-8">
				<ProfileInteraction userId={userId} />
			</div>
		</div>
	);
};

export default Profile;
