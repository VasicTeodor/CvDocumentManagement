import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BooleanQuery } from 'src/app/_models/boolean-query';
import { ApplicationSearchResult } from 'src/app/_models/search-result';
import { SearchService } from 'src/app/_services/search/search.service';
import { ValidationService } from 'src/app/_services/validation/validation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchForm = new FormGroup(
    {
      firstnameControl: new FormControl(''),
      phraseControl: new FormControl(''),
      lastNameControl: new FormControl(''),
      educationLevelControl: new FormControl('1'),
      cityNameControl: new FormControl(''),
      radiusControl: new FormControl(''),
      coverLetterContentControl: new FormControl(''),
    }
  );

  combinedSearchForm = new FormGroup(
    {
      firstnameControl: new FormControl('', Validators.required),
      lastnameControl: new FormControl('', Validators.required),
      educationLevelControl: new FormControl('1', Validators.required),
      coverLetterContentControl: new FormControl('', Validators.required),
      firstOperationControl: new FormControl('AND', Validators.required),
      secondOperationControl: new FormControl('AND', Validators.required),
      thirdOperationControl: new FormControl('AND', Validators.required),
    }
  );

  applicationsResult:ApplicationSearchResult[] = [];
  isLoading:boolean = false;

  constructor(private searchService: SearchService, 
              private toastr: ToastrService,
              private formValidationService: ValidationService) { }

  ngOnInit() {
    this.loadAllOnStart();
  }

  loadAllOnStart(): void{
    this.searchService.getAll().subscribe(
      data => {
        this.applicationsResult = data.result.searchResults;
        console.log(this.applicationsResult);
      }
    )
  }

  searchByApplicantName(): void{
    this.isLoading = true;
    let name = this.searchForm.controls['firstnameControl'].value || "";
    let lastName = this.searchForm.controls['lastNameControl'].value || "";
    this.searchService.searchByName(name, lastName).subscribe(
        data =>{
            this.isLoading = false;
            this.applicationsResult = data.result.searchResults;
            this.toastr.success("Search finished!");
        }, error =>{
          this.isLoading = false;
          this.toastr.error("Failed to fetch documents!");
        }
      )
  }

  searchByEducationLevel(): void{
    this.isLoading = true;
      let educationLevel = Number(this.searchForm.controls['educationLevelControl'].value) || 0
      this.searchService.searchApplicationsByEducationLevel(educationLevel)
      .subscribe(
        data =>{
            this.isLoading = false;
            this.applicationsResult = data.result.searchResults;
            this.toastr.success("Search finished!");
        }, error =>{
          this.toastr.error("Failed to fetch documents!");
          this.isLoading = false;
        }
      )
  }

  searchByCoverLetterContent(): void{
    this.isLoading = true;
    let content =  this.searchForm.controls['coverLetterContentControl'].value || "";
    this.searchService.searchApplicationsByCoverLetterContent(content)
      .subscribe(
        data =>{
          this.isLoading = false;
          this.applicationsResult = data.result.searchResults;
          this.toastr.success("Search finished!");
        }, error =>{
          this.toastr.error("Failed to fetch documents!");
          this.isLoading = false;
        }
      )
  }

  searchByDistanceFromCity(): void{
    this.isLoading = true;
    let radius =  Number(this.searchForm.controls['radiusControl'].value) || 0;
    let city =  this.searchForm.controls['cityNameControl'].value || "";
    this.searchService.searchByCityGeoLocation(city, radius)
      .subscribe(
        data =>{
            this.isLoading = false;
            this.applicationsResult = data.result.searchResults;
            this.toastr.success("Search finished!");
        }, error =>{
          this.toastr.error("Failed to fetch documents!");
          this.isLoading = false;
        }
      )
  }

  searchByPhraseQuery(): void{
    this.isLoading = true;
    let phrase = this.searchForm.controls['phraseControl'].value || "";
    this.searchService.searchApplicationsByPhrase(phrase)
      .subscribe(
        data =>{
            this.isLoading = false;
            this.applicationsResult = data.result.searchResults;
            this.toastr.success("Search finished!");
        }, error =>{
          this.toastr.error("Failed to fetch documents!");
          this.isLoading = false;
        }
      )
  }

  searchWithBooleanQuery(): void{
    if(!this.combinedSearchForm.valid)
    {
      this.formValidationService.validateAllFields(this.combinedSearchForm);
      return; 
    }
    this.isLoading = true;
    let firstname = this.combinedSearchForm.controls['firstnameControl'].value || "";
    let lastName = this.combinedSearchForm.controls['lastnameControl'].value || "";
    let education = Number(this.combinedSearchForm.controls['educationLevelControl'].value) || 0;
    let coverLetter = this.combinedSearchForm.controls['coverLetterContentControl'].value || "";
    let operation1 = this.combinedSearchForm.controls['firstOperationControl'].value || "AND";
    let operation2 = this.combinedSearchForm.controls['secondOperationControl'].value || "AND";
    let operation3 = this.combinedSearchForm.controls['thirdOperationControl'].value || "AND";

    let query = new BooleanQuery(firstname, lastName, education, coverLetter, operation1, operation2, operation3);

      this.searchService.searchApplicationsByBooleanQuery(query).subscribe(
        data =>{
            this.isLoading = false;
            this.applicationsResult = data.result.searchResults;
            this.toastr.success("Search finished!");
        }, error =>{
          this.toastr.error("Failed to fetch documents!");
          this.isLoading = false;
        }
      )
  }
}
