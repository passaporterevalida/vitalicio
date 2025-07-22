# Padrões de Responsividade — RevalidaQuest

## Breakpoints Utilizados
- **Mobile:** `< 768px`
- **Tablet:** `768px – 1023px`
- **Desktop:** `>= 1024px`

## Hooks
- `useDeviceType`: retorna `"mobile" | "tablet" | "desktop"` com base na largura da tela.
- `useIsMobile`: retorna `true` se for mobile (`< 768px`).

## Tailwind CSS
- Utilizar prefixos como `sm:`, `md:`, `lg:`, `xl:` para adaptar estilos.
- Exemplo:
  ```jsx
  <div className="p-2 sm:p-4 lg:p-8">...</div>
  ```
- Para esconder/exibir elementos:
  ```jsx
  <div className="block md:hidden">Mobile only</div>
  <div className="hidden md:block">Desktop only</div>
  ```

## Boas Práticas
- Sempre testar componentes em diferentes larguras de tela.
- Priorizar legibilidade e tamanho de toque em mobile.
- Usar componentes dedicados para mobile quando necessário (ex: `MobileSidebar`, `MobileProgressDrawer`).
- Evitar rolagem horizontal.
- Garantir que animações e feedbacks visuais funcionem bem em mobile.

## Exemplo de uso do hook refinado
```tsx
import { useDeviceType } from '@/hooks/use-mobile';

const deviceType = useDeviceType();
if (deviceType === 'mobile') {
  // Renderizar componente mobile
} else if (deviceType === 'tablet') {
  // Renderizar componente tablet
} else {
  // Renderizar componente desktop
}
```

## Checklist de Testes Mobile
- Navegação (menu, sidebar, hamburger)
- Progresso do usuário
- Autenticação
- Botões e áreas clicáveis
- Textos e inputs
- Feedbacks visuais
- Sem rolagem horizontal 