'use client';
import { useMemo } from 'react';
import { PieChartComponent } from '@/components/PieChart';
import { useGetRuralProducersSummary } from '@/hooks/useGetRuralProducersSummary';
import { Spinner } from '@/components/Spinner';
import { PlantedCropType, PlantedCropsEnum } from '@/interfaces/RuralProducer';

type ChartDataType = {
  name: string;
  value: number;
};

export default function Summary() {
  const { data: ruralProducersSummary } = useGetRuralProducersSummary();

  const totalByPlantedCropQuantityFormatted = useMemo(() => {
    if (!ruralProducersSummary) return [];
    return ruralProducersSummary.totalByPlantedCropQuantity.map(
      (item: ChartDataType) => ({
        name: PlantedCropsEnum[item.name as PlantedCropType],
        value: item.value,
      }),
    );
  }, [ruralProducersSummary]);

  return (
    <main className="flex flex-col items-center gap-3">
      <h1>Resumo geral dos produtores rurais</h1>
      {ruralProducersSummary ? (
        <>
          <article className="flex gap-3">
            <p className="flex gap-2 text-lg font-bold">
              <span>Total de fazendas:</span>
              <span>{ruralProducersSummary.totalFarmsQuantity}</span>
            </p>
            <p className="flex gap-2 text-lg font-bold">
              <span>Total de fazendas em hectares:</span>
              <span>{ruralProducersSummary.totalFarmsAreaInHectares}</span>
            </p>
          </article>
          <article className="container grid max-w-[900px] auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-4 p-4">
            <PieChartComponent
              title="Produtores por estado"
              data={ruralProducersSummary.totalProducersByStateQuantity}
            />
            {totalByPlantedCropQuantityFormatted.length && (
              <PieChartComponent
                title="Culturas"
                data={totalByPlantedCropQuantityFormatted}
              />
            )}
            <PieChartComponent
              title="Tipos de área"
              data={ruralProducersSummary.totalByAreaTypeInHectares}
            />
          </article>
        </>
      ) : (
        <Spinner className="h-5" />
      )}
    </main>
  );
}
