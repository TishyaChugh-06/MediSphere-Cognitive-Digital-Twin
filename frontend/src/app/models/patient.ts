export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  birthDate: string;
}

export type VitalStatus = 'normal' | 'watch' | 'critical';

export interface VitalSign {
  label: string;
  value: string;
  unit: string;
  status: VitalStatus;
}

export interface LabResult {
  test: string;
  value: string;
  unit: string;
  referenceRange: string;
}

export interface FhirResourceStatus {
  resourceType: string;
  status: 'Loaded' | 'Planned' | 'Pending';
  detail: string;
}

export type CheckStatus = 'pass' | 'watch' | 'fail';

export interface ValidationCheck {
  label: string;
  status: CheckStatus;
  detail: string;
}

export type UserRole = 'clinician' | 'patient';