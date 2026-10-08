export interface QuestionnaireAnswers {
  age?: number;
  gender?: 'male' | 'female' | 'transgender';
  state?: string;
  residenceArea?: 'rural' | 'urban';
  socialCategory?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  occupation?:
    | 'farmer'
    | 'agricultural_labour'
    | 'artisan_craftsperson'
    | 'street_vendor'
    | 'daily_wage_worker'
    | 'small_business_owner'
    | 'student'
    | 'homemaker'
    | 'salaried_private'
    | 'government_employee'
    | 'unemployed'
    | 'retired';
  annualIncomeBracket?: 'below_1lakh' | '1lakh_to_2.5lakh' | '2.5lakh_to_5lakh' | '5lakh_to_8lakh' | 'above_8lakh';
  landholding?: 'none' | 'marginal_less_than_1ha' | 'small_1_to_2ha' | 'medium_large_above_2ha';
  hasRationCard?: 'none' | 'apl' | 'bpl' | 'aay_antyodaya';
  specialAttributes?: string[]; // 'disability', 'widow', 'girl_child_under_10', 'pregnant_lactating', 'has_unshaded_rooftop'
}

export interface QuestionStep {
  id: keyof QuestionnaireAnswers;
  stepNumber: number;
  title: string;
  titleHindi: string;
  subtitle: string;
  subtitleHindi: string;
  whyThisMatters: string;
  whyThisMattersHindi: string;
  type: 'select_single' | 'number' | 'select_cards' | 'multi_checkbox';
  options?: {
    value: string;
    label: string;
    labelHindi: string;
    description?: string;
    descriptionHindi?: string;
    iconName?: string;
  }[];
  placeholder?: string;
  min?: number;
  max?: number;
}
