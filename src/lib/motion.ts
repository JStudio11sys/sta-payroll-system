// Shared animation presets (same feel as EduLink).
export const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;
export const softSpring = { type: "spring", stiffness: 240, damping: 30 } as const;
export const snappy = { type: "spring", stiffness: 560, damping: 38 } as const;
export const easeOutExpo = [0.32, 0.72, 0, 1] as const;

export const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
export const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: softSpring },
};
