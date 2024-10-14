import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/prisma";
import { getMeUser } from "@/lib/user";

export default async function PublicUsers() {
  const user = await getMeUser();

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: user?.id,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      // Add any other fields you want to display
    },
  });

  console.log("users", users);

  return (
    <div>
      <h2>Public Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
