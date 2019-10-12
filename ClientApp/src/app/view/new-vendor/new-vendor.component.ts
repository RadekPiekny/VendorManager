import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VendorForm } from '../../model/vendor.form.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { RadioSelect } from '../../model/radio.select.model';
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
  formSubmitSuccess: boolean;
  vendorForm: FormGroup;
  activePage: number = 1;
  pageObserve = new BehaviorSubject(1);
  transitionWrapperLeft: Object = { transform: "translateX('0px')" };
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit() {
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
      contactPerson: '',
      emailAddress: '',
      phoneNumber: '',
      authorizedContact: '',
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
    this.activePage = page;
    this.radioSelect.forEach(v => v.active = false);
    this.radioSelect[this.activePage - 1].active = true;
    let transition: number = (this.activePage - 1) / (this.radioSelect.length - 1) * 120 * -1;
    this.transitionWrapperLeft = { transform: "translateX(" + transition + "px)" };
    //this.transitionWrapperLeft = { transform: "translateX(100px)" };
    this.cd.detectChanges();
  }

  nextPage() {
    if (this.activePage<this.radioSelect.length) {
      this.changePage(this.activePage + 1);
    }
  }

  previousPage() {
    if (this.activePage>1) {
      this.changePage(this.activePage - 1);
    }
  }

  getInputStyle(page: number): Object {
    if (page === this.activePage) {
      return {
        transform: "translateX(0px)",
        opacity: 1,
      }
    }
    return {
      transform: `translateX(${this.getRndInteger(-20,20)}px)`,
      visibility: "hidden",
      opacity: 0.1
    }
  }

}