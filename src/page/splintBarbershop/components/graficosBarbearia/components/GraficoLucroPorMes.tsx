import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

interface GraficoLucroPorMesProps {
  lucroMes: { month: string; lucro: number }[];
}

const chartConfig = {
  lucro: {
    label: "Lucro",
    color: "#008ae5",
  },
} satisfies ChartConfig;

const GraficoLucroPorMes: React.FC<GraficoLucroPorMesProps> = ({
  lucroMes,
}) => {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Lucro Mensal</CardTitle>
          <CardDescription>Janeiro - Desembro 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={lucroMes}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="capitalize"
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                labelClassName="capitalize"
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="lucro" fill="var(--color-lucro)" radius={2}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Lucro por mês durante o ano
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default GraficoLucroPorMes;
