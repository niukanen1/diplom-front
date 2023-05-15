export interface group {
    id: number;
    nameEt: string;
    nameEn: string;
    curriculum: number;
    merCode: string;
    curriculumVersion: number;
    studyForm: 'OPPEVORM_Z' | 'OPPEVORM_P' | 'OPPEVORM_J';
    language: 'OPPEKEEL_E' | 'OPPEKEEL_V';
    validFrom: string;
    validThru: string | null;
    isBasic: boolean;
    isSecondary: boolean;
    isVocational: boolean;
    isHigher: boolean;
    isOccupied: boolean | null;
    nameRu: string | null;
  }