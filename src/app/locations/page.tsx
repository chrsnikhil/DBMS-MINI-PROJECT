"use client";

import { useEffect, useState } from "react";
import { Location } from "@prisma/client";
import Link from "next/link";
import LocationForm from "@/components/LocationForm";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Location
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <LocationForm />
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {locations.map((location) => (
            <li key={location.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {location.description || "No description"}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={`/locations/${location.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `/api/locations/${location.id}`,
                            {
                              method: "DELETE",
                            }
                          );
                          if (!response.ok) {
                            throw new Error("Failed to delete location");
                          }
                          fetchLocations();
                        } catch (error) {
                          console.error("Error deleting location:", error);
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 