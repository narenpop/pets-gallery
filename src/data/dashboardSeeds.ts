import type { CareTip, GroomingTip } from "../types/pet";

export const careTipSeeds: CareTip[] = [
  {
    id: "care-1",
    title: "Balanced Daily Nutrition",
    category: "Nutrition",
    description:
      "Feed pets age-appropriate food, keep portions consistent, and make fresh water available throughout the day.",
  },
  {
    id: "care-2",
    title: "Routine Exercise",
    category: "Fitness",
    description:
      "Schedule daily walks, play sessions, or enrichment activities to support healthy weight and reduce anxiety.",
  },
  {
    id: "care-3",
    title: "Preventive Vet Care",
    category: "Health",
    description:
      "Track vaccinations, parasite prevention, and regular wellness visits to catch issues early.",
  },
];

export const groomingTipSeeds: GroomingTip[] = [
  {
    id: "groom-1",
    title: "Brush the Coat Regularly",
    petType: "Dog",
    frequency: "2-3 times per week",
    description:
      "Frequent brushing removes loose fur, prevents mats, and keeps the coat healthy and shiny.",
  },
  {
    id: "groom-2",
    title: "Clean Ears Gently",
    petType: "Cat",
    frequency: "Every 2 weeks",
    description:
      "Use a pet-safe ear cleaner and avoid inserting anything deep into the ear canal.",
  },
  {
    id: "groom-3",
    title: "Trim Nails Carefully",
    petType: "Dog/Cat",
    frequency: "Every 3-4 weeks",
    description:
      "Trim only the tip of the nail and stop if your pet becomes stressed or uncomfortable.",
  },
];
