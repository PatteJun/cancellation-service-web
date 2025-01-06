export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "Netflix",
    industry: "Entertainment",
    address: "100 Winchester Circle, Los Gatos, CA 95032, USA",
    email: "support@netflix.com",
    phone: "1-888-373-8390",
    cancellationRules: {
      noticePeriod: "Cancel anytime. Changes take effect at the end of your billing period.",
      requiredInfo: "Account email and last 4 digits of payment method",
      confirmationProcess: "Immediate confirmation via email"
    },
    faqs: [
      {
        question: "Will I get a refund for unused time?",
        answer: "Netflix bills monthly and does not provide refunds for partially used months."
      },
      {
        question: "Can I keep watching until the end of my billing period?",
        answer: "Yes, you can continue watching until the end of your current billing period."
      }
    ]
  },
  {
    id: 2,
    name: "Spotify",
    industry: "Music Streaming",
    address: "4 World Trade Center, 150 Greenwich Street, 62nd Floor, New York, NY 10007",
    email: "support@spotify.com",
    phone: "1-800-SPOTIFY",
    cancellationRules: {
      noticePeriod: "Cancel anytime before next billing date",
      requiredInfo: "Account email and username",
      confirmationProcess: "Email confirmation within 24 hours"
    },
    faqs: [
      {
        question: "What happens to my playlists after cancellation?",
        answer: "Your playlists will be saved and accessible if you reactivate your premium subscription."
      },
      {
        question: "Can I switch to a free account?",
        answer: "Yes, after cancelling Premium you can continue using Spotify with a free, ad-supported account."
      }
    ]
  },
  {
    id: 3,
    name: "Amazon Prime",
    industry: "E-commerce & Entertainment",
    address: "410 Terry Ave. North, Seattle, WA 98109",
    email: "prime@amazon.com",
    phone: "1-888-280-4331",
    cancellationRules: {
      noticePeriod: "Cancel anytime with prorated refund for annual subscriptions",
      requiredInfo: "Amazon account email and password",
      confirmationProcess: "Immediate confirmation on website"
    },
    faqs: [
      {
        question: "Will I lose access to Prime Video?",
        answer: "Yes, you'll lose access to Prime Video and other Prime benefits when your subscription ends."
      },
      {
        question: "What about pending Prime deliveries?",
        answer: "Any orders placed before cancellation will still be delivered with Prime shipping."
      }
    ]
  }
];

export interface Company {
  id: number;
  name: string;
  industry: string;
  address: string;
  email: string;
  phone: string;
  cancellationRules: {
    noticePeriod: string;
    requiredInfo: string;
    confirmationProcess: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface FormData {
  fullName: string;
  address: string;
  subscriptionId: string;
}