'use client';
import { PieChartComponent } from '@/components/PieChart';
import { useListRuralProducers } from '@/hooks/useListRuralProducers';
import { useGetRuralProducersSummary } from '@/hooks/useGetRuralProducersSummary';
import { PlantedCropsEnum, PlantedCropsType } from '@/interfaces/RuralProducer';
import { useMemo } from 'react';

type ChartDataType = {
  name: string;
  value: number;
};

export default function Summary() {
  const { data: ruralProducers, isLoading: ruralProducersIsLoading } =
    useListRuralProducers();
  const {
    data: ruralProducersSummary,
    isLoading: ruralProducersSummaryIsLoading,
  } = useGetRuralProducersSummary();

  const totalProducersByState = useMemo(() => {
    if (!ruralProducers) return null;
    return ruralProducers.reduce((acc, producer) => {
      const state = producer.state;
      const findStateIndex = acc.findIndex(item => item.name === state);
      if (findStateIndex === -1) {
        acc.push({
          name: state,
          value: 1,
        });
      } else {
        acc[findStateIndex].value += 1;
      }
      return acc;
    }, [] as ChartDataType[]);
  }, [ruralProducers]);

  const totalByPlantedCrops = useMemo(() => {
    if (!ruralProducers) return null;
    const totalPlantedCrops = ruralProducers.reduce((acc, producer) => {
      return [...acc, ...producer.plantedCrops];
    }, [] as PlantedCropsType[]);
    return totalPlantedCrops.reduce((acc, plantedCrop) => {
      const plantedCropFormatted = PlantedCropsEnum[plantedCrop];
      const findPlantedCropsIndex = acc.findIndex(
        item => item.name === plantedCropFormatted,
      );
      if (findPlantedCropsIndex === -1) {
        acc.push({
          name: plantedCropFormatted,
          value: 1,
        });
      } else {
        acc[findPlantedCropsIndex].value += 1;
      }
      return acc;
    }, [] as ChartDataType[]);
  }, [ruralProducers]);

  const totalByAreaType = useMemo(() => {
    if (!ruralProducers) return null;
    return ruralProducers.reduce((acc, producer) => {
      const findCultivableIndex = acc.findIndex(
        item => item.name === 'Agricultável',
      );
      if (findCultivableIndex === -1) {
        acc.push({
          name: 'Agricultável',
          value: producer.cultivableAreaInHectares,
        });
      } else {
        acc[findCultivableIndex].value += producer.cultivableAreaInHectares;
      }
      const findVegetationIndex = acc.findIndex(
        item => item.name === 'Vegetação',
      );
      if (findVegetationIndex === -1) {
        acc.push({
          name: 'Vegetação',
          value: producer.vegetationAreaInHectares,
        });
      } else {
        acc[findVegetationIndex].value += producer.vegetationAreaInHectares;
      }
      return acc;
    }, [] as ChartDataType[]);
  }, [ruralProducers]);

  return (
    <main className="flex flex-col items-center gap-3">
      <h1>Resumo geral dos produtores rurais</h1>
      {ruralProducersSummary && (
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
      )}
      <article className="container grid max-w-[900px] auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-4 p-4">
        {totalProducersByState && (
          <PieChartComponent
            title="Produtores por estado"
            data={totalProducersByState}
          />
        )}
        {totalByPlantedCrops && (
          <PieChartComponent title="Culturas" data={totalByPlantedCrops} />
        )}
        {totalByAreaType && (
          <PieChartComponent title="Tipos de área" data={totalByAreaType} />
        )}
      </article>
    </main>
  );
}
