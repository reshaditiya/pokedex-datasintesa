'use client';

import { PokemonData } from '@/types/pokeapiDB.type';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export function PokemonStats({ pokemonData }: { pokemonData: PokemonData }) {
  const chartData = [
    {
      subject: 'HP',
      val: pokemonData.stats[0].base_stat,
      fullMark: 100,
    },
    {
      subject: 'ATK',
      val: pokemonData.stats[1].base_stat,
      fullMark: 100,
    },
    {
      subject: 'DFS',
      val: pokemonData.stats[2].base_stat,
      fullMark: 100,
    },
    {
      subject: 'ATK+',
      val: pokemonData.stats[3].base_stat,
      fullMark: 100,
    },
    {
      subject: 'DFS+',
      val: pokemonData.stats[4].base_stat,
      fullMark: 100,
    },
    {
      subject: 'SPD',
      val: pokemonData.stats[5].base_stat,
      fullMark: 100,
    },
  ];

  return (
    <RadarChart width={280} height={200} data={chartData} className="text-sm">
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name={pokemonData.name}
        dataKey="val"
        stroke="#6b7280"
        fill="#6b7280"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
