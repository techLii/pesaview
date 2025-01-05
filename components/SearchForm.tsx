'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchForm({ initialSearch = '' }) {
  const [search, setSearch] = useState(initialSearch)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/transactions?search=${encodeURIComponent(search)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

