// components/TechIcons.tsx (client)
"use client";
import AnimatedTooltip from "./animated-tooltip";

export default function TechIcons({ techIcons }: { techIcons: { tech: string; url?: string }[] }) {
  const items = techIcons.slice(0, 3).map((icon, index) => ({
    id: index,
    name: icon.tech,
    image: icon.url ?? "/tech.svg",
  }));

  return <AnimatedTooltip className="flex-row" items={items} />;
}
