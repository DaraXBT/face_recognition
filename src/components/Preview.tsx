import Image from "next/image";

interface PreviewProps {
  imageSrc: string | null;
}

export default function Preview({imageSrc}: PreviewProps) {
  if (!imageSrc) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-muted rounded-lg">
        <p className="text-muted-foreground">No preview available</p>
      </div>
    );
  }

  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt="Preview"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
