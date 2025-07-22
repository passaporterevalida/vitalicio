
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionsHeaderProps {
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;
  totalQuestoes: number;
  tipoProva?: string;
  setTipoProva?: (tipo: string) => void;
}

export function QuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
  tipoProva,
  setTipoProva,
}: QuestionsHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto w-full mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-foreground">
          Provas do Revalida
        </h1>
        <div className="flex items-center gap-4">
          <Select
            onValueChange={(value) => setAnoSelecionado(parseInt(value))}
            defaultValue={anoSelecionado.toString()}
          >
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Selecione o Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2011">Revalida 2011</SelectItem>
              <SelectItem value="2012">Revalida 2012</SelectItem>
              <SelectItem value="2013">Revalida 2013</SelectItem>
              <SelectItem value="2014">Revalida 2014</SelectItem>
              <SelectItem value="2015">Revalida 2015</SelectItem>
              <SelectItem value="2016">Revalida 2016</SelectItem>
              <SelectItem value="2017">Revalida 2017</SelectItem>
              <SelectItem value="2020">Revalida 2020</SelectItem>
              <SelectItem value="2021">Revalida 2021</SelectItem>
              <SelectItem value="2022">Revalida 2022</SelectItem>
              <SelectItem value="2023">Revalida 2023</SelectItem>
              <SelectItem value="2024">Revalida 2024</SelectItem>
              <SelectItem value="2025">Revalida 2025</SelectItem>
            </SelectContent>
          </Select>
          {[2013, 2014, 2015, 2016, 2017, 2022, 2023].includes(anoSelecionado) &&
            tipoProva &&
            setTipoProva && (
              <Select onValueChange={setTipoProva} defaultValue={tipoProva}>
                <SelectTrigger className="w-[180px] bg-card">
                  <SelectValue placeholder="Selecione a Prova" />
                </SelectTrigger>
                <SelectContent>
                  {[2013, 2014, 2015].includes(anoSelecionado) ? (
                    <>
                      <SelectItem value="Cinza">Prova Cinza</SelectItem>
                      <SelectItem value="Vermelha">Prova Vermelha</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Prova 1">Prova 1</SelectItem>
                      <SelectItem value="Prova 2">Prova 2</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {totalQuestoes > 0
            ? `Mostrando ${totalQuestoes} questões para os filtros selecionados.`
            : "Nenhuma questão encontrada."}
        </div>
      </div>
    </div>
  );
}
