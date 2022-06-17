
import * as jspdf from 'jspdf'
import * as html2canvas from 'html2canvas'
import { Component, OnInit } from '@angular/core';
import { UserApi } from 'src/app/_APi/User';
import { User } from 'src/app/_Models/user';
import { HttpService } from 'src/app/_Services/http.service';

@Component({
  selector: 'app-all-members-report',
  templateUrl: './all-members-report.component.html',
  styleUrls: ['./all-members-report.component.scss']
})
export class AllMembersReportComponent implements OnInit {

  users: User[] = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.Get(UserApi.GetUsersExceptAdmin).subscribe((users:User[])=>{
      this.users=users;
      console.log(users);

     })
     }

     printAll(){
        var data:any = document.getElementById('print');
        html2canvas((data),{
          onclone: function (clonedDoc:any) {
              clonedDoc.getElementById('print').style.display = 'block';
          }
      }).then((canvas:any) => {
        var imgWidth = 195;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4');
        var position = 10;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        // pdf.save('MYPdf.pdf');//save pdf
        // pdf.output('dataurlnewwindow'); //with firefox only
        window.open(pdf.output('bloburl'),'_blank'); // with all browsers new page
      });
      }



}
