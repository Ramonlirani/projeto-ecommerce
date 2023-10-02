import Image from "next/image";

interface AvatarProps {
  name: string;
  photoUrl?: string | null;
}

function extractInitials(name: string) {
  if (!name) return "";
  const nameParts = name.split(" ");

  if (nameParts.length === 1) {
    const firstName = nameParts[0];
    return firstName.substring(0, 2).toUpperCase();
  }

  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");

  return initials;
}
export function Avatar({ name, photoUrl }: AvatarProps) {
  const initials = extractInitials(name);
  return (
    <>
      {!photoUrl ? (
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
          <span className="text-lg font-medium leading-none text-white">
            {initials}
          </span>
        </span>
      ) : (
        <Image
          className="inline-block h-16 w-16 rounded-full object-cover object-top"
          src={photoUrl}
          alt="Foto de perfil"
          width={200}
          height={200}
        />
      )}
    </>
  );
}
