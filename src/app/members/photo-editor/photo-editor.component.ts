import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApi } from 'src/app/_APi/User';
import { Photo } from 'src/app/_Models/photo';
import { AuthService } from 'src/app/_Services/auth.service';
import { HttpService } from 'src/app/_Services/http.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos:Photo[] = [];
  f:FormGroup = new FormGroup({
    file:new FormControl(null, [Validators.required])
  })
  /**
   *
   */
  formData: FormData = new FormData();

  constructor(private http:HttpService,private auth:AuthService) {

  }
  ngOnInit(): void {
  }

  uploadPhoto(event: any) {
    // this.stopAddunusablePhoto();
    let file = event.target.files[0];
    // console.log(this.file);
    this.formData.append('File', file, file.name);
    this.formData.append('Description',"sdfsdfsdf");
    this.formData.append('UserId',this.auth.user['_value'].nameid)
    this.f.controls['file'].setValue("asdadasd");
  }

  Done(){
    // console.log(this.formData.get('File'));
    // console.log(this.formData.get('Description'));
    // console.log(this.formData.get('UserId'));

    this.http.Post(UserApi.AddPhoto, this.formData).subscribe((res) => {
      // console.log(res);
      this.photos.push(res)
      //  console.log(this.AddSectionForm.value);
    });
    this.f.reset();
  }

  changePhoto(newId:number){
    let obj = {
      newPhotoId: newId,
      userId: this.auth.user['_value'].nameid
    }
    // console.log(obj);

    this.http.Post(UserApi.SetMain, obj).subscribe((res) => {
      // console.log(res);
    });
  }

  DeletePhoto(photoId:number){
    let obj = {
      newPhotoId: photoId,
      userId: this.auth.user['_value'].nameid
    }
    this.http.Post(`${UserApi.DeletePhoto}/${obj.newPhotoId}/${obj.userId}`, null).subscribe((res) => {
      console.log(res);
    });
    // console.log(obj);

  }
  // private stopAddunusablePhoto() {
  //   if (this.fileName.length > 0) {
  //     let photo = {
  //       userId: this.auth.user['_value'].nameid,
  //       name: this.fileName,
  //     };
  //     this.sub7 = this.http.Post(User.UnSavePhoto, photo).subscribe((res) => {
  //       // console.log(res);
  //     });
  //   }

  // }
}
