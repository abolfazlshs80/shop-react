import { useEffect } from "react"
import { FileStoreService } from "../../Service/api/FileStores/fileStore.service";

export default function Admin_Home(){


    const loads=async ()=>{
        const fileStoreService=new FileStoreService();
     
    }
    useEffect(()=>{
        loads();
    },[])
    return (
        <div>Admin_Home </div>
    )
}