import { useState } from "react";

export default function InputField({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  placeholder: string;
  type?: string;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-patrick text-black/80">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder={placeholder}
        className={`
          px-4 py-3 border-2 border-black rounded-lg font-patrick shadow-[2px_2px_0px_rgba(0,0,0,0.25)]
          transition-all duration-200 transform
          focus:outline-none focus:ring-0 focus:border-black
          ${value || isActive ? "scale-105 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]" : ""}
        `}
      />
    </div>
  );
}
