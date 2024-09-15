"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow'
import dagre from 'dagre'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import 'reactflow/dist/style.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadIcon } from 'lucide-react'

interface Page {
  id: string
  title: string
  parentId: string | null
}

const initialPages: Page[] = [
  { id: '1', title: 'Home', parentId: null },
  { id: '2', title: 'Products', parentId: '1' },
  { id: '3', title: 'Shoes', parentId: '2' },
  { id: '4', title: 'Shirts', parentId: '2' },
  { id: '5', title: 'Nike', parentId: '3' },
]

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.set
