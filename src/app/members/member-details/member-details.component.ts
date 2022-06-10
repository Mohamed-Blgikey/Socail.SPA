import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HotToastService } from '@ngneat/hot-toast';
import { UserApi } from 'src/app/_APi/User';
import { Photo } from 'src/app/_Models/photo';
import { User } from 'src/app/_Models/user';
import { HttpService } from 'src/app/_Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  user:User|undefined;
  imgPrefix:string = environment.PhotoUrl;
  photos:Photo[] = [];
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private http:HttpService,private alert:HotToastService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getUser(this.route.snapshot.params['id']);
    this.getUserPhotos(this.route.snapshot.params['id']);

    // this.galleryOptions = [
    //   {
    //     width: '600px',
    //     height: '400px',
    //     thumbnailsColumns: 4,
    //     arrowPrevIcon: 'fa fa-chevron-left',
    //     arrowNextIcon: 'fa fa-chevron-right',
    //     imageAnimation: NgxGalleryAnimation.Slide
    //   },
    //   // max-width 800
    //   {
    //     breakpoint: 800,
    //     width: '100%',
    //     height: '600px',
    //     imagePercent: 80,
    //     thumbnailsPercent: 20,
    //     thumbnailsMargin: 20,
    //     thumbnailMargin: 20
    //   },
    //   // max-width 400
    //   {
    //     breakpoint: 400,
    //     preview: false
    //   }
    // ];

    // setTimeout(() => {

    //   this.photos.forEach(element => {
    //     // console.log(element.url);
    //     this.galleryImages.push(
    //       {
    //           small: element.url,
    //           medium: element.url,
    //           big: element.url
    //         }
    //     )

    //   });
    //   // console.log(this.galleryImages);

    // }, 500);

  }


  private getUser(id:string){
    this.http.Get(UserApi.GetUser+id).subscribe(res=>{
      this.user = res
      console.log(this.user);
    },
    err=>{this.alert.error(err)}
    )
  }

  private getUserPhotos(id:string){
    this.http.Get(UserApi.GetUserPhotos+id).subscribe(res=>{
      // console.log(res);
      this.photos = res;
    },
    err=>{this.alert.error(err)}
    )
  }

}
