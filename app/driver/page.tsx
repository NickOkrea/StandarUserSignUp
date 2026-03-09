import { Logout } from "./components/Logout";

export default function DriverPanel(){
    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
            Panel de chofer
            <div className="">
            <Logout/>
            </div>
        </div>
    )
}