import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import LogoutButton from "@/components/shared/LogoutButton";
import PublicUsers from "@/components/shared/public-users";
import { getMeUser } from "@/lib/user";
import Onboarding from "@/components/shared/onboarding";
import { ArrowRightCircle, GroupIcon, UserRoundSearch, Users2 } from "lucide-react";
import { H1, H2, H3, P } from "@/components/ui/typography";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await getMeUser();

  return (
    <main className="py-12 space-y-10 max-w-7xl mx-auto px-6">
      <H1>Dads & You</H1>
      {session && (
        <>
          <div className="grid grid-cols-2 grid-rows-[1fr_auto_auto] gap-4 max-w-[500px]">
            <Link href="/find-friends">
              <div className="flex flex-col gap-10 bg-blue-800 hover:bg-blue-900 text-white rounded-md p-4">
                <div className="p-2 rounded-xl bg-blue-900 self-start">
                  <UserRoundSearch className="w-8 h-8 stroke-white" />
                </div>
                <div className="space-y-1">
                  <H2 className="text-2xl font-bold">Find friends</H2>
                  <P className="leading-6">Find some friends based on location, interests and more</P>
                </div>
              </div>
            </Link>
            <Link href="/friends">
              <div className="flex flex-col gap-10 bg-green-800 hover:bg-green-900 text-white rounded-md p-4">
                <div className="p-2 rounded-xl bg-green-900 self-start">
                  <GroupIcon className="w-8 h-8 stroke-white" />
                </div>
                <div className="space-y-1">
                  <H2 className="text-2xl font-bold">Find groups</H2>
                  <P className="leading-6">Find groups of dads coming up that are around you</P>
                </div>
              </div>
            </Link>
            <Link href="/friends">
            <div className="flex gap-2 justify-between bg-blue-800 hover:bg-blue-900 text-white rounded-md p-4 items-start">
              <div className="space-y-1">
                <H2 className="text-2xl font-bold m-0 p-0">My friends</H2>
              </div>
              <ArrowRightCircle className="w-8 h-8 stroke-white" />
            </div>
            </Link>
            <Link href="/friends">
            <div className="flex gap-2 justify-between bg-green-800 hover:bg-green-900 text-white rounded-md p-4">
              <div className="space-y-1">
                <H2 className="text-2xl font-bold m-0 p-0">My groups</H2>
              </div>
              <ArrowRightCircle className="w-8 h-8 stroke-white" />
            </div>
            </Link>
            <div className="flex justify-between items-center gap-1 bg-gray-800 text-white rounded-md p-4 col-span-2">
              <div className="space-y-1">
              <H3 className="p-0 m-0">Looking for mental health support?</H3>
              <P className="p-0 !m-0">Reach out to our mental health support team</P>

              </div>
              <ArrowRightCircle className="w-8 h-8 stroke-white" />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
