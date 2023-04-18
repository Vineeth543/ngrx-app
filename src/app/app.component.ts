import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  isHomePage!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(
      () => (this.isHomePage = this.router.url === '/')
    );
  }
}
