import type { Testimonial } from "@/types/content";

/**
 * APPROVED TESTIMONIALS ONLY.
 *
 * This list is intentionally empty. Add a testimonial only when the customer
 * has approved the exact quote, their name, role and company name in writing.
 * While the list is empty the site shows the "Built for the realities of
 * clearing & forwarding" section instead — nothing is fabricated.
 *
 * Example shape (do not publish placeholder content):
 * {
 *   quote: "…",
 *   name: "…",
 *   role: "…",
 *   company: "…",
 *   approved: true,
 * }
 */
export const testimonials: Testimonial[] = [];
