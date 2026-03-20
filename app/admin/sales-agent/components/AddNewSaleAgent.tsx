import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddNewSaleAgent() {
    return (
        <Link href="/admin/sales-agent/add">
            <Button>Registrar Vendedor</Button>
        </Link>
    )
}