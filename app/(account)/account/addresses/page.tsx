"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import type { Address } from "@/types/user";
import {
  Accordion,
  AccordionBody,
  AccordionList,
  AccordionTrigger,
  Badge,
  DefaultCheck,
  EmptyNote,
  FormFull,
  FormGrid,
  Page,
  Subtitle,
  Title,
} from "@/features/account/AccountProfile.styles";

const MAX_ADDRESSES = 5;

const schema = z.object({
  label: z.string().min(2, "Enter a label"),
  fullName: z.string().min(2, "Enter full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  alternatePhone: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.trim().length === 0 || value.trim().length >= 10,
      "Enter a valid alternate phone",
    ),
  line1: z.string().min(3, "Enter address line 1"),
  line2: z.string().optional(),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  postalCode: z.string().min(4, "Enter postal code"),
  country: z.string().min(2, "Enter country"),
  isDefault: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

function createId() {
  return `addr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function emptyValues(user?: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: Address[];
}): FormValues {
  return {
    label: "Home",
    fullName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
    phone: user?.phone ?? "",
    alternatePhone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: !user?.addresses?.length,
  };
}

type AddressFormProps = {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  errors: ReturnType<typeof useForm<FormValues>>["formState"]["errors"];
  isSubmitting: boolean;
  isNew: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
};

function AddressForm({
  register,
  errors,
  isSubmitting,
  isNew,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <FormGrid>
        <Input
          label="Label"
          placeholder="Home / Office"
          error={errors.label?.message}
          {...register("label")}
        />
        <Input
          label="Full name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Phone number"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Alternate phone number"
          type="tel"
          placeholder="Optional secondary number"
          error={errors.alternatePhone?.message}
          {...register("alternatePhone")}
        />
        <FormFull>
          <Input
            label="Address line 1"
            error={errors.line1?.message}
            {...register("line1")}
          />
        </FormFull>
        <FormFull>
          <Input label="Address line 2" {...register("line2")} />
        </FormFull>
        <Input label="City" error={errors.city?.message} {...register("city")} />
        <Input
          label="State"
          error={errors.state?.message}
          {...register("state")}
        />
        <Input
          label="Postal code"
          error={errors.postalCode?.message}
          {...register("postalCode")}
        />
        <Input
          label="Country"
          error={errors.country?.message}
          {...register("country")}
        />
        <FormFull>
          <DefaultCheck>
            <input type="checkbox" {...register("isDefault")} />
            Set as default address
          </DefaultCheck>
        </FormFull>
        <FormFull>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Button type="submit" disabled={isSubmitting}>
              {isNew ? "Save address" : "Update address"}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </FormFull>
      </FormGrid>
    </form>
  );
}

export default function AddressesPage() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const pushToast = useUiStore((state) => state.pushToast);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyValues(user ?? undefined),
  });

  const addresses = user?.addresses ?? [];
  const canAdd = addresses.length < MAX_ADDRESSES;

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  function startEdit(address: Address) {
    setEditingId(address.id);
    setOpenId(address.id);
    reset({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      alternatePhone: address.alternatePhone ?? "",
      line1: address.line1,
      line2: address.line2 ?? "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: Boolean(address.isDefault),
    });
  }

  function startCreate() {
    setEditingId("new");
    setOpenId("new");
    reset(emptyValues(user ?? undefined));
  }

  function cancelForm() {
    setEditingId(null);
    reset(emptyValues(user ?? undefined));
  }

  function saveAddresses(next: Address[]) {
    let addressesNext = next;
    if (!addressesNext.some((address) => address.isDefault) && addressesNext[0]) {
      addressesNext = addressesNext.map((address, index) => ({
        ...address,
        isDefault: index === 0,
      }));
    }
    updateProfile({ addresses: addressesNext });
  }

  function onSubmit(values: FormValues) {
    if (!user) return;
    if (editingId === "new" && addresses.length >= MAX_ADDRESSES) {
      pushToast("You can save up to 5 addresses", "error");
      return;
    }

    const nextAddress: Address = {
      id: editingId && editingId !== "new" ? editingId : createId(),
      label: values.label,
      fullName: values.fullName,
      phone: values.phone,
      alternatePhone: values.alternatePhone?.trim() || undefined,
      line1: values.line1,
      line2: values.line2 || undefined,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: values.country,
      isDefault: Boolean(values.isDefault),
    };

    let next = addresses.map((address) =>
      address.id === nextAddress.id ? nextAddress : address,
    );
    if (editingId === "new" || !addresses.some((item) => item.id === nextAddress.id)) {
      next = [...addresses, nextAddress];
    }
    if (nextAddress.isDefault) {
      next = next.map((address) => ({
        ...address,
        isDefault: address.id === nextAddress.id,
      }));
    }

    saveAddresses(next);
    pushToast(editingId === "new" ? "Address added" : "Address updated");
    cancelForm();
    setOpenId(nextAddress.id);
  }

  function removeAddress(id: string) {
    if (!user) return;
    saveAddresses(addresses.filter((address) => address.id !== id));
    pushToast("Address removed");
    if (editingId === id) cancelForm();
    if (openId === id) setOpenId(null);
  }

  const form = (
    <AddressForm
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      isNew={editingId === "new"}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={cancelForm}
    />
  );

  return (
    <Page>
      <div>
        <Title>Addresses</Title>
        <Subtitle>
          Save up to {MAX_ADDRESSES} delivery addresses. Open one to view or edit.
        </Subtitle>
      </div>

      {!addresses.length && editingId !== "new" ? (
        <EmptyNote>No addresses yet. Add your first address below.</EmptyNote>
      ) : null}

      <AccordionList>
        {addresses.map((address, index) => {
          const open = openId === address.id;
          const editing = editingId === address.id;
          return (
            <Accordion key={address.id} $open={open}>
              <AccordionTrigger
                type="button"
                $open={open}
                onClick={() => toggle(address.id)}
              >
                <div>
                  <strong>
                    Address {index + 1} · {address.label}
                    {address.isDefault ? " · Default" : ""}
                  </strong>
                  <span>
                    {address.line1}, {address.city}
                  </span>
                </div>
                <ChevronDown size={18} aria-hidden />
              </AccordionTrigger>
              {open ? (
                <AccordionBody>
                  {editing ? (
                    form
                  ) : (
                    <>
                      {address.isDefault ? <Badge>Default</Badge> : null}
                      <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5 }}>
                        {address.fullName}
                        <br />
                        Phone: {address.phone}
                        {address.alternatePhone
                          ? ` · Alt: ${address.alternatePhone}`
                          : ""}
                        <br />
                        {address.line1}
                        {address.line2 ? `, ${address.line2}` : ""}
                        <br />
                        {address.city}, {address.state} {address.postalCode}
                        <br />
                        {address.country}
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => startEdit(address)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddress(address.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </>
                  )}
                </AccordionBody>
              ) : null}
            </Accordion>
          );
        })}

        {canAdd ? (
          <Accordion $open={openId === "new"}>
            <AccordionTrigger
              type="button"
              $open={openId === "new"}
              onClick={() => {
                if (openId === "new") {
                  cancelForm();
                  setOpenId(null);
                  return;
                }
                startCreate();
              }}
            >
              <div>
                <strong>Address {addresses.length + 1} · Add new</strong>
                <span>Add another delivery address ({addresses.length}/{MAX_ADDRESSES})</span>
              </div>
              <ChevronDown size={18} aria-hidden />
            </AccordionTrigger>
            {openId === "new" ? (
              <AccordionBody>
                {form}
              </AccordionBody>
            ) : null}
          </Accordion>
        ) : (
          <EmptyNote>Maximum of {MAX_ADDRESSES} addresses reached.</EmptyNote>
        )}
      </AccordionList>
    </Page>
  );
}
