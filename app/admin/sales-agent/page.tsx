
import EditSaleAgent from "./components/EditSaleAgent";
import SalesAgentTable from "./components/table-salesagent";

export default function SalesAgentPage(){
    return (
        <div className="w-full min-h-screen flex flex-col gap-4 items-center p-4 bg-transparent">
            <div className="w-full flex justify-end">
                <EditSaleAgent/>
            </div>
            <div className="w-full">
                <SalesAgentTable />
            </div>
        </div>
    )
}