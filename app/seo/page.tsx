"use client"; // Add this at the top

import React, { useState } from 'react';
import { Modal, Button } from '@components/ui';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@components/ui/table';

// Define a type for dataset
interface Dataset {
  name: string;
  source: string;
  updated: string;
}

export default function SEODashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const datasets: Dataset[] = [
    { name: 'Dataset 1', source: 'Source 1', updated: '2023-09-10' },
    { name: 'Dataset 2', source: 'Source 2', updated: '2023-09-12' },
    // Add more datasets here
  ];

  const handleView = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log('File uploaded:', file);
      // Handle the file upload logic here
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Programmatic SEO Dashboard</h1>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dataset Name</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasets.map((dataset) => (
            <TableRow key={dataset.name}>
              <TableCell>{dataset.name}</TableCell>
              <TableCell>{dataset.source}</TableCell>
              <TableCell>{dataset.updated}</TableCell>
              <TableCell>
                <Button onClick={() => handleView(dataset)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showModal && selectedDataset && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">View Dataset: {selectedDataset.name}</h2>
          <p><strong>Source:</strong> {selectedDataset.source}</p>
          <p><strong>Last Updated:</strong> {selectedDataset.updated}</p>

          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Upload New Dataset
            </label>
            <input
              type="file"
              id="file-upload"
              className="mt-1 block w-full"
              onChange={handleFileUpload}
              aria-label="Upload new dataset file"
            />
          </div>

          <Button onClick={() => setShowModal(false)} className="mt-4" aria-label="Close Modal">
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}
