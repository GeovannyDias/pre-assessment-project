export const formatStatus = (value: number, formatType: 'default' | 'verbose' = 'default'): string => {
    if (value === 1) {
        return formatType === 'verbose' ? 'Activa' : 'Activo';
    } else {
        return formatType === 'verbose' ? 'Inactiva' : 'Inactivo';
    }
}