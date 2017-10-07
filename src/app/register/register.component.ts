import {Component, AfterViewChecked, ViewChild, NgZone} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {MaterialModule} from '../material'
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {TalentService} from "../service/talents.service";
import {Talent} from "../model/talent";
import {Interpolation} from "@angular/compiler";

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Register` component loaded asynchronously');

declare var google: any;

@Component({
  //moduleId: module.id,
  selector: 'register-user',
  styleUrls: ['./forms.css'],
  templateUrl: './register.component.html',
  providers: [UserService, TalentService, FormBuilder, MaterialModule]
})

export class RegisterComponent {
  talents: Talent[];
  user: User;
  submitted = false
  localState: any;
  errorMessage: String;
  myOptions: any[];
  token: String;
  user2: User;
  registerForm: FormGroup;
  cb1: Boolean
  public jobTypes: Array<any>;


  constructor(
    private userService: UserService,
              private talentService: TalentService,
              private __loader: MapsAPILoader,
              private __zone: NgZone,
              private fb: FormBuilder
              ) {
    this.cb1 = false;

  }

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
    this.user = new User();
    this.getTalents();
    this.autocomplete();
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get address() { return this.registerForm.get('address'); }
  get email() { return this.registerForm.get('email'); }


  ngAfterViewChecked() {
  //  this.formChanged();
  }




  formErrors = {
    'firstname': {
      'required': 'entrez votre prénom.',
      'minlength': "indiquez un prénom d'au mois 3 lettres",
    },
    'lastname': {
      'required': 'entrez votre nom.',
      'minlength': "indiquez un nom d'au mois 3 lettres",
    },
    'email': {
      'required': 'Email is required.',
      'email': "le format du mail n'est pas correct."
    },
    'username': {
      'required': "indiquez votre nom d'utilisateur"
    },
    'password': {
      'required': "indiquez votre mot de passe.",
      'minlength': "votre mot de passe doit contenir au minimum 6 caractères."
    },
    'address': {
      'required': "indiquez votre adresse."
    }
  };



  onSubmit() {
    this.submitted = true;

    this.user.firstName = this.firstname.value;
    this.user.lastName= this.lastname.value;
    this.user.email = this.email.value;
    this.user.username = this.username.value;
    this.user.password = this.password.value;
    this.addUser(this.user);
  }

  addUser(user: User) {
    this.userService.addUser(user)
      .subscribe(
        user2 => this.user2 = user2,
        error => this.errorMessage = <any>error);

  }

  getTalents(){
    this.talentService.getTalents()
      .subscribe(
        talents => this.jobTypes = talents,
        error => this.errorMessage = <any>error);
  }

  setSelectedTalents(selectElement) {
    for (var i = 0; i < selectElement.options.length; i++) {
      var optionElement = selectElement.options[i];
      var optionModel = this.myOptions[i];
      alert(optionModel);
      if (optionElement.selected == true) { optionModel.selected = true; }
      else { optionModel.selected = false; }
    }
  }

  /**
   * TODO: refactor to mutualize code with autocomplete of create-job
   */
  autocomplete() {
    // autocomplete
    this.__loader.load().then(() => {
      var input = document.getElementById('address');
      //var input = this.inputAddress.nativeElement;
      var options = {componentRestrictions: {country: 'FR'}};
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.__zone.run(() => {
          let place = autocomplete.getPlace();
          if (place.geometry.location) {
            this.user.location.latitude = place.geometry.location.lat();
            this.user.location.longitude = place.geometry.location.lng();
            this.user.address = place.formatted_address;
          }
       });
       });
    });
  }


}
