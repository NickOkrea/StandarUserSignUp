import SellerForm from "../components/seller-form";

export default function EditSalesAgentPage() {
  return (
    <div className="p-3">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Editar Vendedor</h1>
      </div>
      <SellerForm />
      
    </div>
  );
}