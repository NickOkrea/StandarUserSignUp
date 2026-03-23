import MotorcycleForm from "../components/motorcycle-form";
export default function AddMotorcyclePage() {
  return (
    <div className="p-3">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Agregar Motocicleta</h1>
      </div>
      <MotorcycleForm />

      
    </div>
  );
}