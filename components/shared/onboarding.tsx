import { getMeUser } from "@/lib/user";

export default async function Onboarding() {
  const user = await getMeUser();

  async function updateUser(formData: FormData) {
    "use server";
    console.log(formData);
  }

  return <div>
    Let's get you set up

    <form action={updateUser}>
      <input type="text" name="name" />

      <button type="submit">Save</button>
    </form>
  </div>;
}