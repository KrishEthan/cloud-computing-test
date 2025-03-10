"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MusicItem } from "@/types/music"
import Image from "next/image"
import { Music } from "lucide-react"

interface SubscriptionAreaProps {
  subscriptions: MusicItem[]
  onRemove: (id: string) => void
}

export default function SubscriptionArea({ subscriptions, onRemove }: SubscriptionAreaProps) {
  return (
    <Card className="h-[600px] overflow-auto">
      <CardHeader>
        <CardTitle>Your Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Music className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">You haven&apos;t subscribed to any songs yet.</p>
            <p className="text-muted-foreground text-sm mt-2">Use the query area to find and subscribe to music.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={`${item.artist} image`}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                      <Music className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Artist: {item.artist}</p>
                    <p>Album: {item.album}</p>
                    <p>Year: {item.year}</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => onRemove(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

