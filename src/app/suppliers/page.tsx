"use client";

import { useEffect, useState } from "react";
import { Supplier } from "@prisma/client";
import Link from "next/link";
import SupplierForm from "@/components/SupplierForm";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Supplier
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <SupplierForm />
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {suppliers.map((supplier) => (
            <li key={supplier.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {supplier.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {supplier.contactName || "No contact name"}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={`/suppliers/${supplier.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `/api/suppliers/${supplier.id}`,
                            {
                              method: "DELETE",
                            }
                          );
                          if (!response.ok) {
                            throw new Error("Failed to delete supplier");
                          }
                          fetchSuppliers();
                        } catch (error) {
                          console.error("Error deleting supplier:", error);
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Email: {supplier.email || "No email"}</p>
                  <p>Phone: {supplier.phone || "No phone"}</p>
                  <p>Address: {supplier.address || "No address"}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 