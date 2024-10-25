import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import * as z from 'zod'
import { userAuthTypes } from "@/models/user.model"
export const GET = ()=>{
    return NextResponse.json({success:true})
}

const userSchema = z
        .object({
            email:z.string().min(1,"email is Required").email("Invalid Email"),
            password:z
            .string()
            .min(1,"Password is Required")
            .min(8, "Password must have 8 characters"),
            confirmPassword:z
            .string()
            .min(1,"Password is Required")
        })
        .refine((data)=> data.confirmPassword === data.password,{
            path:['confirmPassword'],
            message:"Password do not match"
        })
export const POST = async(req:Request)=>{
    try {
        const body = await req.json()
        const {email,password}:userAuthTypes = userSchema.parse(body)
        const existingEmail = await db.user.findUnique({
            where:{ email: email }
        })
        if(existingEmail){
            return NextResponse.json({message:"Email is already been used"},{status:409})
        }
        const hashedPassword = await hash(password,10)
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
        const {password:newUserPassword, ...rest} = newUser
        return NextResponse.json({user:rest,message:"User has created successfully"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Something Wrong with the Database"},{status:500})
        
    }
}