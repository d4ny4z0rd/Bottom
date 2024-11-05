import db from "@/lib/db";

interface findUserProps {
	userId: string;
}

export const findUser = async ({ userId }: findUserProps) => {
	try {
		let user;

		if (userId !== null && userId !== undefined)
			user = await db.user.findFirst({
				where: {
					clerkUserId: userId,
				},
			});

		return user;
	} catch (error) {
		console.log(error);
	}
};
