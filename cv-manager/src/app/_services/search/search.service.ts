import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooleanQuery } from 'src/app/_models/boolean-query';
import { SearchResult } from 'src/app/_models/search-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor(private httpClient: HttpClient) { }

getAll(): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application");

  return this.httpClient.get<SearchResult>(requestUrl);
}

searchByName(firstname: string, lastName: string): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-name");
  let params = new HttpParams();
  params = params.append('firstname', firstname);
  params = params.append('lastName', lastName);

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

searchApplicationsByEducationLevel(level: number): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-education-level");
  let params = new HttpParams();
  params = params.append('educationLevel', level.toString());

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

searchApplicationsByCoverLetterContent(content:string): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-cover-letter");
  let params = new HttpParams();
  params = params.append('content', content);

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

searchApplicationsByPhrase(phrase: string): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-phrase");
  let params = new HttpParams();
  params = params.append('phraseQuery', phrase);

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

searchApplicationsByBooleanQuery(query: BooleanQuery): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-bool-query");
  let params = new HttpParams();
  params = params.append('applicantFirstname', query.applicantFirstname);
  params = params.append('applicantLastname', query.applicantLastname);
  params = params.append('applicantEducationLevel', query.applicantEducationLevel);
  params = params.append('coverLetterContent', query.coverLetterContent);
  params = params.append('firstOperator', query.firstOperator);
  params = params.append('secondOperator', query.secondOperator);
  params = params.append('thirdOperator', query.thirdOperator);

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

searchByCityGeoLocation(cityName: string, radiusInKm: number): Observable<SearchResult>
{
  let requestUrl = environment.apiUrl.concat("api/admin/application/search-by-radius");
  let params = new HttpParams();
  params = params.append('city', cityName);
  params = params.append('radius', radiusInKm.toString());

  return this.httpClient.get<SearchResult>(requestUrl, {params: params});
}

}
