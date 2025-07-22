import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthorizedEmails } from '@/hooks/useAuthorizedEmails';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function BulkEmailImport() {
  const [emails, setEmails] = useState('');
  const [loading, setLoading] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: string[];
    errors: string[];
    total: number;
  } | null>(null);
  
  const { addAuthorizedEmail } = useAuthorizedEmails();
  const { toast } = useToast();

  const handleImport = async () => {
    if (!emails.trim()) return;

    setLoading(true);
    setImportResults(null);
    
    const emailList = emails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email && email.includes('@'))
      .filter((email, index, arr) => arr.indexOf(email) === index); // Remove duplicatas

    const successEmails: string[] = [];
    const errorEmails: string[] = [];

    for (const email of emailList) {
      try {
        await addAuthorizedEmail(email, null, 'Importação em lote - Aluno Passaporte Revalida');
        successEmails.push(email);
      } catch (error) {
        errorEmails.push(email);
        console.error(`Erro ao importar ${email}:`, error);
      }
    }

    setImportResults({
      success: successEmails,
      errors: errorEmails,
      total: emailList.length
    });

    toast({
      title: "Importação Concluída",
      description: `${successEmails.length} e-mails autorizados, ${errorEmails.length} erros.`,
      variant: errorEmails.length > 0 ? "default" : "default",
    });

    setEmails('');
    setLoading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setEmails(content);
    };
    reader.readAsText(file);
  };

  const clearResults = () => {
    setImportResults(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importação em Lote de E-mails
        </CardTitle>
        <CardDescription>
          Importe múltiplos e-mails de alunos do Passaporte Revalida de uma vez.
          Você pode colar os e-mails ou fazer upload de um arquivo .txt
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload de arquivo */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload de arquivo (.txt)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
        </div>

        {/* Área de texto */}
        <div className="space-y-2">
          <label className="text-sm font-medium">E-mails (um por linha)</label>
          <Textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="aluno1@email.com&#10;aluno2@email.com&#10;aluno3@email.com"
            rows={8}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            {emails.split('\n').filter(email => email.trim() && email.includes('@')).length} e-mails válidos detectados
          </p>
        </div>

        {/* Botão de importação */}
        <Button 
          onClick={handleImport} 
          disabled={loading || !emails.trim()}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Importando...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Importar E-mails
            </>
          )}
        </Button>

        {/* Resultados da importação */}
        {importResults && (
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Resultado da Importação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total processado:</span>
                <Badge variant="outline">{importResults.total}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Sucessos:</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {importResults.success.length}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Erros:</span>
                <Badge variant="destructive">
                  {importResults.errors.length}
                </Badge>
              </div>

              {/* Lista de e-mails com sucesso */}
              {importResults.success.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    E-mails autorizados com sucesso:
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {importResults.success.map((email, index) => (
                      <div key={index} className="text-xs bg-green-50 p-2 rounded border">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lista de e-mails com erro */}
              {importResults.errors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    E-mails com erro:
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {importResults.errors.map((email, index) => (
                      <div key={index} className="text-xs bg-red-50 p-2 rounded border">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={clearResults} 
                variant="outline" 
                size="sm"
                className="w-full"
              >
                Limpar Resultados
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 