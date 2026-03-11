import { Button } from "@/components/ui/button";
import { Logout } from "./components/Logout";
import Link from "next/link";

export default function DriverPanel(){
    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center justify-between p-4">
            Panel de chofer
            <div className="">
                <Link href="/driver/workshop">
                    <Button>
                        + Agregar moto a taller
                    </Button>
                </Link>
            </div>
            <div className="flex">
            <Logout/>
            </div>
        </div>
    )
}