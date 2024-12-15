"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import NextLink from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FullLink } from "@/types/prismaTypes";
import { redirect } from "next/navigation";

import { DeleteButton } from "@/app/dashboard/links/components/DeleteButton";

export function LinkTab({ links }: { links: FullLink[] }) {
  const columns: ColumnDef<FullLink>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Liens",
      cell: ({ row }) => {
        const link = row.original; // Accède à l'objet complet
        return (
          <div className="flex items-center justify-left">
            <NextLink
              href={link.url}
              className={buttonVariants({ variant: "link" })}
            >
              {/*               <DynamicIcon
                name={link.icon ? link.icon.name : "CircleOff"}
                size={40}
                className="text-primary"
              /> */}

              {link.title}
            </NextLink>
          </div>
        );
      },
    },
    {
      accessorKey: "url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            URL
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("url")}</div>,
    },
    {
      accessorKey: "inNav",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Navigation
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>{row.getValue("inNav") === "on" ? "Oui" : "Non"}</div>
      ),
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        const b = rowB.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        return a - b; // Trier par 0 (Non) puis 1 (Oui)
      },
    },
    {
      accessorKey: "isAdmin",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Admin
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>{row.getValue("isAdmin") === "on" ? "Oui" : "Non"}</div>
      ),
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        const b = rowB.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        return a - b; // Trier par 0 (Non) puis 1 (Oui)
      },
    },

    {
      accessorKey: "projectId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Projet ID
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("projectId") ? "Oui" : "Non"}</div>,
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        const b = rowB.getValue(columnId) ? 1 : 0; // "Oui" => 1, "Non" => 0
        return a - b; // Trier par 0 (Non) puis 1 (Oui)
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const links = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => navigator.clipboard.writeText(links.url)}
              >
                Copie URL
                <Copy
                  style={{ width: "14px", height: "14px" }}
                  color="#ffffff"
                  strokeWidth={1}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => redirect(`/dashboard/links/${links.id}`)}
              >
                Modifier
                <Pencil
                  style={{ width: "14px", height: "14px" }}
                  color="#ffffff"
                  strokeWidth={1}
                />
              </DropdownMenuItem>
              {/*               <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => handleDelete(links.id)}
              >
                Supprimer
                <Trash2
                  style={{ width: "14px", height: "14px" }}
                  color="#ffffff"
                  strokeWidth={1}
                />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: links,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8, // Nombre de lignes par page
      },
    },
  });

  const selectedIds = Object.keys(table.getState().rowSelection).map(
    (key) => links[parseInt(key)]?.id
  );

  return (
    <div className="w-full">
      <div className="w-full flex items-center py-4">
        <Input
          placeholder="Filtre Url..."
          value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("url")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="w-full flex items-center justify-center">
          {selectedIds.length > 0 ? (
            <DeleteButton
              id={selectedIds}
              setRowSelection={table.setRowSelection}
            />
          ) : null}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex rounded-md border border-border px-1 overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <label htmlFor="pageSize" className="mr-2 text-sm">
            Lignes par page :
          </label>
          <select
            id="pageSize"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 8, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
