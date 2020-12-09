export interface Issue {
    readonly id: string;
}
  
export interface Vulnerability extends Issue {
  readonly id: string;
  readonly type: string;
  readonly language: string;
  readonly packageManager: string;
  readonly exploitMaturity: string;
  readonly isUpgradable: boolean;
  readonly isPinnable: boolean;
  readonly isPatchable: boolean;
  readonly isIgnored: boolean;
  readonly severity: Severity;
  readonly cvssScore: string;
}

export type Severity = 'low' | 'medium' | 'high';

export interface License extends Issue {
  title: string;
}