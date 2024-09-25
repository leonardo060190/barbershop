import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

// Adiciona as fontes necessárias ao pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface RelatorioCompleto {
  month: string;
  lucro: number;
  servicoNome: string;
  barbeariaNome: string;
}

// Função para gerar o PDF
export const GerarRelatorioPDF = (relatorio: RelatorioCompleto[]) => {
  const documentDefinition: TDocumentDefinitions = {
    content: [
    
      { text: "Relatório Completo", style: "header" },
      { text: "Lucro por Mês", style: "subheader" },
      {
        table: {
          body: [
            ["Mês", "Lucro"],
            ...relatorio.map((item) => [
              item.month,
              `R$ ${item.lucro.toFixed(2)}`,
            
            ]),
          ],
        },
        layout: "lightHorizontalLines",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 10, 0],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  // Gera o PDF e faz o download
  pdfMake.createPdf(documentDefinition).download("relatorio_completo.pdf");
};
