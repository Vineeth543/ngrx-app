import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.less'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null;

  errorMessages!: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps!).map(
      (name: string) => {
        const messages = this.backendErrorsProps![name].join(' ');
        return `${name[0].toUpperCase() + name.slice(1)} ${messages}`;
      }
    );
  }
}
