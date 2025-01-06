export interface Provider {
  id: string;
  created_at: string;
  name: string;
  street: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  cancellation_steps: string[];
  issues: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  required_information: {
    fields: Array<{
      name: string;
      description: string;
      required: boolean;
    }>;
  };
  categories?: Category[];
}

export interface Category {
  id: string;
  created_at: string;
  name: string;
}

export interface FormData {
  fullName: string;
  address: string;
  subscriptionId: string;
}

export const mockProviders: Provider[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    created_at: "2024-01-01T00:00:00Z",
    name: "Netflix",
    street: "100 Winchester Circle",
    address_line_2: null,
    city: "Los Gatos",
    state: "CA",
    postal_code: "95032",
    country: "USA",
    cancellation_steps: [
      "Sign in to your Netflix account",
      "Go to Account Settings",
      "Click on Cancel Membership",
      "Confirm cancellation"
    ],
    issues: [
      "Billing issues",
      "Technical problems",
      "Service quality",
      "Price increases"
    ],
    faqs: [
      {
        question: "Will I get a refund for unused time?",
        answer: "Netflix bills monthly and does not provide refunds for partially used months."
      },
      {
        question: "Can I keep watching until the end of my billing period?",
        answer: "Yes, you can continue watching until the end of your current billing period."
      }
    ],
    required_information: {
      fields: [
        {
          name: "email",
          description: "Email address associated with your account",
          required: true
        },
        {
          name: "last_four_digits",
          description: "Last 4 digits of payment method",
          required: true
        },
        {
          name: "subscription_id",
          description: "Your Netflix subscription ID",
          required: false
        }
      ]
    }
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    created_at: "2024-01-01T00:00:00Z",
    name: "Spotify",
    street: "150 Greenwich Street",
    address_line_2: "62nd Floor",
    city: "New York",
    state: "NY",
    postal_code: "10007",
    country: "USA",
    cancellation_steps: [
      "Go to your account page",
      "Select Subscription",
      "Click Change or Cancel",
      "Follow the cancellation flow"
    ],
    issues: [
      "Payment problems",
      "Account access",
      "Subscription changes",
      "Feature availability"
    ],
    faqs: [
      {
        question: "What happens to my playlists after cancellation?",
        answer: "Your playlists will be saved and accessible if you reactivate your premium subscription."
      },
      {
        question: "Can I switch to a free account?",
        answer: "Yes, after cancelling Premium you can continue using Spotify with a free, ad-supported account."
      }
    ],
    required_information: {
      fields: [
        {
          name: "email",
          description: "Email address associated with your account",
          required: true
        },
        {
          name: "username",
          description: "Your Spotify username",
          required: true
        }
      ]
    }
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    created_at: "2024-01-01T00:00:00Z",
    name: "Amazon Prime",
    street: "410 Terry Ave. North",
    address_line_2: null,
    city: "Seattle",
    state: "WA",
    postal_code: "98109",
    country: "USA",
    cancellation_steps: [
      "Sign in to Amazon",
      "Go to Accounts & Lists",
      "Select Prime Membership",
      "Click End Membership",
      "Confirm cancellation"
    ],
    issues: [
      "Delivery problems",
      "Prime Video issues",
      "Membership benefits",
      "Billing concerns"
    ],
    faqs: [
      {
        question: "Will I lose access to Prime Video?",
        answer: "Yes, you'll lose access to Prime Video and other Prime benefits when your subscription ends."
      },
      {
        question: "What about pending Prime deliveries?",
        answer: "Any orders placed before cancellation will still be delivered with Prime shipping."
      }
    ],
    required_information: {
      fields: [
        {
          name: "email",
          description: "Amazon account email",
          required: true
        },
        {
          name: "order_number",
          description: "Recent order number for verification",
          required: false
        }
      ]
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    created_at: "2024-01-01T00:00:00Z",
    name: "Streaming Services"
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    created_at: "2024-01-01T00:00:00Z",
    name: "E-commerce"
  },
  {
    id: "623e4567-e89b-12d3-a456-426614174005",
    created_at: "2024-01-01T00:00:00Z",
    name: "Music"
  }
];