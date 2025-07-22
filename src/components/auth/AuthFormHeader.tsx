import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
export function AuthFormHeader() {
  return <CardHeader className="text-center pb-4">
      <CardTitle className="text-2xl font-bold text-gray-800 mb-1">
        Bem-vindo (a)
      </CardTitle>
      <CardDescription className="text-sm text-gray-600 flex items-center justify-center gap-1">
        Sua jornada médica começa aqui <span className="text-base">🩺</span>
      </CardDescription>
    </CardHeader>;
}