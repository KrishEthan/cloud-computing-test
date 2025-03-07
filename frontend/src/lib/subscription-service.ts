import type { MusicItem } from "@/types/music";

// Mock DynamoDB for user subscriptions
const userSubscriptions: Record<string, MusicItem[]> = {
  // Add some initial subscriptions for demo purposes
  demo: [
    {
      id: "1",
      title: "Come Monday",
      artist: "Jimmy Buffett",
      album: "Living and Dying in 3/4 Time",
      year: "1974",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "5",
      title: "Love Story",
      artist: "Taylor Swift",
      album: "Fearless",
      year: "2008",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ],
};

// Simulate a delay to mimic API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUserSubscriptions(
  username: string
): Promise<MusicItem[]> {
  // Simulate network delay
  await delay(500);

  // Return user's subscriptions or empty array if none
  return userSubscriptions[username] || [];
}

export async function addSubscription(
  username: string,
  music: MusicItem
): Promise<void> {
  // Simulate network delay
  await delay(500);

  // Initialize user's subscriptions array if it doesn't exist
  if (!userSubscriptions[username]) {
    userSubscriptions[username] = [];
  }

  // Check if already subscribed
  const isAlreadySubscribed = userSubscriptions[username].some(
    (item) => item.id === music.id
  );

  if (!isAlreadySubscribed) {
    // Add to subscriptions
    userSubscriptions[username].push(music);
  }
}

export async function removeSubscription(
  username: string,
  musicId: string
): Promise<void> {
  // Simulate network delay
  await delay(500);

  // Remove from subscriptions if user exists
  if (userSubscriptions[username]) {
    userSubscriptions[username] = userSubscriptions[username].filter(
      (item) => item.id !== musicId
    );
  }
}
