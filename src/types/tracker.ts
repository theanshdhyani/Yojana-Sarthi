export type ApplicationStatus =
  | 'to_apply'
  | 'under_review'
  | 'approved'
  | 'action_required'
  | 'rejected';

export interface ApplicationTimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TrackedApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  schemeNameHindi: string;
  beneficiaryName: string;
  referenceNumber: string;
  appliedDate: string;
  status: ApplicationStatus;
  portalUrl?: string;
  notes?: string;
  timeline: ApplicationTimelineEvent[];
  lastUpdated: string;
}
