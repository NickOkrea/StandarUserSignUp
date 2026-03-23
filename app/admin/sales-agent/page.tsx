
import EditSaleAgent from "./components/EditSaleAgent";
import SalesAgentTable from "./components/table-salesagent";

export default function SalesAgentPage(){
    return (
        <div className="p-3">
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold">Mecánicos</h1>
            </div>
            <SalesAgentTable />
        </div>
    )
}