import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidatorsService} from './shared/custom-validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;

  subscriptions = [];

  liveValues = '';

  userData = {
    username: null,
    email: null,
    password: null,
    profile: null,
    bio: null,
    links: [],
    stars: null
  };

  profiles = [
    'Profesional',
    'Técnico',
    'Estudiante',
    'Aficionado',
  ];

  linksData = [
    {
      name: 'Facebook',
      prefix: 'http://facebook.com/'
    },
    {
      name: 'Instagram',
      prefix: 'http://instagram.com/'
    },
    {
      name: 'Twitter',
      prefix: 'http://twitter.com/'
    },
    {
      name: 'GitHub',
      prefix: 'http://github.com/'
    },
    {
      name: 'LinkedIn',
      prefix: 'http://linkedin.com/'
    },
    {
      name: 'Web',
      prefix: 'http://'
    }
  ];

  links: FormArray;


  constructor(public fb: FormBuilder,
              public customValidators: CustomValidatorsService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.customValidators.valueNotIn('username')]],
      profile: [this.profiles[0], [Validators.required]],
      bio: ['', [this.customValidators.nonSpecialCharacters]],
      links: this.fb.array([]),
      stars: [null, [Validators.required]],
    });
    this.links = this.myForm.get('links') as FormArray;
    this.liveValues = this.myForm.value;
    this.onChanges();
  }

  onChanges() {
    this.myForm.valueChanges.subscribe((values) => {
      this.liveValues = values;
    });

    this.onLinkChanges();
  }

  onLinkChanges() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    for (const control of this.myForm.get('links')['controls']) {
      this.subscriptions.push(control.get('name').valueChanges.subscribe((name) => {
        const linkDataItem = this.linksData.find((item) => {
          return item.name === name;
        });
        if (linkDataItem) {
          control.get('url').setValue(linkDataItem.prefix);
        }
      }));
    }
  }

  onReset() {
    this.userData = this.myForm.value;

    while (this.links.length !== 0) {
      this.links.removeAt(0);
    }

    this.myForm.reset();
  }

  onSubmit() {
    this.validateAllFields(this.myForm);
    if (this.myForm.valid) {
      this.userData = this.myForm.value;
    }
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  createLink() {
    return this.fb.group({
      name: this.linksData[0].name,
      url: this.linksData[0].prefix,
    });
  }

  addLink() {
    this.links.push(this.createLink());
    this.onLinkChanges();
  }

  removeLink(index) {
    this.links.removeAt(index);
  }
}
