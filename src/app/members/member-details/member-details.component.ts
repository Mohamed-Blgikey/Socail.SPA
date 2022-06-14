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

  active = 'home'
  user:User|any;
  imgPrefix:string = environment.PhotoUrl;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

    // console.log();
    this.active = this.route.snapshot.params['loc'];


    this.route.data.subscribe(data => {
      this.user = data['user'];
      // console.log(data['user']);

    });
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




}
