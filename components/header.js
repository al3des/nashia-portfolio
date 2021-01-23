import { NASHI } from "../lib/constants"

import Link from "next/link"

export default function Header() {
  return (
    <header className="my-4">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight ">
        <Link href="/">
          <a className="hover:underline">{NASHI}</a>
        </Link>
        .
      </h2>
    </header>
  )
}
