'use client';
import { Spinner } from '@/components/Spinner';
import { PlantedCrops, RuralProducer } from '@/interfaces/RuralProducer';
import { Pencil, Trash2 } from 'lucide-react';

interface RuralProducerTableProps {
  ruralProducers?: RuralProducer[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function RuralProducersTable({
  isLoading,
  onDelete,
  onEdit,
  ruralProducers,
}: RuralProducerTableProps) {
  return (
    <table className="min-w-full table-auto rounded-lg text-xs">
      <thead className="h-10 bg-primary font-medium text-white">
        <tr>
          <th className="rounded-tl-lg px-3 py-3 text-center">Produtor</th>
          <th className="px-3 py-3 text-center">Documento</th>
          <th className="px-3 py-3 text-center">Fazenda</th>
          <th className="px-3 py-3 text-center">Local</th>
          <th className="px-3 py-3 text-center">Área total (ha)</th>
          <th className="px-3 py-3 text-center">Área agricultável (ha)</th>
          <th className="px-3 py-3 text-center">Área de vegetação (ha)</th>
          <th className="px-3 py-3 text-center">Culturas plantadas</th>
          <th className="rounded-tr-lg px-3 py-3 text-center">Ações</th>
        </tr>
      </thead>

      <tbody className="bg-slate-300 font-medium text-black [&>*:nth-child(odd)]:bg-slate-400">
        {ruralProducers?.length ? (
          ruralProducers.map(producer => (
            <tr key={producer.id}>
              <td className="py-1 text-center">{producer.name}</td>
              <td className="py-1 text-center">{producer.document}</td>
              <td className="py-1 text-center">{producer.farmName}</td>
              <td className="py-1 text-center">
                {producer.city} - {producer.state}
              </td>
              <td className="py-1 text-center">
                {producer.totalAreaInHectaresOfTheFarm}
              </td>
              <td className="py-1 text-center">
                {producer.cultivableAreaInHectares}
              </td>
              <td className="py-1 text-center">
                {producer.vegetationAreaInHectares}
              </td>
              <td className="py-1 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {producer.plantedCrops.map(crop => (
                    <span
                      key={crop}
                      className="rounded-md bg-primary p-1 text-white"
                    >
                      {PlantedCrops[crop]}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-1 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <button onClick={() => onDelete(producer.id)}>
                    <Trash2
                      size={20}
                      className="text-red-500"
                      strokeWidth={3}
                    />
                  </button>
                  <button onClick={() => onEdit(producer.id)}>
                    <Pencil
                      size={20}
                      className="text-secondary"
                      strokeWidth={3}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} align="center" className="py-2">
              {isLoading ? (
                <Spinner className="h-5" />
              ) : (
                <span>Nenhum produtor cadastrado!</span>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
