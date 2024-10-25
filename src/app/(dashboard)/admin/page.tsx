import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
const page = async() => {
  const session = await getServerSession(authOptions) 
  if(session?.user){
    return <h2 className="text-2xl">Admin Page -- welcome to Dashboard {session?.user.email}</h2>
  }else{
    return <h2 className="text-2xl">Please Log in to see the dashboard</h2> 
  }
}

export default page