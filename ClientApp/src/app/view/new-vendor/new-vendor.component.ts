import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl  } from '@angular/forms';
import { VendorForm } from '../../model/vendor.form.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { RadioSelect } from '../../model/radio.select.model';
import { ViewSwitcher } from '../../model/view-switcher.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.css'],
  animations: [
    trigger('list', [
      transition(
        ':enter', [style({ transform: `translate(-15px)`, opacity: 0 }), animate('.3s .3s ease', style({ transform: 'translateX(0px)', opacity: 1 }))
      ], {params : { wtf: "1" }}),
      transition(
        ':leave', [style({transform: `translate(0px)`, opacity: 1 }), animate('.3s ease', style({ transform: `translate(-15px)`, opacity: 0 }))
      ], {params : { wtf: "1" }}),
    ]),
    trigger('actionButton', [
      transition(
        ':enter', [style({ transform: `translateY(12px)`, opacity: 0 }), animate('.3s ease', style({ transform: 'translateY(0px)', opacity: 1 }))
      ], {params : { wtf: "1" }}),
      transition(
        ':leave', [style({transform: `translateY(0px)`, opacity: 1 }), animate('.3s ease', style({ transform: `translateY(12px)`, opacity: 0 }))
      ], {params : { wtf: "1" }}),
    ]),
    trigger('submitButton', [
      transition(
        ':enter', [style({ transform: `translate(calc(-50% + 36px),-50%)`, opacity: 0 }), animate('.3s .2s ease', style({ transform: 'translate(-50%,-50%)', opacity: 1 }))
      ], {params : { wtf: "1" }}),
      transition(
        ':leave', [style({transform: `translate(-50%,-50%)`, opacity: 1 }), animate('.2s ease', style({ transform: `translate(calc(-50% + 36px),-50%)`, opacity: 0 }))
      ], {params : { wtf: "1" }}),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewVendorComponent implements OnInit {
  radioSelect: RadioSelect[] = [
    {value: 1, label: "basic info", active: true},
    {value: 2, label: "region", active: false},
    {value: 3, label: "contact", active: false},
    {value: 4, label: "bank", active: false},
    {value: 5, label: "details", active: false}
  ];
  contactSwitcher: ViewSwitcher[] = [];
  contactActivePage: number = 0;
  formSubmitSuccess: boolean;
  vendorForm: FormGroup;
  contacts: FormArray;
  pager: Pager = new Pager;
  pageObserve = new BehaviorSubject(1);
  transitionWrapperLeft: Object = { transform: "translateX('0px')" };
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.pager.currentPage = 1;
    this.pager.previousPage = 0;
    this.pageObserve.subscribe(page => {

    })
    this.vendorForm = this.fb.group({
      companyName: '',
      VAT: '',
      registrationNumber: '',
      intercompanyCode: '',
      street: '',
      postalCode: '',
      country: '',
      city: '',
      contacts: this.fb.array([]),
      bank: this.fb.group({
        bankCountry: '',
        IBAN: '',
        bankKey: '',
        SWIFT: '',
        accountNumber: '',
        paymentCurrency: '',
        beneficiary: ''
      })
    });
    this.vendorForm.valueChanges.subscribe(data => {
      console.log(data);
    })
    this.addContact(true);
  }

  get contactForms() {
    return this.vendorForm.get('contacts') as FormArray;
  }

  addContact(active: boolean = false) {
    const contact = this.fb.group({
      contactPerson: new FormControl(''),
      emailAddress: new FormControl(''),
      phoneNumber: new FormControl(''),
      authorizedContact: new FormControl('')
    })
    this.contactForms.push(contact);
    let vs: ViewSwitcher = new ViewSwitcher;
    vs.active = active;
    vs.label = this.contactForms.length.toString();
    vs.value = this.contactForms.length - 1;
    this.contactSwitcher.push(vs);
  }

  deleteContact(i: number) {
    this.contactForms.removeAt(i);
  }

  private createForm(vendorForm: VendorForm): FormGroup {
    return this.fb.group(vendorForm);
  }

  private updateForm(vendorForm: Partial<VendorForm>): void {
    this.vendorForm.patchValue(vendorForm)
  }

  get formValue() {
    return this.vendorForm.value as VendorForm;
  }

  onSubmit() {
    console.log(this.vendorForm.value);
    this.formSubmitSuccess = true;
  }

  getRndInteger(min: number, max: number) {
    let val = Math.floor(Math.random() * (max - min + 1) ) + min;
    return val;
  }

  changePage(page: number) {
    this.pager.previousPage = this.pager.currentPage;
    this.pager.currentPage = page;
    this.radioSelect.forEach(v => v.active = false);
    this.radioSelect[this.pager.currentPage - 1].active = true;
    let transition: number = (this.pager.currentPage - 1) / (this.radioSelect.length - 1) * 120 * -1;
    this.transitionWrapperLeft = { transform: "translateX(" + transition + "px)" };
    //this.transitionWrapperLeft = { transform: "translateX(100px)" };
    this.cd.detectChanges();
  }

  nextPage() {
    if (this.pager.currentPage<this.radioSelect.length) {
      this.changePage(this.pager.currentPage + 1);
    }
  }

  previousPage() {
    if (this.pager.currentPage>1) {
      this.changePage(this.pager.currentPage - 1);
    }
  }

  getInputStyle(page: number): Object {
    if (page === this.pager.currentPage) {
      return {
        transform: "translateX(0px)",
        opacity: 1,
        transitionDelay: ".3s"
      }
    }
    if (page > this.pager.currentPage) {
      return {
        transform: `translateX(${this.getRndInteger(20,60)}px)`,
        opacity: 0.001,
        transitionDelay: "0s"
      }
    }
    if (page < this.pager.currentPage) {
      return {
        transform: `translateX(${this.getRndInteger(-60,-20)}px)`,
        opacity: 0.001,
        transitionDelay: "0s"
      }
    }

  }

  changeContactPage(page: number) {
    this.contactActivePage = page;
  }

}

class Pager {
  currentPage: number;
  previousPage: number;
}