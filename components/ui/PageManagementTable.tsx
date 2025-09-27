import { cn } from "@/lib/utils";

// --- Table Components (local, not imported) ---
type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export function Table({ className, ...props }: TableProps) {
    return (
        <table
            className={cn(
                "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
                className
            )}
            {...props}
        />
    );
}
export  function TableHeader({ className, ...props }: TableSectionProps) {
    return (
        <thead
            className={cn("bg-gray-50 dark:bg-gray-900", className)}
            {...props}
        />
    );
}
export function TableBody({ className, ...props }: TableSectionProps) {
    return <tbody className={cn("", className)} {...props} />;
}
export function TableRow({ className, ...props }: TableRowProps) {
    return (
        <tr
            className={cn(
                "border-b border-gray-200 dark:border-gray-800",
                className
            )}
            {...props}
        />
    );
}
export function TableHead({ className, ...props }: TableHeadProps) {
    return (
        <th
            className={cn(
                "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                className
            )}
            {...props}
        />
    );
}
export function TableCell({ className, ...props }: TableCellProps) {
    return (
        <td
            className={cn("px-4 py-3 whitespace-nowrap align-middle", className)}
            {...props}
        />
    );
}
// --- End Table Components ---