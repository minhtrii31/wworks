import type { CoverLetterResult, GuideStep } from "./types"

export const MOCK_COVER_LETTER: Omit<CoverLetterResult, "companyName" | "jobTitle"> = {
  content: `Dear Hiring Manager,

I am excited to apply for the Full Stack Developer position at Acme Corp. With over three years of hands-on experience building production-grade web applications using React, Node.js, and TypeScript, I am confident that my skills align closely with your team's needs.

In my most recent role at TechStart, I led the development of a customer-facing dashboard that reduced support tickets by 35% and improved user retention by 20%. I have a strong background in REST API design, database optimization with MongoDB, and deploying containerized services on AWS.

What draws me to Acme Corp is your commitment to building scalable, user-first products. I thrive in collaborative environments and have a proven track record of bridging the gap between product design and engineering execution.

I would welcome the opportunity to discuss how my background and passion for clean, maintainable code can contribute to your team. Thank you for your time and consideration.

Sincerely,
[Your Name]`,
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    number: "01",
    title: "Fill in the details",
    description:
      "Enter the company name, job title, and paste the job description to give the AI full context for your letter.",
  },
  {
    number: "02",
    title: "AI writes your letter",
    description:
      "The model crafts a personalized, professional cover letter tailored to the role and company in seconds.",
  },
  {
    number: "03",
    title: "Copy or download",
    description:
      "Review the generated letter, copy it to your clipboard, or download it as a plain-text file ready to submit.",
  },
]
