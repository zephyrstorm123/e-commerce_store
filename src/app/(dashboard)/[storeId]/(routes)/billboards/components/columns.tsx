"use client"

import {ColumnDef} from "@tanstack/react-table"
import {CellAction} from "./cell-action"

export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
  }
  
export const columns: ColumnDef<BillboardColumn>[] = [
    {
      accessorKey: "label",
      header: "Label",
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
  