import { Component, Input, OnInit } from '@angular/core';
import { ApplicationSearchResult } from 'src/app/_models/search-result';
import { CvManagerService } from 'src/app/_services/cv-manager/cv-manager.service';
import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit {

  @Input() application: ApplicationSearchResult | undefined;

  constructor(private cvManagerService: CvManagerService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  downloadFile() {
    let docId = this.application!.application.id;
		this.cvManagerService.downloadCvFromApplication(docId).subscribe(
      (response: Blob) => { 
        const objectUrl = URL.createObjectURL(response);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = this.application?.application.cvFileName || "CV.pdf";
        a.click();
        URL.revokeObjectURL(objectUrl);
        console.log(response);
        // fileSaver.saveAs(response, this.application?.application.cvFileName);
        this.toastr.success("Document saved succesful");
		},
     error =>
     {
      this.toastr.error("Failed to download document");
     }
    )
  }

}
