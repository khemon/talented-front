import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TalentService} from "../service/talents.service";
import {Utils} from "../utils/utils";

@Component({
  selector: 'home',  // <home></home>
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  providers: [TalentService, Utils]
})
export class HomeComponent {
  // Set our default values
  localState = {value: ''};
  errorMessage: string;
  public jobTypes: Array<any>;
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  constructor(private router: Router,
              private talentService: TalentService,
              private utils: Utils) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.getJobTypes();
  }
  getJobTypes():void {
    this.talentService.getAll()
      .subscribe(
        jobTypes => this.jobTypes = this.utils.transformJobTypes(jobTypes),
        error => this.errorMessage = <any>error);

  }


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(jobType: any): void {
    console.log('Selected value is: ', jobType);
    this.router.navigate(['/create-job', jobType]);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }
}
