import { createFileRoute } from '@tanstack/react-router'
import Hero from "#/components/layout/hero"
import Navbar from "#/components/static/Header"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  )
}
