"use client";

import { usePostEntityHook } from "@/hooks/usePostEntityHook";
import { useRouter } from "next/navigation";
import { Button, Input, Typography, Alert, Divider, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { CreateEntityType, EntityType } from "@/types";
import * as Yup from "yup";
import NationalitySelector from "@/components/NationalitySelector";

const { Title } = Typography;

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(["INDIVIDUAL", "BUSINESS"], "Invalid entity type")
    .required("Entity type is required"),
  requirements: Yup.array()
    .of(
      Yup.object({
        requirementSlug: Yup.string().required("Requirement slug is required"),
        value: Yup.string().required("Requirement value is required"),
      })
    )
    .required("Requirements are required"),
});

export default function CreateEntityPage() {
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess, error } = usePostEntityHook();

  const initialValues: CreateEntityType = {
    externalId: Math.random().toString(36).substring(2, 15),
    requirements: [
      { requirementSlug: "individual-entity-name", value: "" },
      { requirementSlug: "nationality", value: "" },
    ],
    type: EntityType.INDIVIDUAL,
  };

  const handleSubmit = (values: CreateEntityType) => {
    mutate(values, {
      onSuccess: (data) => {
        const { id: entityId } = data;
        router.push(`/kyc/proof-of-address/${entityId}`);
      },
    });
  };

  const requirementTooltips: Record<string, string> = {
    "individual-entity-name": "The full name of the individual entity.",
    nationality: "The nationality of the individual.",
  };

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
                        .toUpperCase()}
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
