import { token } from "@/app/theme";

interface FeatureTagProps {
  text: string;
}

export default function FeatureTag({ text }: FeatureTagProps) {
  if (!text) return null;

  return (
    <div className="absolute top-full left-0 right-0 flex justify-center">
      <div
        className="px-4 py-1 text-xs rounded-b-md shadow-md transform translate-y-[-1px]"
        style={{
          backgroundColor: token.color.lightViolet[700],
          color: token.color.white,
        }}
      >
        {text}
      </div>
    </div>
  );
}
