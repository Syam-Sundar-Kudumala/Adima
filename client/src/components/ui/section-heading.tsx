import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 relative z-10", centered && "text-center", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            {subtitle}
          </p>
        )}
        <div className={cn("h-1 w-24 bg-primary mt-6", centered && "mx-auto")} />
      </motion.div>
    </div>
  );
}
