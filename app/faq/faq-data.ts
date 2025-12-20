export interface FAQQuestion {
  id: string;
  q: string;
  a: string;
}

export interface FAQSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  questions: FAQQuestion[];
}

export const faqSections: FAQSection[] = [
  {
    id: "general",
    title: "General Questions",
    icon: "HelpCircle",
    questions: [
      {
        id: "gen-1",
        q: "What is the World Canine Union?",
        a: "An inclusive dog registration and memorialization platform that celebrates all dogs regardless of breed, pedigree, or background. We focus on the bond between dogs and their families.",
      },
      {
        id: "gen-2",
        q: "How is this different from traditional kennel clubs?",
        a: "We don't require pedigree papers, don't focus on breed standards, and welcome all dogs including rescues, mixed breeds, and special needs dogs. Our focus is on memorialization and celebrating each dog's unique story.",
      },
    ],
  },
  {
    id: "updates",
    title: "Update System",
    icon: "RefreshCw",
    questions: [
      {
        id: "update-1",
        q: "How do I update my dog's information?",
        a: '1. Go to your dog\'s profile page\n2. Click "Request Profile Update"\n3. Enter your WCU number (found on your certificate)\n4. Receive a secure update link via email\n5. Make your changes and submit for review\n6. Admin will review and approve within 24-48 hours',
      },
      {
        id: "update-2",
        q: "What can I update?",
        a: "You can update: Dog's name, breed description, color, birth date and gotcha (adoption) date, rescue story and personality traits, shelter information, photos, and report if your dog has passed away (memorial conversion).",
      },
      {
        id: "update-3",
        q: "How long do updates take to appear?",
        a: "Updates are reviewed by our admin team and typically appear within 24-48 hours after approval. Photo updates may take slightly longer as they require manual processing.",
      },
    ],
  },
  {
    id: "photos",
    title: "Photo Updates",
    icon: "Image",
    questions: [
      {
        id: "photo-1",
        q: "How do I update my dog's photo?",
        a: "When submitting an update request, you can upload a new photo. It will be reviewed by admin and replace the current photo once approved.",
      },
      {
        id: "photo-2",
        q: "What photo formats are accepted?",
        a: "We accept JPG, PNG, and WebP formats. For best results, use high-quality photos with good lighting.",
      },
    ],
  },
  {
    id: "memorial",
    title: "Memorial Conversions",
    icon: "Dog",
    questions: [
      {
        id: "mem-1",
        q: "How do I report that my dog has passed away?",
        a: 'During the update process, select "Report Passing" to convert the profile to a memorial. You can add memorial dates, messages, and favorite memories.',
      },
      {
        id: "mem-2",
        q: "Can I edit a memorial after creation?",
        a: "Yes, you can update memorial information using the same update process. All memorial updates are carefully reviewed.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: "Shield",
    questions: [
      {
        id: "sec-1",
        q: "Is my information secure?",
        a: "Yes. Update requests use secure, single-use links that expire after 24 hours. All changes are logged and require admin approval.",
      },
      {
        id: "sec-2",
        q: "Who can see my dog's information?",
        a: "Dog profiles are public, but owner email addresses are never displayed. Only admins can see contact information.",
      },
    ],
  },
  {
    id: "admin",
    title: "Admin & Moderation",
    icon: "Lock",
    questions: [
      {
        id: "admin-1",
        q: "Who approves the updates?",
        a: "Our dedicated admin team reviews all update requests to ensure accuracy and appropriateness.",
      },
      {
        id: "admin-2",
        q: "What if my update is rejected?",
        a: "You'll receive an email explaining why. Common reasons include incomplete information, inappropriate content, or verification issues.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Issues",
    icon: "FileText",
    questions: [
      {
        id: "tech-1",
        q: "I lost my update link. What do I do?",
        a: "Request a new update link using your WCU number. Old links expire after 24 hours for security.",
      },
      {
        id: "tech-2",
        q: "My WCU number isn't working.",
        a: "Double-check the format (WCU-00000). If it still doesn't work, contact admin with your dog's name and your email address.",
      },
    ],
  },
  {
    id: "certificates",
    title: "Certificate Updates",
    icon: "FileText",
    questions: [
      {
        id: "cert-1",
        q: "Will I get a new certificate after updates?",
        a: "Currently, certificates are not automatically regenerated after updates. Contact admin if you need an updated certificate.",
      },
      {
        id: "cert-2",
        q: "My certificate has wrong information.",
        a: "Use the update system to correct any errors. Once approved, you can request a new certificate if needed.",
      },
    ],
  },
];
