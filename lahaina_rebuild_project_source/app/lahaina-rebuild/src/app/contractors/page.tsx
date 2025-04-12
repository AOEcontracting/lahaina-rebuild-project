import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

export default function Contractors() {
  // Mock data for contractors
  const contractors = [
    {
      id: 1,
      name: "David Kealoha",
      company: "Kealoha Electric",
      avatar: "/avatars/david.jpg",
      rating: 4.9,
      reviews: 27,
      specialties: ["Residential", "Commercial", "Solar"],
      verified: true,
      description: "Licensed master electrician with over 15 years of experience in Maui County. Specializing in residential and commercial electrical services with expertise in solar installations.",
    },
    {
      id: 2,
      name: "Leilani Wong",
      company: "Ohana Electrical Services",
      avatar: "/avatars/leilani.jpg",
      rating: 4.8,
      reviews: 19,
      specialties: ["Residential", "Disaster Recovery"],
      verified: true,
      description: "Family-owned electrical business serving Lahaina for 10+ years. Experienced in disaster recovery electrical work and residential rebuilding projects.",
    },
    {
      id: 3,
      name: "Michael Patel",
      company: "Maui Modern Electric",
      avatar: "/avatars/michael.jpg",
      rating: 4.7,
      reviews: 23,
      specialties: ["Smart Homes", "Commercial", "Energy Efficiency"],
      verified: true,
      description: "Specializing in modern electrical solutions including smart home integration, energy efficiency upgrades, and commercial electrical systems.",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      company: "Aloha Power Solutions",
      avatar: "/avatars/sarah.jpg",
      rating: 4.6,
      reviews: 15,
      specialties: ["Residential", "Emergency Services"],
      verified: true,
      description: "Providing reliable electrical services with 24/7 emergency support. Experienced in residential rebuilding and electrical system upgrades.",
    },
    {
      id: 5,
      name: "Kekoa Mahoe",
      company: "Island Electric",
      avatar: "/avatars/kekoa.jpg",
      rating: 4.9,
      reviews: 31,
      specialties: ["Residential", "Commercial", "Code Compliance"],
      verified: true,
      description: "Third-generation electrician with deep knowledge of Maui County electrical codes. Specializing in bringing older systems up to current code requirements.",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      company: "Sustainable Electric Hawaii",
      avatar: "/avatars/jennifer.jpg",
      rating: 4.8,
      reviews: 22,
      specialties: ["Solar", "Energy Storage", "Residential"],
      verified: true,
      description: "Focused on sustainable electrical solutions including solar power, battery storage, and energy-efficient electrical systems for rebuilding projects.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Trusted Electrical Contractors</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Connect with verified electrical contractors for your Lahaina rebuilding project
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Contractors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Residential</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Commercial</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Solar</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Disaster Recovery</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Smart Homes</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Minimum Rating</h3>
                  <select className="w-full rounded-md border border-gray-300 p-2">
                    <option value="4.5">4.5+</option>
                    <option value="4.0">4.0+</option>
                    <option value="3.5">3.5+</option>
                    <option value="3.0">3.0+</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Available Now</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Available This Month</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Apply Filters</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About Our Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Our blockchain-based rating system ensures transparent and tamper-proof reviews. All ratings are verified and cannot be altered once submitted.
              </p>
              <Link href="/rating-system" className="text-blue-600 hover:underline text-sm">
                Learn more about our blockchain rating system
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-3/4">
          <div className="grid md:grid-cols-2 gap-6">
            {contractors.map((contractor) => (
              <Card key={contractor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contractor.avatar} alt={contractor.name} />
                        <AvatarFallback>{contractor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{contractor.name}</CardTitle>
                        <CardDescription>{contractor.company}</CardDescription>
                      </div>
                    </div>
                    {contractor.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(contractor.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill={i < Math.floor(contractor.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{contractor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({contractor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {contractor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{contractor.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button size="sm">Request Quote</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Are You an Electrical Contractor?</h2>
            <p className="text-gray-600 mb-4">
              Join our platform to connect with homeowners in Lahaina who need electrical services for rebuilding.
            </p>
            <Button asChild>
              <Link href="/contractors/register">Join as a Contractor</Link>
            </Button>
          </div>
          <div className="md:w-1/3">
            <svg
              className="w-full h-auto text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
