"use client"

import {ColumnDef} from "@tanstack/react-table"
import {CellAction} from "./cell-action"

export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
  }
  
export const columns: ColumnDef<CategoryColumn>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "billboard",
      header: "Billboard",
      cell: ({row}) => row.original.billboardLabel,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      id: "actions",
      //Not in shadcn documentation, this is tanstack, this is how you add a custom column
      cell: ({row}) => <CellAction data={row.original}/>
    }
    // ...
  ]
  