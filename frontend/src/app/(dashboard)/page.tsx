"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UserArea from "@/components/dashboard/user-area"
import SubscriptionArea from "@/components/dashboard/subscription-area"
import QueryArea from "@/components/dashboard/query-area"
import type { MusicItem } from "@/types/music"
import { getUserSubscriptions, removeSubscription, addSubscription } from "@/lib/subscription-service"

export default function Dashboard() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [subscriptions, setSubscriptions] = useState<MusicItem[]>([])

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/login")
      return
    }

    setUsername(user)

    // Fetch user subscriptions
    const fetchSubscriptions = async () => {
      const userSubs = await getUserSubscriptions(user)
      setSubscriptions(userSubs)
    }

    fetchSubscriptions()
  }, [router])

  const handleRemoveSubscription = async (musicId: string) => {
    await removeSubscription(username, musicId)
    setSubscriptions(subscriptions.filter((item) => item.id !== musicId))
  }

  const handleAddSubscription = async (music: MusicItem) => {
    // Check if already subscribed
    if (subscriptions.some((item) => item.id === music.id)) {
      return
    }

    await addSubscription(username, music)
    setSubscriptions([...subscriptions, music])
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <UserArea username={username} onLogout={handleLogout} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SubscriptionArea subscriptions={subscriptions} onRemove={handleRemoveSubscription} />

        <QueryArea onSubscribe={handleAddSubscription} />
      </div>
    </div>
  )
}

