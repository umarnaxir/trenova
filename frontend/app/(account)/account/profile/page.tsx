"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, KeyRound, LogOut, ShieldOff, Trash2 } from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
import {
  Accordion,
  AccordionBody,
  AccordionList,
  AccordionTrigger,
  Badge,
  ControlButton,
  ControlLink,
  EmptyNote,
  FormFull,
  FormGrid,
  Page,
  SectionHead,
  SectionLink,
  Subtitle,
  Title,
} from "@/features/account/AccountProfile.styles";

const profileSchema = z.object({
  firstName: z.string().min(2, "Enter first name"),
  lastName: z.string().min(2, "Enter last name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(4, "Enter current password"),
    newPassword: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Confirm new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileValues = z.infer<typeof profileSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const changePassword = useAuthStore((state) => state.changePassword);
  const logout = useAuthStore((state) => state.logout);
  const pushToast = useUiStore((state) => state.pushToast);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: profileState,
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: passwordState,
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (!user) return;
    resetProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
    });
  }, [user, resetProfile]);

  function toggle(id: string) {
    setOpenPanel((current) => (current === id ? null : id));
  }

  return (
    <Page>
      <div>
        <Title>Profile</Title>
        <Subtitle>
          Open a section to view or edit your details, password, and addresses.
        </Subtitle>
      </div>

      <AccordionList>
        <Accordion $open={openPanel === "details"}>
          <AccordionTrigger
            type="button"
            $open={openPanel === "details"}
            onClick={() => toggle("details")}
          >
            <div>
              <strong>Account details</strong>
              <span>
                {user?.firstName} {user?.lastName} · {user?.email}
              </span>
            </div>
            <ChevronDown size={18} aria-hidden />
          </AccordionTrigger>
          {openPanel === "details" ? (
            <AccordionBody>
              <form
                onSubmit={handleProfileSubmit(async (values) => {
                  await updateProfile(values);
                  pushToast("Profile updated");
                })}
              >
                <FormGrid>
                  <Input
                    label="First name"
                    error={profileState.errors.firstName?.message}
                    {...registerProfile("firstName")}
                  />
                  <Input
                    label="Last name"
                    error={profileState.errors.lastName?.message}
                    {...registerProfile("lastName")}
                  />
                  <Input
                    label="Email"
                    type="email"
                    error={profileState.errors.email?.message}
                    {...registerProfile("email")}
                  />
                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    error={profileState.errors.phone?.message}
                    {...registerProfile("phone")}
                  />
                  <FormFull>
                    <Button type="submit" disabled={profileState.isSubmitting}>
                      Save changes
                    </Button>
                  </FormFull>
                </FormGrid>
              </form>
            </AccordionBody>
          ) : null}
        </Accordion>

        <Accordion $open={openPanel === "password"}>
          <AccordionTrigger
            type="button"
            $open={openPanel === "password"}
            onClick={() => toggle("password")}
          >
            <div>
              <strong>Password</strong>
              <span>Change password or use forgot password</span>
            </div>
            <ChevronDown size={18} aria-hidden />
          </AccordionTrigger>
          {openPanel === "password" ? (
            <AccordionBody>
              <SectionHead>
                <div>
                  <h2>Change password</h2>
                  <p>Enter your current password, then the new one.</p>
                </div>
                <SectionLink href="/forgot-password">Forgot password?</SectionLink>
              </SectionHead>
              <form
                onSubmit={handlePasswordSubmit(async (values) => {
                  const { ok, error } = await changePassword(
                    values.currentPassword,
                    values.newPassword,
                  );
                  if (!ok) {
                    pushToast(error || "Current password is incorrect", "error");
                    return;
                  }
                  resetPassword({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  pushToast("Password updated");
                })}
              >
                <FormGrid>
                  <Input
                    label="Current password"
                    type="password"
                    autoComplete="current-password"
                    error={passwordState.errors.currentPassword?.message}
                    {...registerPassword("currentPassword")}
                  />
                  <Input
                    label="New password"
                    type="password"
                    autoComplete="new-password"
                    error={passwordState.errors.newPassword?.message}
                    {...registerPassword("newPassword")}
                  />
                  <FormFull>
                    <Input
                      label="Confirm new password"
                      type="password"
                      autoComplete="new-password"
                      error={passwordState.errors.confirmPassword?.message}
                      {...registerPassword("confirmPassword")}
                    />
                  </FormFull>
                  <FormFull>
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={passwordState.isSubmitting}
                    >
                      <KeyRound size={14} aria-hidden />
                      Change password
                    </Button>
                  </FormFull>
                </FormGrid>
              </form>
            </AccordionBody>
          ) : null}
        </Accordion>

        {(user?.addresses ?? []).map((address, index) => {
          const id = `address-${address.id}`;
          return (
            <Accordion key={address.id} $open={openPanel === id}>
              <AccordionTrigger
                type="button"
                $open={openPanel === id}
                onClick={() => toggle(id)}
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
              {openPanel === id ? (
                <AccordionBody>
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
                  <SectionLink href="/account/addresses" scroll={false}>
                    Manage addresses
                  </SectionLink>
                </AccordionBody>
              ) : null}
            </Accordion>
          );
        })}
      </AccordionList>

      {!user?.addresses?.length ? (
        <EmptyNote>
          No addresses yet. Add up to 5 from Addresses.
        </EmptyNote>
      ) : null}

      <AccordionList>
        <Accordion $open={openPanel === "signout"}>
          <AccordionTrigger
            type="button"
            $open={openPanel === "signout"}
            onClick={() => toggle("signout")}
          >
            <div>
              <strong>Sign out</strong>
              <span>End this session on your device.</span>
            </div>
            <ChevronDown size={18} aria-hidden />
          </AccordionTrigger>
          {openPanel === "signout" ? (
            <AccordionBody>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#4A4A4A" }}>
                You will need your email and password the next time you sign in.
              </p>
              <ControlButton type="button" onClick={() => setSignOutOpen(true)}>
                <LogOut size={13} aria-hidden />
                Sign out
              </ControlButton>
            </AccordionBody>
          ) : null}
        </Accordion>

        <Accordion $open={openPanel === "deactivate"}>
          <AccordionTrigger
            type="button"
            $open={openPanel === "deactivate"}
            onClick={() => toggle("deactivate")}
          >
            <div>
              <strong>Deactivate account</strong>
              <span>Pause access up to 6 months; reactivate anytime.</span>
            </div>
            <ChevronDown size={18} aria-hidden />
          </AccordionTrigger>
          {openPanel === "deactivate" ? (
            <AccordionBody>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#4A4A4A" }}>
                Your account stays recoverable for 6 months. After that it may
                be deleted automatically.
              </p>
              <ControlLink href="/account/profile/deactivate" scroll={false}>
                <ShieldOff size={13} aria-hidden />
                Continue to deactivate
              </ControlLink>
            </AccordionBody>
          ) : null}
        </Accordion>

        <Accordion $open={openPanel === "delete"}>
          <AccordionTrigger
            type="button"
            $open={openPanel === "delete"}
            onClick={() => toggle("delete")}
          >
            <div>
              <strong>Delete account</strong>
              <span>Permanent removal after 24 hours.</span>
            </div>
            <ChevronDown size={18} aria-hidden />
          </AccordionTrigger>
          {openPanel === "delete" ? (
            <AccordionBody>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#4A4A4A" }}>
                This cannot be undone. You will not be able to activate this
                account again.
              </p>
              <ControlLink href="/account/profile/delete" scroll={false} $danger>
                <Trash2 size={13} aria-hidden />
                Continue to delete
              </ControlLink>
            </AccordionBody>
          ) : null}
        </Accordion>
      </AccordionList>

      <ConfirmDialog
        open={signOutOpen}
        title="Are you sure you want to sign out?"
        message="You will need to enter your email and password the next time you want to access your account, orders, and saved addresses."
        confirmLabel="Sign out"
        cancelLabel="Stay signed in"
        onCancel={() => setSignOutOpen(false)}
        onConfirm={() => {
          setSignOutOpen(false);
          logout();
          pushToast("Signed out");
          router.replace("/login");
        }}
      />
    </Page>
  );
}
