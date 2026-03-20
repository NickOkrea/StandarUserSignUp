import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddNewMotorcycle() {
    return (
        <Link href="/admin/motorcycles/add">
            <Button>Registrar Motocicleta</Button>
        </Link>
    )
}