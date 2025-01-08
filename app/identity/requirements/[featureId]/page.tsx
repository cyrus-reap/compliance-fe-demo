"use client";

import { useFeatureRequirementsHook } from "@/hooks/useFeatureRequirementsHook";
import { AssociatedEntity, RequirementLevel, ValueType } from "@/types";

export default function FeatureRequirements({
  params,
}: {
  params: { featureId: string };
}) {
  const { featureId } = params;
  const { data, isLoading, error, refetch } =
    useFeatureRequirementsHook(featureId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Feature Requirements</h1>

      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : isLoading ? (
        <p className="text-blue-500">Loading feature requirements...</p>
      ) : data && data.items.length > 0 ? (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Requirements for Feature ID: {featureId}
          </h2>
          <ul className="list-disc list-inside">
            {data.items.map((requirement) => (
              <li key={requirement.requirementId} className="mb-2">
                <p>
                  <strong>Requirement ID:</strong> {requirement.requirementId}
                </p>
                <p>
                  <strong>Requirement Slug:</strong>{" "}
                  {requirement.requirementSlug}
                </p>
                <p>
                  <strong>Associated Entity:</strong>{" "}
                  {AssociatedEntity[requirement.associatedEntity]}
                </p>
                <p>
                  <strong>Requirement Level:</strong>{" "}
                  {RequirementLevel[requirement.requirementLevel]}
                </p>
                <p>
                  <strong>Value Type:</strong>{" "}
                  {ValueType[requirement.valueType]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No requirements found for this feature.</p>
      )}

      {error && (
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}
