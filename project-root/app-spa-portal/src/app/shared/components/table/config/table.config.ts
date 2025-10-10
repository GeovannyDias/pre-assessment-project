export interface TableColumnConfig {
  key: string;
  label: string;
  width?: string; // e.g., '20%', '100px'
  visible?: boolean; // Si la columna es visible o no
  sortable?: boolean; // Si la columna se puede ordenar
  align?: 'left' | 'center' | 'right'; // Alineación de texto
  formatFn?: (value: any, row: any) => string; // Para formateo dinámico ('date' | 'uppercase' | 'lowercase' | 'currency' | 'custom'; | etc. // o string libre)
  type?: 'text' | 'number' | 'date' | 'actions'; // Útil para renderizado condicional
}

// Examples of formatFn usage:

// formatFn: (value: string) => new Date(value).toLocaleDateString()
// formatFn: (value: string) => value.toUpperCase()
// formatFn: (value: string) => value.toLowerCase()
// formatFn: (value: number) => `$${value.toFixed(2)}`
// formatFn: (value: any, row: any) => `Custom: ${value}`
// formatFn: (value: string) => value // Ejemplo de función personalizada
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy hh:mm:ss a') // 12h con AM/PM
// { key: 'dateAt', label: 'Creado En', visible: true, formatFn: (value: string) => new Date(value).toLocaleDateString() },
// formatFn: (value: string) => formatDateTimeUsingPipe(value, 'dd/MM/yyyy HH:mm:ss') // 24h

// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy hh:mm:ss a') // 12h con AM/PM
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy HH:mm:ss') // 24h sin AM/PM
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd/MM/yyyy HH:mm:ss') // 24h sin AM/PM con barras
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd/MM/yyyy hh:mm:ss a') // 12h con AM/PM con barras
// formatFn: (value: string) => formatDateUsingPipe(value, 'MM/dd/yyyy HH:mm:ss') // 24h sin AM/PM con barras invertidas
// formatFn: (value: string) => formatDateUsingPipe(value, 'MM/dd/yyyy hh:mm:ss a') // 12h con AM/PM con barras invertidas
// formatFn: (value: string) => formatDateUsingPipe(value, 'yyyy-MM-dd HH:mm:ss') // 24h sin AM/PM formato ISO
// formatFn: (value: string) => formatDateUsingPipe(value, 'yyyy-MM-dd hh:mm:ss a') // 12h con AM/PM formato ISO
// formatFn: (value: string) => formatDateUsingPipe(value, 'yyyy/MM/dd HH:mm:ss') // 24h sin AM/PM formato ISO con barras
// formatFn: (value: string) => formatDateUsingPipe(value, 'yyyy/MM/dd hh:mm:ss a') // 12h con AM/PM formato ISO con barras
