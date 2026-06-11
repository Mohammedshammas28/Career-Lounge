import { redirect } from "next/navigation"

// Redirect the old /overview route to the main career counselling page
export default function CareerCounsellingOverviewPage() {
  redirect("/services/career-counselling")
}
