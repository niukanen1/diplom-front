export interface mark {
    entryId: number;
    entryCode: string | null;
    nameEt: string;
    nameEn: string | null;
    content: string | null;
    grade: {
      code: string;
      gradingSchemaRowId: number | null;
    };
    verbalGrade: string | null;
    gradeInserted: string;
    addInfo: string | null;
    omoduleThemeNameEt: string | null;
    periodEventValue: string | null;
  }

