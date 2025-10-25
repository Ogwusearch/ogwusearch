import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

/**
 * Card Component
 * Reusable motion-animated container with consistent styles.
 *
 * Usage:
 * <Card>
 *   <CardHeader>...</CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 */

export const Card = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm shadow-md hover:shadow-cyan-500/10 transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

export const CardHeader = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 border-b border-neutral-800", className)}>
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold text-cyan-400", className)}>
    {children}
  </h3>
);

export const CardContent = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 text-sm text-neutral-300", className)}>
    {children}
  </div>
);

export const CardFooter = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 border-t border-neutral-800 text-neutral-400", className)}>
    {children}
  </div>
);
