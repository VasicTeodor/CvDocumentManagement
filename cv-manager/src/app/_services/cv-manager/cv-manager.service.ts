import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApplicationCreated } from 'src/app/_models/application-created';

@Injectable({
  providedIn: 'root'
})
export class CvManagerService {

constructor(private httpClient: HttpClient) { }

addApplication(applicantFirstname: string,
                      applicantLastname: string,
                      applicantPhone: string,
                      applicantEmail: string,
                      applicantEducationlevel: number,
                      cityName: string,
                      cvFile:any,
                      coverLetter:any):Observable<ApplicationCreated>
  {
    let requestUrl = environment.apiUrl.concat("api/application/create");
    const formData = new FormData();
    formData.append('applicantFirstname', applicantFirstname);
    formData.append('applicantLastname', applicantLastname);
    formData.append('applicantPhone', applicantPhone);
    formData.append('applicantEmail', applicantEmail);
    formData.append('cityName', cityName);
    formData.append('applicantEducationlevel', applicantEducationlevel.toString());
    formData.append('cvFile', cvFile);
    formData.append('coverLetterFile', coverLetter);

    return this.httpClient.post<ApplicationCreated>(requestUrl, formData);
  }

  downloadCvFromApplication(applicationId: string): Observable<any> {
    let requestUrl = environment.apiUrl.concat(`api/admin/application/download-cv/${applicationId}`);
      return this.httpClient.get(requestUrl, {responseType: 'blob'});
  }
}