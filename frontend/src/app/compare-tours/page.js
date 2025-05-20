"use client";

import React from 'react';
import { useComparison } from '@/hooks/comparisonContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa'; // For mobile remove button

const CompareToursPage = () => {
  const { comparedTours, removeFromCompare } = useComparison();

  const { data: comparedTourDetails, isLoading, isError, error } = useQuery({
    queryKey: ['comparePageTourDetails', comparedTours],
    queryFn: async () => {
      if (comparedTours.length > 0) {
        const requests = comparedTours.map(tourId =>
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}/`)
        );
        const responses = await Promise.all(requests);
        return responses.map(res => res.data);
      }
      return [];
    },
    enabled: comparedTours.length > 0,
    staleTime: Infinity,
  });

  if (comparedTours.length < 2) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-4">Compare Tours</h2>
        <p className="text-gray-600">
          Please select at least two tours to compare.
          <Link href="/packages" className="text-red-500 hover:underline ml-2">
            Browse Tours
          </Link>
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-4">Comparing Tours...</h2>
        <p className="text-gray-600">Loading tour details.</p>
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching compared tour details for comparison page:", error);
    return (
      <div className="container mx-auto py-10 text-red-500">
        <h2 className="text-2xl font-semibold mb-4">Error Comparing Tours</h2>
        <p className="text-gray-600">Failed to load tour details for comparison.</p>
      </div>
    );
  }

  if (!comparedTourDetails || comparedTourDetails.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-4">Compare Tours</h2>
        <p className="text-gray-600">No tours selected for comparison.</p>
        <Link href="/tours" className="text-red-500 hover:underline mt-2 inline-block">
          Browse Tours
        </Link>
      </div>
    );
  }

  // Define the attributes you want to compare
  const compareAttributes = [
    { name: 'Price', key: 'dynamic_price', format: (value) => `$${value}` }, // Using dynamic_price
    { name: 'Duration', key: 'duration' },
    { name: 'Location', key: 'location' },
    { name: 'Availability', key: 'availability' },
    { name: 'Minimum Group Size', key: 'min_group_size' },
    { name: 'Maximum Group Size', key: 'max_group_size' },
    { name: 'Tour Type', key: 'tour_type' },
    { name: 'Season', key: 'season' },
    { name: 'Tags', key: 'tags', format: (value) => value ? value.join(', ') : 'N/A' },
    { name: 'Start Date', key: 'start_date' },
    { name: 'End Date', key: 'end_date' },
    { name: 'Description', key: 'description', format: (value) => value ? value.substring(0, 150) + '...' : 'N/A' },
    // You can add more fields from your TourSerializer as needed
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">Comparing {comparedTourDetails.length} Tours</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b font-semibold text-left">Attribute</th>
              {comparedTourDetails.map((tour) => (
                <th key={tour.id} className="py-2 px-4 border-b font-semibold text-center">
                  {tour.title}
                  <button
                    onClick={() => removeFromCompare(tour.id)}
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
                    aria-label={`Remove ${tour.title} from comparison`}
                  >
                    <FaTimes size={16} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareAttributes.map((attr) => (
              <tr key={attr.key} className="border-b">
                <td className="py-2 px-4 font-semibold text-left">{attr.name}</td>
                {comparedTourDetails.map((tour) => (
                  <td key={tour.id} className="py-2 px-4 text-center">
                    {attr.format ? attr.format(tour[attr.key]) : tour[attr.key] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
            {/* Optional: Row for viewing details */}
            <tr className="bg-gray-100">
              <td className="py-2 px-4 font-semibold text-left"></td>
              {comparedTourDetails.map((tour) => (
                <td key={tour.id} className="py-2 px-4 text-center">
                  <Link href={`/tour_info/${tour.id}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareToursPage;