import { Component, OnInit } from '@angular/core';
import { Carad } from '../../models/Carad';
import {CarAdService} from '../../services/car-ad.service';
import {AppConst} from '../../const/app-const';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {CarmakeService} from '../../services/helper/carmake.service';
import {
  AccessibilityConfig,
  Action,
  AdvancedLayout,
  ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy,
  ButtonType,
  Description,
  DescriptionStrategy,
  DotsConfig,
  GridLayout,
  Image,
  ImageModalEvent,
  LineLayout,
  PlainGalleryConfig,
  PlainGalleryStrategy,
  PreviewConfig
} from 'angular-modal-gallery';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {GoogleMapService} from '../../services/google-map.service';

@Component({
  selector: 'app-carad-detail',
  templateUrl: './carad-detail.component.html',
  styleUrls: ['./carad-detail.component.css']
})
export class CaradDetailComponent implements OnInit {

private caradId : Number;
private test;
 carad: Carad =new Carad() ;
private fileNumber : number;
private numberList : number[] = [1,2,3,4,5,6,7,8,9];
 serverPath: string = AppConst.serverPath;
private imagesArray1:  Image[]= [];
 imagesArray:  Image[] = [];
//Image gallery
  openModalWindow: boolean = false;
  imagePointer: number = 0;
  openModalWindowObservable: boolean = false;
  imagePointerObservable: number = 0;
  private subscription: Subscription;
  private imagesArraySubscription: Subscription;

  constructor(
  	private carAdService:CarAdService,
    private carmakeService:CarmakeService,
		private router:Router,
		private http:Http,
		private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
	           this.caradId= params['id'] ;
          });
    this.carAdService.getCarad(this.caradId).subscribe(
      res=>{
            this.carad=res.json();
            this.fileNumber= JSON.parse(JSON.stringify(res.json())).fileNumber;
            this.imageInit(this.fileNumber);
           },
      err=>{
            console.log(err)
           }
        );
  };


// Image gallery




	  imageInit(fNumber:number){
	     let init:number = 0;
       console.log('file number--->'+  fNumber);
       console.log('  caradId--->'+  this.caradId);
	   for(let i:number=init;i<fNumber;i++)
	    {
      let j :number=i+1;
 	    this.imagesArray1.push(
	       new Image(i,{
	         img:'../../../image/carad/'+this.caradId+'/'+this.caradId+j+'.png',
	        description:'',
          extUrl:'../../../image/carad/'+this.caradId+'/'+this.caradId+j+'.png'
	        }
        ))
       console.log('path--->'+ '../../../image/carad/'+this.caradId+'/'+this.caradId+j+'.png')
	     }
        this.imagesArray=Array.from(this.imagesArray1);
	    }

      plainGalleryRowATags: PlainGalleryConfig = {
        strategy: PlainGalleryStrategy.ROW,
        layout: new LineLayout({ width: '95px', height: '63px' }, { length: 17, wrap: true }, 'flex-start'),
        // when advanced is defined, additionalBackground: '50% 50%/cover' will be used by default.
        // I added this here, to be more explicit.
        advanced: { aTags: true, additionalBackground: '50% 50%/cover' }
      };

      customPlainGalleryRowDescConfig: PlainGalleryConfig = {
          strategy: PlainGalleryStrategy.CUSTOM,
          layout: new AdvancedLayout(-1, true)
        };



        openImageModalRowDescription(image: Image) {
          console.log('Opening modal gallery from custom plain gallery row and description, with image: ', image);
          const index: number = this.getCurrentIndexCustomLayout(image, this.imagesArray);
          this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
        }

        private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
        return image ? images.indexOf(image) : -1;
      }

      getCarLabel(label:string){
          return this.carmakeService.getCarLabels(label);
      }


      getColorLabel(label:string){
        return this.carmakeService.getColorLabels(label);
      }

      getTransmissionLabel(label:string){
        return  this.carmakeService.getTransmissionLabels(label);
      }

      getBodyTypeLabel(label:string){
        return this.carmakeService.getBodyTypeLabels(label);
          }

      getFuelTypeLabel(label:string){
          return this.carmakeService.getFuelTypeLabels(label);
          }

}
