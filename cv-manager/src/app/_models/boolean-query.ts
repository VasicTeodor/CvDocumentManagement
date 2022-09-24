export class BooleanQuery {
    applicantFirstname: string;
    applicantLastname: string; 
    applicantEducationLevel: number; 
    coverLetterContent: string; 
    firstOperator: string; 
    secondOperator: string; 
    thirdOperator: string; 

    constructor(applicantFirstname: string,
                applicantLastname: string,
                applicantEducationLevel: number, 
                coverLetterContent: string, 
                firstOperator: string,
                secondOperator: string, 
                thirdOperator: string)
                {
                    this.applicantEducationLevel = applicantEducationLevel;
                    this.applicantFirstname = applicantFirstname;
                    this.applicantLastname = applicantLastname;
                    this.coverLetterContent = coverLetterContent;
                    this.firstOperator = firstOperator;
                    this.secondOperator = secondOperator;
                    this.thirdOperator = thirdOperator;
                }
}
