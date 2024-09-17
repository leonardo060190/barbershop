import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList,  XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import chroma from "chroma-js";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GraficoDeServicoAgendadoMesProps {
  agendamentosPorServico: {
    servicoNome: string;
    totalAgendamentos: number;
    month: string;
  }[];
}

const chartConfig = {
  totalAgendamentos: {
    label: "Total ",
    color: "#008ae5",
  },
} satisfies ChartConfig;

const months = [
  { key: "01", label: "janeiro" },
  { key: "02", label: "fevereiro" },
  { key: "03", label: "março" },
  { key: "04", label: "abril" },
  { key: "05", label: "maio" },
  { key: "06", label: "junho" },
  { key: "07", label: "julho" },
  { key: "08", label: "agosto" },
  { key: "09", label: "setembro" },
  { key: "10", label: "outubro" },
  { key: "11", label: "novembro" },
  { key: "12", label: "dezembro" },
];

const GraficoDeServicoAgendadoMes: React.FC<
  GraficoDeServicoAgendadoMesProps
> = ({ agendamentosPorServico }) => {
  const currentMonth = new Date().getMonth() + 1; // Obter o mês atual (de 0 a 11, por isso somamos 1)
  const [activeMonth, setActiveMonth] = React.useState<string>(
    String(currentMonth).padStart(2, "0")
  );

  // Transformar os dados em um array adequado para o gráfico
  // Filtrar os agendamentos pelo mês selecionado

  const filteredData = React.useMemo(() => {
    return agendamentosPorServico.filter(
      (agendamento) =>
        agendamento.month === months.find((m) => m.key === activeMonth)?.label
    );
  }, [agendamentosPorServico, activeMonth]);

  console.log("filteredData", filteredData);

  // Obter todos os nomes dos serviços de forma única
  const nomesServicos = [
    ...new Set(filteredData.map((item) => item.servicoNome)),
  ];

  const cores = chroma
    .scale(["yellow", "lightgreen", "008ae5"])
    .domain([0, 0.25, 1])
    .colors(nomesServicos.length);
  console.log(cores);

  const corMapa: Record<string, string> = nomesServicos.reduce(
    (map, servico, index) => {
      map[servico] = cores[index];
      return map;
    },
    {} as Record<string, string>
  );
  console.log(corMapa);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Serviços Agendados por Mês</CardTitle>
          <CardDescription>
            Selecione o mês para ver os agendamentos
          </CardDescription>
        </div>
        <Select
          onValueChange={(value) => setActiveMonth(value)}
          defaultValue={activeMonth}
        >
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a month"
          >
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((month) => (
              <SelectItem key={month.key} value={month.key}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="chart-container">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="servicoNome"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="capitalize"
            />

            <ChartTooltip
              cursor={false}
              labelClassName="capitalize"
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="totalAgendamentos" radius={2} barSize={50}>
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={corMapa[entry.servicoNome] || "#2E3AEB"}
                />
              ))}
              <LabelList
                position="top"
                offset={7}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total de agendamentos por serviço
        </div>
      </CardFooter>
    </Card>
  );
};

export default GraficoDeServicoAgendadoMes;
