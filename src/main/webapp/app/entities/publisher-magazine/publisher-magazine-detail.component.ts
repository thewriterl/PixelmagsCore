import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPublisherMagazine } from 'app/shared/model/publisher-magazine.model';

@Component({
  selector: 'jhi-publisher-magazine-detail',
  templateUrl: './publisher-magazine-detail.component.html',
})
export class PublisherMagazineDetailComponent implements OnInit {
  publisher: IPublisherMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publisher }) => (this.publisher = publisher));
  }

  previousState(): void {
    window.history.back();
  }
}
