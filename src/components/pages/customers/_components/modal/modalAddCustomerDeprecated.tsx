"use client";

import { Button, Form, Input, Modal, Select, Steps } from "antd";
import { useCallback, useState } from "react";
import { FaUser } from "react-icons/fa";

import {
  AddBankAccountSchemaPayload,
  IAddBankAccountMutationPayload,
} from "@/common/custom/hooks/api/mutation/bank-account/useAddBankAccountMutation";
import useAddCustomerMutation, {
  AddCustomerSchemaPayload,
  IAddCustomerMutationPayload,
} from "@/common/custom/hooks/api/mutation/customers/useAddCustomerMutation";
import {
  AddTaxSchemaPayload,
  IAddTaxMutationPayload,
} from "@/common/custom/hooks/api/mutation/tax/useAddTaxMutation";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { ContactCategoryEnum } from "@/common/interfaces/enum/contactCategory.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export const ModalAddCustomer = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm<IAddCustomerMutationPayload>();
  const [formBankAccount] = Form.useForm<IAddBankAccountMutationPayload>();
  const [formTax] = Form.useForm<IAddTaxMutationPayload>();

  const { mutate, isPending } = useAddCustomerMutation({});

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = AddCustomerSchemaPayload.safeParse(values);
    if (!parsed.success) {
      setCurrentStep(0);
      return setZodFormErrors(parsed.error, form);
    }
    const bankAccountValues = await formBankAccount.validateFields();
    const parsedBankAccount =
      AddBankAccountSchemaPayload.safeParse(bankAccountValues);
    if (!parsedBankAccount.success) {
      setCurrentStep(1);
      return setZodFormErrors(parsedBankAccount.error, formBankAccount);
    }
    const taxValues = await formTax.validateFields();
    const parsedTax = AddTaxSchemaPayload.safeParse(taxValues);
    if (!parsedTax.success) {
      setCurrentStep(2);
      return setZodFormErrors(parsedTax.error, formTax);
    }
    mutate(parsed.data);
  };

  const nextStep = useCallback(async () => {
    if (currentStep === 0) {
      const values = await form.validateFields();
      const parsed = AddCustomerSchemaPayload.safeParse(values);
      if (!parsed.success) return setZodFormErrors(parsed.error, form);
    }
    setCurrentStep((next) => next + 1);
  }, [currentStep, form]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStep(0);
    form.resetFields();
    formBankAccount.resetFields();
    formTax.resetFields();
  }, [form, formBankAccount, formTax]);

  const formSteps = [
    {
      title: "Customer Info",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
            required
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "City is required" }]}
            required
          >
            <Input placeholder="Enter city name" />
          </Form.Item>
          <Form.Item name="address1" label="Address Line 1">
            <Input.TextArea placeholder="e.g. Jl. Ir. Jend. Soekarno No. 13" />
          </Form.Item>
          <Form.Item name="address2" label="Address Line 2">
            <Input.TextArea placeholder="e.g. Apartment, Suite, Unit, etc." />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code">
            <Input placeholder="e.g. 91836" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Phone number is required" }]}
            required
          >
            <Input placeholder="e.g. 081234567890" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
            required
          >
            <Select>
              <Select.Option value={ContactCategoryEnum.USER}>
                User
              </Select.Option>
              <Select.Option value={ContactCategoryEnum.CUSTOMER}>
                Customer
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Bank Account Info",
      content: (
        <Form form={formBankAccount} layout="vertical">
          <Form.List name="bankAccounts">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: 16,
                      border: "1px solid #eee",
                      padding: 16,
                      borderRadius: 8,
                    }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "holderName"]}
                      label={`Holder Name`}
                    >
                      <Input placeholder="Holder name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "accountNumber"]}
                      label="Account Number"
                    >
                      <Input placeholder="Account number" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "bankTypeId"]}
                      label="Bank Type"
                    >
                      <Input placeholder="Bank Type" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "category"]}
                      label="Category"
                    >
                      <Select placeholder="Category">
                        <Select.Option value={BankAccountCategoryEnum.USER}>
                          User
                        </Select.Option>
                        <Select.Option value={BankAccountCategoryEnum.CUSTOMER}>
                          Customer
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Button
                      type="dashed"
                      danger
                      onClick={() => remove(field.name)}
                      style={{ marginTop: 8 }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<FaUser />}
                >
                  Add Bank Account
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      ),
    },
    {
      title: "Tax Info",
      content: (
        <Form form={formTax} layout="vertical">
          <Form.Item name="npwp" label="NPWP">
            <Input placeholder="NPWP" />
          </Form.Item>
          <Form.Item name="fgPpn" label="FGPPN">
            <Input placeholder="FGPPN" />
          </Form.Item>
          <Form.Item name="nppkp" label="NPPKP">
            <Input placeholder="NPPKP" />
          </Form.Item>
        </Form>
      ),
    },
  ];

  const stepItems = formSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        icon={<FaUser />}
        loading={false}
      >
        Add Customer
      </Button>

      <Modal
        title="Add New Customer"
        open={isModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        <Steps
          current={currentStep}
          items={stepItems}
          style={{ marginBottom: 24 }}
        />

        <div>{formSteps[currentStep].content}</div>

        <div style={{ marginTop: 24 }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < formSteps.length - 1 && (
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === formSteps.length - 1 && (
            <Button
              type="primary"
              htmlType="button"
              onClick={() => handleFinish()}
              loading={isPending}
            >
              Create Customer
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};
