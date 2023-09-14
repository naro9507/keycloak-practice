"use client";
import { useSetUser, useUser } from "@/app/recoil/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });
  const user = useUser();
  const updateUser = useSetUser();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return;
    }

    updateUser({
      id: session.user.id,
      name: session.user.name ?? undefined,
      email: session.user.email,
    });
  }, [session, updateUser]);

  if (!user) {
    return <></>;
  }

  return <main>{children}</main>;
}
