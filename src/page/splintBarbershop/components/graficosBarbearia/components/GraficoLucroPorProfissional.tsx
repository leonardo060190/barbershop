import chroma from "chroma-js";
import {
  Bar,
  BarChart,
  CartesianGrid,
  //   LabelList,
  Legend,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GraficoLucroPorProfissionalProps {
  lucroMesProfissional: {
    profissionalNome: string;
    month: string;
    lucro: number;
  }[];
}

interface DataItem {
  month: string;
  [profissionalNome: string]: number | string; // Chave dinâmica para cada profissional
}

const chartConfig = {
  lucro: {
    label: "Lucro",
    color: "#2E3AEB",
  },
} satisfies ChartConfig;

const GraficoLucroPorProfissional: React.FC<
  GraficoLucroPorProfissionalProps
> = ({ lucroMesProfissional }) => {
  // Transformar os dados para o formato necessário, agrupando os lucros por profissional para cada mês
  const data: DataItem[] = lucroMesProfissional.reduce(
    (acc: DataItem[], current) => {
      const found = acc.find((item) => item.month === current.month);
      if (found) {
        found[current.profissionalNome] = current.lucro;
      } else {
        acc.push({
          month: current.month,
          [current.profissionalNome]: current.lucro,
        });
      }
      return acc;
    },
    []
  );

  // Obter todos os nomes dos profissionais de forma única
  const profissionais = [
    ...new Set(lucroMesProfissional.map((item) => item.profissionalNome)),
  ];

  //Gera uma paleta de cores para cada profissional
  const cores = chroma.scale(['yellow', 'lightgreen', '008ae5'])
  .domain([0,0.25,1]).colors(profissionais.length);
  // Verificar se as cores são distintas
  console.log(cores);
  const corMapa: Record<string, string> = profissionais.reduce(
    (map, profissional, index) => {
      map[profissional] = cores[index];
      return map;
    },
    {} as Record<string, string>
  );
  console.log(corMapa);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Lucro por Profissional</CardTitle>
          <CardDescription>Janeiro - Dezembro 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={data}
              barGap={0} // Remove o espaço entre as barras individuais
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="capitalize"
                tickFormatter={(value) => value.slice(0, 3)} // Abreviar os meses
              />

              <Legend className="capitalize" />
              <ChartTooltip
                cursor={false}
                labelClassName="capitalize"
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {/* Gerar uma barra para cada profissional */}
              {profissionais.map((profissional) => (
                <Bar
                  key={profissional}
                  dataKey={profissional}
                  fill={corMapa[profissional] || "#2E3AEB"} // Alternar cores para cada profissional
                  radius={2}
                >
                  {/* <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  /> */}
                </Bar>
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Lucro de cada Profissional
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default GraficoLucroPorProfissional;
