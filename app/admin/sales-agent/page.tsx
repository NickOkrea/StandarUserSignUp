import AddNewSaleAgent from "./components/AddNewSaleAgent";

export default function SalesAgentPage(){
    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <AddNewSaleAgent />
            <p>Sales Agent Page</p>
        </div>
    )
}