import bcrypt from "bcrypt"
import { Prisma } from "@/app/generated/prisma"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        conversationIds: [],
        seenMessageIds: [],
      },
    })

    return NextResponse.json(user)
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return new NextResponse("Email already in use", { status: 409 })
    }

    console.log("REGISTRATION_ERROR:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 

// export async function POST(request: Request) {
//   console.log("🔵 Register route hit")
  
//   try {
//     const body = await request.json()
//     console.log("🟡 Request body:", body)
    
//     const { email, name, password } = body
    
//     if (!email || !name || !password) {
//       console.log("🔴 Missing fields")
//       return new NextResponse("Missing info", { status: 400 })
//     }

//     console.log("🟡 Hashing password...")
//     const hashedPassword = await bcrypt.hash(password, 12)
//     console.log("🟢 Password hashed")

//     console.log("🟡 Hitting database...")
//     const user = await prisma.user.create({
//       data: { email, name, hashedPassword, conversationIds: [], seenMessageIds: [] }
//     })
//     console.log("🟢 User created:", user)

//     return NextResponse.json(user)

//   } catch (error) {
//     console.log("🔴 FULL ERROR:", error)
//  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
//       return new NextResponse("Email already in use", { status: 409 })
//     }

//     console.log("REGISTRATION_ERROR:", error)
//     return new NextResponse("Internal Error", { status: 500 })  }
// }