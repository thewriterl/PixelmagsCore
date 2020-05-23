import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMagazineMagazine } from 'app/shared/model/magazine-magazine.model';

@Component({
  selector: 'jhi-magazine-magazine-detail',
  templateUrl: './magazine-magazine-detail.component.html',
})
export class MagazineMagazineDetailComponent implements OnInit {
  magazine: IMagazineMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magazine }) => (this.magazine = magazine));
  }

  previousState(): void {
    window.history.back();
  }
}
