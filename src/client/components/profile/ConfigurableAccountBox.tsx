// components/profile/ConfigurableAccountBox.tsx
import { useTimer } from "@hooks/useTimer";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

export type FieldType = "text" | "email" | "password" | "number" | "select";
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  editable: boolean;
  showResetLink?: boolean;
  resetLinkUrl?: string;
  multiline?: boolean;
  placeholder?: string;
  validate?: (value: string) => string | null;
  options?: Array<{ value: string; label: string }>;
}

interface Props {
  fieldConfigs: Array<FieldConfig>;
  initialData: Record<string, string>;
  onSave: (updates: Record<string, string>) => void | Promise<void>;
  showHeader?: boolean;
  title?: string;
}

export function ConfigurableAccountBox({ fieldConfigs, initialData, onSave, showHeader = true, title = "Account Settings" }: Props) {
  const { handleSubmit, register, reset, watch } = useForm<Record<string, string>>();
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { seconds, startTimer, timerRunning } = useTimer();

  const formValues = watch();

  // seed form whenever initialData changes
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  // real-time validation
  useEffect(() => {
    if (!isEditing) return;

    const errors: Record<string, string> = {};
    fieldConfigs.forEach((cfg) => {
      if (cfg.validate && cfg.editable) {
        const value = formValues[cfg.name] || "";
        const error = cfg.validate(value);
        if (error) {
          errors[cfg.name] = error;
        }
      }
    });
    setValidationErrors(errors);
  }, [formValues, fieldConfigs, isEditing]);

  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    if (hasValidationErrors) return;

    console.log("data, ", data);
    const updates: Record<string, string> = {};
    fieldConfigs.forEach((cfg) => {
      if (cfg.editable) {
        const v = data[cfg.name] || "";
        if (v !== (initialData[cfg.name] || "")) updates[cfg.name] = v;
      }
    });
    console.log("updates: ", updates);
    await onSave(updates);

    setIsEditing(false);
  };

  const handleResetButtonClicked = (e: React.MouseEvent, resetLink: string) => {
    e.preventDefault();
    if (timerRunning) return;
    try {
      fetch(resetLink, {
        method: "POST",
        body: JSON.stringify({ email: initialData.email || "" }),
      });

      startTimer(10);
    } catch (err) {
      console.log("Password reset email couldn't be sent.", err);
    }
  };

  const formContent = (
    <form id="accountSettingsForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fieldConfigs.map((cfg) => {
          const hasError = validationErrors[cfg.name];
          const errorClass = hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border";

          return (
            <div key={cfg.name} className="flex flex-col gap-2">
              <label className="pl-2 font-medium">{cfg.label}</label>

              {isEditing && cfg.editable ? (
                <>
                  {cfg.type === "select" ? (
                    <select {...register(cfg.name)} className={`rounded-lg border bg-card px-4 py-2 text-foreground ${errorClass}`}>
                      <option value="">{cfg.placeholder || "Select an option"}</option>
                      {cfg.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : cfg.multiline ? (
                    <textarea
                      rows={3}
                      {...register(cfg.name)}
                      placeholder={cfg.placeholder}
                      className={`rounded-lg border bg-card px-4 py-2 text-foreground ${errorClass}`}
                    />
                  ) : (
                    <input
                      type={cfg.type}
                      {...register(cfg.name)}
                      placeholder={cfg.placeholder}
                      className={`rounded-lg border bg-card px-4 py-2 text-foreground ${errorClass}`}
                    />
                  )}
                  {hasError && <span className="text-sm text-red-500">{hasError}</span>}
                </>
              ) : cfg.name === "password" ? (
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg bg-muted px-4 py-2 text-foreground">••••••••</div>
                  {cfg.showResetLink && cfg.resetLinkUrl && isEditing && (
                    <a
                      href={cfg.resetLinkUrl}
                      onClick={(e) => handleResetButtonClicked(e, cfg.resetLinkUrl || "")}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {timerRunning ? `Can send link again in (${seconds}s)` : "Send password reset link"}
                    </a>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-muted px-4 py-2 text-foreground">{initialData[cfg.name] || "-"}</div>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );

  const headerContent = showHeader ? (
    <div className="mb-6 flex items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="ml-auto flex gap-8">
        {isEditing && (
          <button
            type="submit"
            form="accountSettingsForm"
            disabled={hasValidationErrors}
            className={`flex items-center gap-2 ${hasValidationErrors ? "cursor-not-allowed opacity-50" : "hover:scale-105"}`}
          >
            <Icon icon="material-symbols:save" width="24" height="24" color={hasValidationErrors ? "#9CA3AF" : "#0668B3"} />
            <p className={`font-semibold ${hasValidationErrors ? "text-gray-400" : "text-saseBlue"}`}>Save Changes</p>
          </button>
        )}
        <button type="button" className="flex items-center gap-2 hover:scale-105" onClick={() => setIsEditing((p) => !p)}>
          <Icon icon={isEditing ? "material-symbols:close" : "material-symbols:edit"} width="24" height="24" color="#0668B3" />
          <p className="font-semibold text-saseBlue">{isEditing ? "Cancel" : "Edit"}</p>
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      {headerContent}
      {formContent}
    </>
  );
}
