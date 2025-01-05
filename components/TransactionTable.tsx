"use client"

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Transaction {
  $id: string
  name: string
  amount: number
  $createdAt: string
}

const columns: ColumnDef<Transaction>[] = [
  {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
  },
  {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"))
          const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KES",
          }).format(amount)
          return <div className="text-right font-medium">{formatted}</div>
      },
  },
  {
      accessorKey: "$createdAt",
      header: () => <div className="text-left">Date & Time</div>,
      cell: ({ row }) => {
          const date = new Date(row.getValue("$createdAt"))
          return <div className="text-left">{date.toUTCString()}</div>
      },
  },
]

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
      data: transactions,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
          sorting,
      },
  })

  return (
      <div className="w-full overflow-x-auto">
          <Table className="w-full">
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                              <TableHead key={header.id} className="px-2 py-2">
                                  {header.isPlaceholder
                                      ? null
                                      : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                              </TableHead>
                          ))}
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
                                  <TableCell key={cell.id} className="px-2 py-2">
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                              ))}
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                              No results.
                          </TableCell>
                      </TableRow>
                  )}
              </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
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
  )
}

