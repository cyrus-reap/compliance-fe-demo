"use client";

import { useRouter } from "next/navigation";
import { Button, Input, Typography, Alert, Divider, Tooltip, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { usePostEntityHook } from "@/hooks/usePostEntityHook";
import { useGetFeatureRequirementsHook } from "@/hooks/useGetFeatureRequirementsHook";
import {
  CreateEntityType,
  EntityType,
  RequirementLevel,
  ValueType,
} from "@/types";
import * as Yup from "yup";
import NationalitySelector from "@/components/NationalitySelector";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["INDIVIDUAL", "BUSINESS"], "Invalid entity type")
    .required("Entity type is required"),
  requirements: Yup.array().of(
    Yup.object().shape({
      requirementSlug: Yup.string().required("Requirement slug is required"),
      value: Yup.mixed().test(
        "is-required",
        "Value is required",
        function (value) {
          const { parent } = this;
          return (
            parent.requirementLevel !== RequirementLevel.REQUIRED || !!value
          );
        }
      ),
    })
  ),
});

const requirementsSlugToSkip = [
  "jumio-identity",
  "entity-name",
  "proof-of-address",
  "sanction-screening",
];

const valueTypeToSkip = [ValueType.FILE, ValueType.JSON];

export default function CreateEntityPage() {
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess, error } = usePostEntityHook();

  const { data, isLoading } = useGetFeatureRequirementsHook(
    "86613565-82fc-405e-a565-40d2d35b317e"
  );

  const initialRequirements =
    data?.items
      ?.filter(
        (requirement) =>
          !requirementsSlugToSkip.includes(requirement.requirementSlug) &&
          !valueTypeToSkip.includes(requirement.valueType)
      )
      .map((requirement) => ({
        requirementSlug: requirement.requirementSlug,
        value: "",
        requirementLevel: requirement.requirementLevel,
      })) || [];

  const initialValues: CreateEntityType = {
    externalId: Math.random().toString(36).substring(2, 15),
    requirements: initialRequirements,
    type: EntityType.INDIVIDUAL,
  };

  const handleSubmit = (values: CreateEntityType) => {
    const filteredValues = {
      ...values,
      requirements: (values.requirements || [])
        .filter((req) => req.value)
        .map(({ requirementSlug, value }) => ({ requirementSlug, value })), // Exclude `requirementLevel`
    };

    mutate(filteredValues, {
      onSuccess: (data) => {
        const { id: entityId } = data;
        router.push(`/kyc/proof-of-address/${entityId}`);
      },
    });
  };

  const requirementTooltips: Record<string, string> = {
    "individual-entity-name": "The full name of the individual entity.",
    nationality: "The nationality of the individual.",
    "phone-number": "The phone number including country code.",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Title level={2}>Create Entity</Title>

      {isError && (
        <Alert
          type="error"
          message="Error"
          description={(error as Error)?.message || "Failed to create entity"}
          className="mb-4"
        />
      )}

      {isSuccess && (
        <Alert
          type="success"
          message="Success"
          description="Entity created successfully."
          className="mb-4"
        />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ touched, errors, setFieldValue, values }: any) => (
          <Form className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
            <div className="flex gap-4">
              <Button
                type={values.type === "INDIVIDUAL" ? "primary" : "default"}
                onClick={() => setFieldValue("type", "INDIVIDUAL")}
                className="w-full"
              >
                Individual
              </Button>
              <Tooltip title="Business option is currently unavailable">
                <Button type="default" disabled className="w-full">
                  Business
                </Button>
              </Tooltip>
              {touched.type && errors.type && (
                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
              )}
            </div>

            <Divider />

            <div>
              <Title level={4} className="mb-2">
                Requirements
              </Title>
              {values.requirements.map((requirement: any, index: number) => (
                <div key={index} className="mb-8 rounded">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`requirements.${index}.value`}
                      className="block font-medium mb-1"
                    >
                      {requirement.requirementSlug
                        .replace(/-/g, " ")
                        .toUpperCase()}{" "}
                      {requirement.requirementLevel ===
                        RequirementLevel.REQUIRED && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <Tooltip
                      title={
                        requirementTooltips[requirement.requirementSlug] ||
                        "No information available"
                      }
                    >
                      <InfoCircleOutlined className="text-gray-500" />
                    </Tooltip>
                  </div>

                  {requirement.requirementSlug === "nationality" ? (
                    <NationalitySelector
                      value={requirement.value}
                      onChange={(value: string) =>
                        setFieldValue(`requirements.${index}.value`, value)
                      }
                    />
                  ) : requirement.requirementSlug === "phone-number" ? (
                    <PhoneNumberInput
                      value={requirement.value}
                      onChange={(value) =>
                        setFieldValue(`requirements.${index}.value`, value)
                      }
                    />
                  ) : (
                    <Field
                      name={`requirements.${index}.value`}
                      as={Input}
                      placeholder={`Enter value for ${requirement.requirementSlug
                        .replace(/-/g, " ")
                        .toUpperCase()}`}
                      className={
                        touched.requirements?.[index]?.value &&
                        errors.requirements?.[index]?.value
                          ? "border-red-500"
                          : ""
                      }
                    />
                  )}
                  <ErrorMessage
                    name={`requirements.${index}.value`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? "" : "Create Entity"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
